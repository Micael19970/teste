'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redireciona automaticamente após 5 segundos
    const timer = setTimeout(() => {
      router.push('/dashboard')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-dark-100 border border-dark-200 rounded-3xl shadow-2xl text-center">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Pagamento Confirmado!</h1>
        <p className="text-gray-400 mb-6">
          Parabéns! Seu pagamento foi processado com sucesso. Você agora tem acesso completo ao EDUCA DOG EM CASA.
        </p>

        <p className="text-sm text-primary mb-8 animate-pulse">
          Redirecionando para as aulas em instantes...
        </p>

        <Link 
          href="/dashboard"
          className="block w-full py-4 px-6 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-xl shadow-primary/30"
        >
          Acessar Área de Membros Agora
        </Link>
      </div>
    </div>
  )
}
