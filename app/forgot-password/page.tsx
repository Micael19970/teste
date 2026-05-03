'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Redireciona de volta para a página de atualização de senha
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
    
    setLoading(false)
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-dark-100 border border-dark-200 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-4 text-gradient">Recuperar Senha</h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Digite seu e-mail e enviaremos um link para você redefinir sua senha.
        </p>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-md mb-6 text-sm">
            Tudo certo! Verifique sua caixa de entrada (e a caixa de spam) e clique no link que te enviamos.
          </div>
        )}

        {!success && (
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-md focus:outline-none focus:border-neon-purple text-foreground transition-colors"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-neon text-black font-bold rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar link de recuperação'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  )
}
