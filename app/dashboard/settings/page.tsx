import { Shield, Bell, Lock, Smartphone } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configurações</h1>
        <p className="text-gray-400">Personalize sua experiência na plataforma.</p>
      </div>

      <div className="space-y-6">
        {[
          { icon: Bell, title: 'Notificações', desc: 'Gerencie como você recebe alertas de novas aulas e novidades.', status: 'Ativado' },
          { icon: Lock, title: 'Segurança', desc: 'Altere sua senha e gerencie a autenticação em duas etapas.', status: 'Configurar' },
          { icon: Shield, title: 'Privacidade', desc: 'Controle quais informações são visíveis para outros membros.', status: 'Gerenciar' },
          { icon: Smartphone, title: 'Dispositivos', desc: 'Veja e gerencie os aparelhos onde sua conta está conectada.', status: '2 ativos' },
        ].map((item, i) => (
          <div key={i} className="bg-dark-100 border border-dark-200 p-6 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-dark-200 border border-dark-300 rounded-xl text-sm font-bold hover:bg-dark-300 transition-colors">
              {item.status}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
