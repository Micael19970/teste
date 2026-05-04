import { MessageCircle, Mail, HelpCircle, ExternalLink } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Como podemos <span className="text-primary">ajudar</span>?</h1>
        <p className="text-gray-400 text-lg">Nossa equipe de especialistas está pronta para te auxiliar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-dark-100 border border-dark-200 p-8 rounded-[40px] space-y-6">
          <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
            <MessageCircle size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">WhatsApp</h2>
            <p className="text-gray-400 mb-6">Suporte direto e rápido com nossos adestradores.</p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20"
            >
              CHAMAR NO WHATSAPP
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <div className="bg-dark-100 border border-dark-200 p-8 rounded-[40px] space-y-6">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Mail size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">E-mail</h2>
            <p className="text-gray-400 mb-6">Para questões administrativas ou parcerias.</p>
            <a 
              href="mailto:suporte@educadog.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20"
            >
              ENVIAR E-MAIL
            </a>
          </div>
        </div>
      </div>

      <div className="bg-dark-100 border border-dark-200 rounded-[40px] p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <HelpCircle className="text-primary" />
          Perguntas Frequentes
        </h2>
        
        <div className="space-y-4">
          {[
            { q: 'Como emitir meu certificado?', a: 'O certificado é liberado automaticamente após a conclusão de 100% das aulas no módulo principal.' },
            { q: 'Posso acessar em mais de um dispositivo?', a: 'Sim, você pode acessar em seu celular, tablet e computador simultaneamente.' },
            { q: 'Como faço para cancelar minha conta?', a: 'Como o acesso é vitalício por pagamento único, não há necessidade de cancelamento. Mas se desejar excluir seus dados, entre em contato via e-mail.' },
          ].map((faq, i) => (
            <details key={i} className="group bg-dark-200 rounded-2xl border border-dark-300">
              <summary className="p-6 cursor-pointer font-bold list-none flex justify-between items-center">
                {faq.q}
                <span className="text-primary group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <div className="p-6 pt-0 text-gray-400 border-t border-dark-300/50 mt-2">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
