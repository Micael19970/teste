import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Lock, PlayCircle, CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user profile
  const { data: userData } = await supabase
    .from('users')
    .select('name, plan')
    .eq('id', user.id)
    .single()

  const userName = userData?.name || user.email?.split('@')[0] || 'Aluno'
  const plan = userData?.plan || 'free'
  const isPremium = plan === 'premium'

  // Fetch lessons
  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .order('order_number', { ascending: true })

  // Fetch progress
  const { data: progress } = await supabase
    .from('progress')
    .select('lesson_id')
    .eq('user_id', user.id)
    .eq('completed', true)

  const completedLessonIds = new Set(progress?.map(p => p.lesson_id) || [])

  // If no lessons returned (e.g. database not populated yet), use mock data for presentation
  const displayLessons = lessons && lessons.length > 0 ? lessons : [
    { id: '1', title: 'Aula 1: A Base do Respeito', order_number: 1 },
    { id: '2', title: 'Aula 2: Controle de Latidos', order_number: 2 },
    { id: '3', title: 'Aula 3: Acabando com a Destruição', order_number: 3 },
    { id: '4', title: 'Aula 4: O Passeio Perfeito', order_number: 4 },
    { id: '5', title: 'Aula 5: Ansiedade de Separação', order_number: 5 },
  ]

  const progressPercentage = displayLessons.length > 0 
    ? Math.round((completedLessonIds.size / displayLessons.length) * 100) 
    : 0

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold italic tracking-tight">
            Olá, <span className="text-neon-purple">{userName}</span>!
          </h1>
          <p className="text-gray-400 mt-2">Que bom ter você de volta na nossa Área de Membros.</p>
        </div>
        
        <div className="bg-dark-100 p-4 rounded-xl border border-dark-200 min-w-[200px]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Seu Progresso</span>
            <span className="text-sm font-bold text-neon-blue">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-dark-300 rounded-full h-2">
            <div 
              className="bg-gradient-neon h-2 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {!isPremium && (
        <div className="mb-8 p-6 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/50 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Desbloqueie o Acesso Completo</h2>
            <p className="text-gray-300">Você está no plano gratuito. Adquira o EDUCA DOG EM CASA para assistir todas as aulas.</p>
          </div>
          <Link href="/checkout" className="px-6 py-3 bg-gradient-neon text-black font-bold rounded-lg whitespace-nowrap hover:scale-105 transition-transform shadow-[0_0_15px_rgba(176,38,255,0.4)]">
            Desbloquear por R$ 10,00
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayLessons.map((lesson, idx) => {
          const isCompleted = completedLessonIds.has(lesson.id)
          const isLocked = !isPremium && idx > 0 // Primeira aula grátis, resto bloqueado

          return (
            <Link 
              key={lesson.id} 
              href={isLocked ? '/blocked' : `/lesson/${lesson.id}`}
              className={`group relative p-6 rounded-2xl border transition-all ${
                isLocked 
                  ? 'bg-dark-200/50 border-dark-300 cursor-not-allowed opacity-75' 
                  : 'bg-dark-100 border-dark-200 hover:border-neon-blue hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${isLocked ? 'bg-dark-300' : 'bg-neon-blue/20 text-neon-blue'}`}>
                  {isLocked ? <Lock className="w-6 h-6" /> : <PlayCircle className="w-6 h-6" />}
                </div>
                {isCompleted && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
              </div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2">{lesson.title}</h3>
              <p className="text-sm text-gray-500">Módulo Único • Aula {lesson.order_number}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
