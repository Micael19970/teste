import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/mailersend'

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
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 20px;">
          <h1 style="color: #b026ff; text-align: center;">Olá!</h1>
          <p style="font-size: 18px; text-align: center; color: #cccccc;">Seu acesso foi liberado com sucesso.</p>
          <a href="https://educadogemcasa.online/dashboard" style="background: linear-gradient(90deg, #b026ff, #00f0ff); color: #000000; padding: 15px 30px; border-radius: 10px; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">ACESSAR AGORA</a>
        </div>
      `
    });

    return NextResponse.json({ success: true, message: 'Enviado para ' + email })
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
