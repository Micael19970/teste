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
    <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-16 animate-in fade-in duration-700">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">Finalize sua <span className="text-primary">Inscrição</span></h1>
        <p className="text-gray-400 text-lg">Você está a um passo de transformar a vida do seu melhor amigo.</p>
      </div>

      <div className="bg-dark-100 border border-dark-200 rounded-[40px] overflow-hidden shadow-2xl flex flex-col md:flex-row border-t-4 border-t-primary">
        {/* Detalhes do Produto */}
        <div className="p-10 md:w-1/2 bg-dark-200/30">
          <h2 className="text-2xl font-bold mb-8">Resumo do Pedido</h2>
          
          <div className="space-y-6 mb-10">
            <div className="flex justify-between items-start pb-6 border-b border-dark-300">
              <div>
                <p className="font-bold text-lg">EDUCA DOG EM CASA</p>
                <p className="text-sm text-gray-500">Método Completo + Bônus</p>
              </div>
              <span className="font-black text-xl">R$ 10,00</span>
            </div>
            
            <ul className="space-y-4">
              {[
                "Acesso Vitalício Imediato",
                "Todos os Módulos em Vídeo",
                "Material de Apoio (PDF)",
                "Suporte Especializado",
                "Certificado de Conclusão"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-400">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Check size={12} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-dark-300 flex justify-between items-center">
            <span className="text-lg font-medium">Valor Total</span>
            <span className="text-3xl font-black text-primary">R$ 10,00</span>
          </div>
        </div>

        {/* Pagamento */}
        <div className="p-10 md:w-1/2 flex flex-col justify-center items-center text-center bg-dark-100">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-8 shadow-inner">
            <CreditCard size={32} />
          </div>
          
          <h3 className="text-2xl font-bold mb-4">Pagamento 100% Seguro</h3>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Clique no botão abaixo para ser redirecionado ao ambiente de pagamento do **Mercado Pago**.
          </p>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-5 px-8 bg-primary text-white font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/30 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="animate-pulse">Processando...</span>
            ) : (
              <>
                <Lock size={20} />
                EFETUAR PAGAMENTO
              </>
            )}
          </button>
          
          <div className="mt-8 grid grid-cols-2 gap-4 w-full opacity-60">
            <div className="flex flex-col items-center gap-2">
              <ShieldCheck className="text-green-500" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Dados Protegidos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <CreditCard className="text-blue-500" size={24} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Liberação Imediata</span>
            </div>
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
