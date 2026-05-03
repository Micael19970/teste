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
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        @import url('https://fonts.mailersend.com/css?family=Inter:400,600');
        @media only screen and (max-width: 640px) {
            .ms-content { width: 100% !important; border-radius: 0; }
            .ms-content-body { padding: 30px !important; }
        }
    </style>
</head>
<body style="font-family:'Inter', Helvetica, Arial, sans-serif; background-color: #050505; color: #ffffff; margin: 0; padding: 40px 0;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
            <td align="center">
                <table class="ms-content" width="600" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; border-radius: 20px; border: 1px solid #1a1a1a; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                    <tr>
                        <td class="ms-content-body" style="padding: 50px;">
                            <p style="text-align: center; margin-bottom: 40px;">
                                <span style="color: #b026ff; font-size: 24px; font-weight: bold; letter-spacing: 2px;">❖ EDUCA DOG EM CASA</span>
                            </p>
                            <h1 style="font-size: 28px; line-height: 1.2; font-weight: 600; text-align: center; margin-bottom: 24px; background: linear-gradient(to right, #b026ff, #00f0ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Bem-vindo(a) ao Método!</h1>
                            <p style="color: #999999; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 40px;">
                                Parabéns pela sua decisão! Agora você tem em mãos o guia completo para transformar o comportamento do seu cão e ter uma convivência harmoniosa em casa.
                            </p>
                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td align="center">
                                        <a href="https://educadogemcasa.online/dashboard" style="background-color: #b026ff; color: #ffffff; padding: 18px 35px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 10px 20px rgba(176, 38, 255, 0.3);">ACESSAR ÁREA DE MEMBROS</a>
                                    </td>
                                </tr>
                            </table>
                            <div style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #1a1a1a; text-align: center;">
                                <p style="color: #666666; font-size: 14px;">
                                    Se tiver dúvidas, responda a este e-mail.<br>
                                    © 2026 Educa Dog em Casa. Todos os direitos reservados.
                                </p>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
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
