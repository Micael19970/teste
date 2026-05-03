import Link from 'next/link'
import { Lock } from 'lucide-react'

export default function BlockedPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-dark-100 border border-dark-200 rounded-3xl shadow-2xl text-center">
        <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Acesso Bloqueado</h1>
        <p className="text-gray-400 mb-8">
          Você precisa desbloquear o acesso por apenas R$ 10,00 para assistir a esta aula e ter o método completo.
        </p>

        <Link 
          href="/checkout"
          className="block w-full py-4 px-6 bg-gradient-neon text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(176,38,255,0.3)] mb-4"
        >
          Desbloquear Agora
        </Link>
        <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
          Voltar para Área de Membros
        </Link>
      </div>
    </div>
  )
}
