'use client'

import { useState } from 'react'
import { Lock, ShieldCheck, CreditCard } from 'lucide-react'

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-payment', {
        method: 'POST',
      })
      const data = await res.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Erro retornado:', data)
        alert('Erro do Mercado Pago: ' + (data.error || 'Erro desconhecido. Veja o console.'))
        setLoading(false)
      }
    } catch (error) {
      console.error('Fetch error:', error)
      alert('Erro de conexão: ' + (error as Error).message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Desbloqueie o EDUCA DOG EM CASA</h1>
        <p className="text-gray-400">Pagamento único, acesso vitalício.</p>
      </div>

      <div className="bg-dark-100 border border-dark-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Detalhes do Produto */}
        <div className="p-8 md:w-1/2 bg-dark-200/50">
          <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
          
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-4 border-b border-dark-300">
              <span className="text-gray-300">EDUCA DOG EM CASA Completo</span>
              <span className="font-bold">R$ 10,00</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Acesso a todas as aulas</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Material em PDF</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Suporte via e-mail</span>
              <Check className="w-4 h-4 text-green-500" />
            </div>
          </div>

          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total</span>
            <span className="text-neon-blue">R$ 10,00</span>
          </div>
        </div>

        {/* Pagamento */}
        <div className="p-8 md:w-1/2 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-blue-500/20 text-blue-500 rounded-full flex items-center justify-center mb-6">
            <CreditCard className="w-8 h-8" />
          </div>
          
          <h3 className="text-lg font-bold mb-2">Pagamento Seguro</h3>
          <p className="text-sm text-gray-400 mb-8">
            Você será redirecionado para o ambiente seguro do Mercado Pago para finalizar sua compra.
          </p>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-4 px-6 bg-gradient-neon text-black font-bold rounded-xl hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <span>Processando...</span>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                <span>Pagar R$ 10,00 Agora</span>
              </>
            )}
          </button>
          
          <div className="mt-6 flex items-center justify-center text-sm text-gray-500 space-x-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Ambiente 100% Seguro</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}
