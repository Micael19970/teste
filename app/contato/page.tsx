import Link from 'next/link'
import { ArrowLeft, Mail, Phone } from 'lucide-react'

export const metadata = {
  title: 'Contato | EDUCA DOG EM CASA',
}

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-neon-purple mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a página inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Fale Conosco</h1>
        
        <div className="prose prose-invert max-w-none text-gray-300 mb-12">
          <p>
            Precisa de ajuda com o seu acesso, pagamento ou tem alguma dúvida sobre o método EDUCA DOG EM CASA? 
            Nossa equipe de suporte está pronta para te atender.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-dark-100 p-8 rounded-2xl border border-dark-200 flex flex-col items-center text-center hover:border-neon-purple/50 transition-colors">
            <div className="w-16 h-16 bg-neon-purple/20 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-neon-purple" />
            </div>
            <h2 className="text-xl font-bold mb-2">Suporte por E-mail</h2>
            <p className="text-gray-400 mb-4 text-sm">Respostas em até 24 horas úteis</p>
            <a href="mailto:suporte@educadogemcasa.com" className="font-bold text-neon-blue hover:underline">
              suporte@educadogemcasa.com
            </a>
          </div>

          <div className="bg-dark-100 p-8 rounded-2xl border border-dark-200 flex flex-col items-center text-center hover:border-neon-purple/50 transition-colors">
            <div className="w-16 h-16 bg-neon-blue/20 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-8 h-8 text-neon-blue" />
            </div>
            <h2 className="text-xl font-bold mb-2">WhatsApp</h2>
            <p className="text-gray-400 mb-4 text-sm">Apenas para dúvidas financeiras</p>
            <a href="#" className="font-bold text-neon-purple hover:underline">
              (00) 00000-0000
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
