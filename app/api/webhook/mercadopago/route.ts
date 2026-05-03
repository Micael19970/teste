import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const url = new URL(request.url)
    const topic = url.searchParams.get('topic') || url.searchParams.get('type')
    const id = url.searchParams.get('data.id') || url.searchParams.get('id')

    if (topic === 'payment' && id) {
      // In a real app, verify the signature or fetch the payment from MP to verify status
      // Here we assume if we get a webhook it's a success for demo purposes, 
      // but ideally you do: const payment = await paymentClient.get({ id })
      
      // Since we need to update DB as admin, we use service_role key
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      // Fetch payment details from MercadoPago to get the external_reference (user.id)
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      })
      const paymentData = await mpResponse.json()

      if (paymentData.status === 'approved') {
        const userId = paymentData.external_reference

        if (userId) {
          // Update user plan
          await supabaseAdmin
            .from('users')
            .update({ plan: 'premium' })
            .eq('id', userId)
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: unknown) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
