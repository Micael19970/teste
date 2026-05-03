export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Informe um email: ?email=seu@email.com' }, { status: 400 })
  }

  try {
    // Simulando o e-mail que o cliente recebe
    await resend.emails.send({
      from: 'Educa Dog <suporte@send.educadogemcasa.online>',
      to: email,
      subject: '🎉 Seu acesso ao EDUCA DOG EM CASA está liberado!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 20px;">
          <h1 style="color: #b026ff; text-align: center;">Olá, Aluno de Teste!</h1>
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

    return NextResponse.json({ success: true, message: 'E-mail de teste enviado para ' + email })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
