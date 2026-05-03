import { NextResponse } from 'next/server'
import { preference } from '@/lib/mercadopago'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const origin = new URL(request.url).origin
    const baseUrl = origin

    const body = {
      items: [
        {
          id: 'metodo-educadog',
          title: 'EDUCA DOG EM CASA',
          quantity: 1,
          unit_price: 10.00,
          currency_id: 'BRL',
        }
      ],
      payer: {
        email: user.email,
      },
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/checkout`,
        pending: `${baseUrl}/checkout`
      },
      auto_return: 'approved',
      external_reference: user.id, // Important to identify the user in webhook
      metadata: {
        user_id: user.id
      }
    }

    console.log('Enviando para Mercado Pago:', JSON.stringify(body, null, 2))
    const response = await preference.create({ body })

    return NextResponse.json({ url: response.init_point })
  } catch (error: unknown) {
    console.error('Error creating payment preference:', error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
