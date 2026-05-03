import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/mailersend'

export async function POST(request: Request) {
  try {
    const url = new URL(request.url)
    
    // Tenta pegar da URL (formato antigo/alternativo)
    let topic = url.searchParams.get('topic') || url.searchParams.get('type')
    let id = url.searchParams.get('data.id') || url.searchParams.get('id')

    try {
      const body = await request.json()
      console.log('--- Webhook Body Recebido ---', JSON.stringify(body))
      topic = topic || body.type || body.topic || (body.action?.split('.')[0])
      id = id || body.data?.id || body.id
    } catch {
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
          console.log('Buscando dados do usuário para o e-mail...')
          const { data: userProfile } = await supabaseAdmin
            .from('users')
            .select('name, email')
            .eq('id', userId)
            .single()

          console.log('Atualizando plano para premium para o usuário:', userId)
          const { error } = await supabaseAdmin
            .from('users')
            .update({ plan: 'premium' })
            .eq('id', userId)
          
          if (error) {
            console.error('Erro ao atualizar banco de dados:', error)
          } else {
            console.log('Acesso liberado com sucesso!')
            
            // Envia o e-mail de acesso
            if (userProfile?.email) {
              try {
                console.log('Enviando e-mail de acesso para:', userProfile.email)
                await sendEmail({
                  to: userProfile.email,
                  subject: '🎉 Seu acesso ao EDUCA DOG EM CASA está liberado!',
                  html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 20px;">
                      <h1 style="color: #b026ff; text-align: center;">Olá, ${userProfile.name || 'Aluno'}!</h1>
                      <p style="font-size: 18px; text-align: center; color: #cccccc;">Seu pagamento foi confirmado e seu acesso à Área de Membros já está liberado.</p>
                      
                      <div style="background-color: #171717; padding: 30px; border-radius: 15px; margin: 30px 0; border: 1px solid #262626; text-align: center;">
                        <h2 style="margin-top: 0;">Pronto para começar?</h2>
                        <p style="color: #999999; margin-bottom: 25px;">Clique no botão abaixo para acessar o método completo e começar a transformar o comportamento do seu cão hoje mesmo.</p>
                        <a href="https://educadogemcasa.online/dashboard" style="background: linear-gradient(90deg, #b026ff, #00f0ff); color: #000000; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">ACESSAR ÁREA DE MEMBROS</a>
                      </div>

                      <p style="font-size: 14px; color: #666666; text-align: center;">
                        Se tiver qualquer dúvida, basta responder a este e-mail.<br>
                        Equipe Educa Dog em Casa
                      </p>
                    </div>
                  `
                });
                console.log('E-mail enviado com sucesso!')

                // NOTIFICAÇÃO PARA O DONO (MICAEL)
                try {
                  await sendEmail({
                    to: 'micaelzik2@gmail.com',
                    subject: '💰 NOVA VENDA: Educa Dog em Casa!',
                    html: `
                      <div style="font-family: sans-serif; padding: 20px; background-color: #f4f4f4;">
                        <h2>Parabéns, Micael! Você fez uma venda!</h2>
                        <p><strong>Cliente:</strong> ${userProfile.name || 'Não informado'}</p>
                        <p><strong>E-mail:</strong> ${userProfile.email}</p>
                        <p><strong>Valor:</strong> R$ 10,00</p>
                        <p><strong>ID do Pagamento:</strong> ${id}</p>
                        <hr>
                        <p>Continue assim! 🚀</p>
                      </div>
                    `
                  });
                  console.log('Notificação de venda enviada para o admin!')
                } catch (adminMailError) {
                  console.error('Erro ao enviar notificação para o admin:', adminMailError)
                }
              } catch (mailError) {
                console.error('Erro ao enviar e-mail:', mailError)
              }
            }
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
