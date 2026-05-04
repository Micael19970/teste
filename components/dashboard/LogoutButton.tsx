'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
    >
      <LogOut size={20} />
      <span>Encerrar Sessão</span>
    </button>
  )
}
