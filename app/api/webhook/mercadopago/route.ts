import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const url = new URL(request.url)
    const topic = url.searchParams.get('topic') || url.searchParams.get('type')
    const id = url.searchParams.get('data.id') || url.searchParams.get('id')

    console.log('--- Webhook Recebido ---')
    console.log('Topic/Type:', topic)
    console.log('ID:', id)

    if (topic === 'payment' && id) {
      const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      )

      console.log('Buscando pagamento no Mercado Pago...')
      const mpResponse = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
        headers: {
          Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      })
      
      if (!mpResponse.ok) {
        console.error('Erro ao buscar pagamento no MP:', await mpResponse.text())
        return NextResponse.json({ error: 'MP Error' }, { status: 400 })
      }

      const paymentData = await mpResponse.json()
      console.log('Status do Pagamento:', paymentData.status)
      console.log('External Reference (User ID):', paymentData.external_reference)

      if (paymentData.status === 'approved') {
        const userId = paymentData.external_reference

        if (userId) {
          console.log('Atualizando plano para premium para o usuário:', userId)
          const { error } = await supabaseAdmin
            .from('users')
            .update({ plan: 'premium' })
            .eq('id', userId)
          
          if (error) {
            console.error('Erro ao atualizar banco de dados:', error)
          } else {
            console.log('Acesso liberado com sucesso!')
          }
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error: unknown) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
