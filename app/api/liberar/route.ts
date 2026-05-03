import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/nodemailer'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  if (!email) {
    return NextResponse.json({ error: 'Informe um email: ?email=seu@email.com' }, { status: 400 })
  }

  try {
    // Simulando o e-mail que o cliente recebe
    await sendEmail({
      to: email,
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
                                Parabéns pela sua decisão! Agora você tem em mãos o guia completo para transformar o comportamento do seu cão.
                            </p>

                            <div style="background-color: #171717; padding: 25px; border-radius: 15px; border: 1px solid #262626; margin-bottom: 40px;">
                                <h3 style="color: #ffffff; margin-top: 0; font-size: 16px;">Seus Dados de Acesso:</h3>
                                <p style="color: #cccccc; font-size: 14px; margin: 5px 0;"><strong>Link:</strong> educadogemcasa.online/login</p>
                                <p style="color: #cccccc; font-size: 14px; margin: 5px 0;"><strong>Usuário:</strong> aluno@teste.com</p>
                            </div>

                            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                <tr>
                                    <td align="center">
                                        <a href="https://educadogemcasa.online/dashboard" style="background-color: #b026ff; color: #ffffff; padding: 18px 35px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 10px 20px rgba(176, 38, 255, 0.3);">ACESSAR ÁREA DE MEMBROS</a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #666666; font-size: 14px; text-align: center; margin-top: 40px;">
                                Se precisar de ajuda, entre em contato com nosso <a href="mailto:suporte@educadogemcasa.online" style="color: #00f0ff; text-decoration: none;">Suporte</a>.
                            </p>
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

    return NextResponse.json({ success: true, message: 'Enviado para ' + email })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
