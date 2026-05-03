'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle } from 'lucide-react'

export default function MarkCompleteButton({ lessonId, initialStatus }: { lessonId: string, initialStatus: boolean }) {
  const [completed, setCompleted] = useState(initialStatus)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const toggleComplete = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed: !completed })
      })

      if (res.ok) {
        setCompleted(!completed)
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={toggleComplete}
      disabled={loading}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-bold transition-all ${
        completed 
          ? 'bg-green-500/20 text-green-500 border border-green-500/50 hover:bg-green-500/30' 
          : 'bg-dark-200 text-gray-300 border border-dark-300 hover:border-neon-blue hover:text-neon-blue'
      }`}
    >
      <CheckCircle className={`w-5 h-5 ${completed ? 'text-green-500' : 'text-gray-400'}`} />
      <span>{completed ? 'Concluída' : 'Marcar como Concluída'}</span>
    </button>
  )
}
