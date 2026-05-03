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
    const data = await resend.emails.send({
      from: 'Educa Dog <suporte@send.educadogemcasa.online>',
      to: email,
      subject: '🧪 Teste de Envio - Educa Dog',
      html: '<h1 style="color: #b026ff;">Funciona!</h1><p>Se você recebeu isso, a integração com o Resend e seu domínio personalizado estão 100% ativos.</p>'
    });

    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
