'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()
  const router = useRouter()
  const pathname = usePathname()

  if (pathname?.startsWith('/dashboard')) {
    return null
  }

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <nav className="w-full border-b border-dark-200 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gradient">
            EDUCA DOG EM CASA
          </Link>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Área de Membros
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Entrar
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-xl hover:bg-primary-600 transition-colors">
                  Começar Agora
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
