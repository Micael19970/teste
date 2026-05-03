import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const url = new URL(request.url)
    
    // Tenta pegar da URL (formato antigo/alternativo)
    let topic = url.searchParams.get('topic') || url.searchParams.get('type')
    let id = url.searchParams.get('data.id') || url.searchParams.get('id')

    // Tenta pegar do corpo da requisição (formato novo/JSON)
    try {
      const body = await request.json()
      console.log('--- Webhook Body Recebido ---', JSON.stringify(body))
      topic = topic || body.type || body.topic || (body.action?.split('.')[0])
      id = id || body.data?.id || body.id
    } catch (e) {
      console.log('Requisição sem corpo JSON ou erro ao ler')
    }

    console.log('--- Processando Webhook ---')
    console.log('Topic/Type:', topic)
    console.log('ID:', id)

    if (topic === 'payment' && id) {
      // Se for o ID de teste do Mercado Pago, apenas responde OK
      if (id === '123456' || id === '123456789') {
        console.log('ID de teste detectado. Respondendo OK.')
        return NextResponse.json({ success: true }, { status: 200 })
      }

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
        const errorText = await mpResponse.text()
        console.error('Erro ao buscar pagamento no MP:', errorText)
        // Mesmo com erro no MP, retornamos 200 para o MP parar de tentar se for erro de auth/not found
        return NextResponse.json({ success: true, warning: 'Payment not found' }, { status: 200 })
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
