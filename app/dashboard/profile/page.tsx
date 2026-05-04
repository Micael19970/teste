import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Shield, CreditCard, LogOut } from 'lucide-react'
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  const userName = userData?.name || user.email?.split('@')[0] || 'Aluno'
  const userEmail = user.email
  const plan = userData?.plan || 'free'
  const createdAt = new Date(user.created_at).toLocaleDateString('pt-BR')

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Meu Perfil</h1>
        <p className="text-gray-400">Gerencie suas informações e detalhes da conta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-dark-100 border border-dark-200 rounded-3xl p-8 text-center">
            <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/50 text-primary">
              <User size={48} />
            </div>
            <h2 className="text-xl font-bold">{userName}</h2>
            <p className="text-sm text-gray-500 mb-6">{userEmail}</p>
            
            <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              plan === 'premium' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-dark-200 text-gray-400'
            }`}>
              <Shield size={12} />
              Plano {plan}
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors">
            <LogOut size={20} />
            <span>Encerrar Sessão</span>
          </button>
        </div>

        {/* Right Column: Detailed Info Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-dark-100 border border-dark-200 rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Informações Pessoais
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="text" 
                    defaultValue={userName}
                    className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Seu nome"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input 
                    type="email" 
                    disabled
                    defaultValue={userEmail}
                    className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-primary text-white font-bold px-8 py-3 rounded-xl hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20">
                Salvar Alterações
              </button>
            </div>
          </div>

          <div className="bg-dark-100 border border-dark-200 rounded-3xl p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <CreditCard size={20} className="text-primary" />
              Assinatura e Faturamento
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-dark-200 rounded-2xl border border-dark-300">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="font-bold">Plano Atual: {plan === 'premium' ? 'Acesso Vitalício' : 'Acesso Gratuito'}</p>
                  <p className="text-xs text-gray-500">Membro desde {createdAt}</p>
                </div>
              </div>
              
              {plan !== 'premium' && (
                <Link href="/checkout" className="text-primary text-sm font-bold hover:underline">
                  Fazer Upgrade
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
