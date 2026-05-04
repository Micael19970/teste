import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Lock, Play, CheckCircle2, Clock, Zap, BookOpen } from 'lucide-react'

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

  // Mock data if database is empty
  const displayLessons = lessons && lessons.length > 0 ? lessons : [
    { id: '1', title: 'Fundamentos do Adestramento Positivo', order_number: 1, duration: '12 min' },
    { id: '2', title: 'Entendendo a Linguagem Corporal Canina', order_number: 2, duration: '15 min' },
    { id: '3', title: 'Comandos Básicos: Senta, Fica e Vem', order_number: 3, duration: '20 min' },
    { id: '4', title: 'Resolvendo Problemas de Comportamento', order_number: 4, duration: '18 min' },
    { id: '5', title: 'Socialização e Passeio sem Puxar', order_number: 5, duration: '25 min' },
  ]

  const progressPercentage = displayLessons.length > 0 
    ? Math.round((completedLessonIds.size / displayLessons.length) * 100) 
    : 0

  const lastCompletedLesson = displayLessons.find(l => completedLessonIds.has(l.id))
  const nextLesson = displayLessons.find(l => !completedLessonIds.has(l.id)) || displayLessons[0]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-dark-100 border border-dark-200 p-8 lg:p-12">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Olá, <span className="text-primary">{userName}</span>! 👋
          </h1>
          <p className="text-gray-400 text-lg mb-8">
            {progressPercentage === 100 
              ? 'Parabéns! Você concluiu todas as aulas. Que tal revisar algum módulo?'
              : 'Pronto para continuar a transformação do seu melhor amigo?'}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              href={`/dashboard/lesson/${nextLesson.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-600 transition-all shadow-lg shadow-primary/20"
            >
              <Play size={20} fill="currentColor" />
              Continuar Assistindo
            </Link>
            <div className="flex items-center gap-2 px-4 py-2 bg-dark-200 rounded-xl text-sm font-medium border border-dark-300">
              <Clock size={16} className="text-primary" />
              <span>Próxima: {nextLesson.title}</span>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-100 border border-dark-200 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Zap size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Progresso Geral</p>
            <p className="text-2xl font-bold">{progressPercentage}%</p>
          </div>
        </div>
        <div className="bg-dark-100 border border-dark-200 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Aulas Assistidas</p>
            <p className="text-2xl font-bold">{completedLessonIds.size}/{displayLessons.length}</p>
          </div>
        </div>
        <div className="bg-dark-100 border border-dark-200 p-6 rounded-2xl flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-400">Status da Conta</p>
            <p className="text-2xl font-bold capitalize">{plan}</p>
          </div>
        </div>
      </div>

      {/* Upgrade CTA if Free */}
      {!isPremium && (
        <div className="bg-gradient-to-r from-primary/20 to-transparent border border-primary/30 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 animate-pulse">
              <Zap size={24} fill="currentColor" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Desbloqueie o Método Completo</h2>
              <p className="text-gray-400">Tenha acesso a todas as aulas e suporte exclusivo agora mesmo.</p>
            </div>
          </div>
          <Link href="/checkout" className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform">
            UPGRADE POR R$ 10,00
          </Link>
        </div>
      )}

      {/* Course Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Conteúdo do Curso</h2>
          <span className="text-sm text-gray-400">{displayLessons.length} Aulas</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayLessons.map((lesson, idx) => {
            const isCompleted = completedLessonIds.has(lesson.id)
            const isLocked = !isPremium && idx > 0

            return (
              <Link 
                key={lesson.id} 
                href={isLocked ? '/blocked' : `/dashboard/lesson/${lesson.id}`}
                className={`group flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                  isLocked 
                    ? 'bg-dark-100/50 border-dark-200 opacity-60 cursor-not-allowed' 
                    : 'bg-dark-100 border-dark-200 hover:border-primary/50 hover:bg-dark-200 shadow-sm'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isLocked ? 'bg-dark-300' : isCompleted ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'
                }`}>
                  {isLocked ? <Lock size={20} /> : isCompleted ? <CheckCircle2 size={24} /> : <Play size={20} fill="currentColor" />}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Aula {lesson.order_number}</p>
                  <h3 className="font-bold truncate">{lesson.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {lesson.duration || '10 min'}
                    </span>
                    {isLocked && <span className="text-primary font-bold">Bloqueado</span>}
                  </div>
                </div>
                
                {!isLocked && !isCompleted && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={20} className="text-primary" />
                  </div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
