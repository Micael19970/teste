import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, FileText, PlayCircle } from 'lucide-react'
import MarkCompleteButton from './MarkCompleteButton'
import VideoPlayer from './VideoPlayer'

export const dynamic = 'force-dynamic'

export default async function LessonPage({ params }: { params: { id: string } }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user plan
  const { data: userData } = await supabase
    .from('users')
    .select('plan')
    .eq('id', user.id)
    .single()

  const plan = userData?.plan || 'free'
  const isPremium = plan === 'premium'

  // Fetch lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('*')
    .eq('id', params.id)
    .single()

  // If we don't have real DB data, mock it based on ID
  const displayLesson = lesson || {
    id: params.id,
    title: `Aula ${params.id}: Entendendo o Método`,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    pdf_url: '#',
    order_number: Number(params.id) || 1
  }

  // If not premium and not the first lesson, redirect to blocked
  if (!isPremium && displayLesson.order_number > 1) {
    redirect('/blocked')
  }

  // Fetch progress
  const { data: progress } = await supabase
    .from('progress')
    .select('completed')
    .eq('user_id', user.id)
    .eq('lesson_id', params.id)
    .single()

  const isCompleted = !!progress?.completed

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-primary mb-2 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Voltar para o Início
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">{displayLesson.title}</h1>
          <p className="text-sm text-gray-500 mt-1">Módulo Único • Aula {displayLesson.order_number}</p>
        </div>
        
        <MarkCompleteButton lessonId={params.id} initialStatus={isCompleted} />
      </div>

      {/* Video Section */}
      <div className="bg-dark-100 border border-dark-200 rounded-3xl overflow-hidden shadow-2xl">
        <div className="aspect-video w-full bg-black relative">
          <VideoPlayer videoUrl={displayLesson.video_url} />
        </div>
        
        <div className="p-6 md:p-8 flex items-center justify-between bg-dark-50 border-t border-dark-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <PlayCircle size={24} />
            </div>
            <span className="font-medium">Assistindo agora</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            HD Disponível
          </div>
        </div>
      </div>

      {/* Resources & Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-dark-100 border border-dark-200 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold mb-4">Sobre esta aula</h2>
            <p className="text-gray-400 leading-relaxed">
              Nesta aula, exploraremos profundamente os conceitos fundamentais para a educação do seu cão. 
              Siga as instruções passo a passo e não esqueça de praticar diariamente por pelo menos 15 minutos.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-dark-100 border border-dark-200 rounded-3xl p-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              Materiais
            </h2>
            
            {displayLesson.pdf_url ? (
              <div className="space-y-3">
                <div className="p-4 bg-dark-200 rounded-2xl border border-dark-300 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                      <Download size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Guia Prático</p>
                      <p className="text-xs text-gray-500">PDF • 1.2MB</p>
                    </div>
                  </div>
                  <a 
                    href={displayLesson.pdf_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 hover:bg-dark-300 rounded-lg transition-colors text-primary"
                  >
                    <Download size={20} />
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">Nenhum material disponível para esta aula.</p>
            )}
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-6">
            <h3 className="font-bold text-primary mb-2">Precisa de Ajuda?</h3>
            <p className="text-sm text-gray-400 mb-4">
              Nossa equipe de suporte está pronta para tirar suas dúvidas sobre este conteúdo.
            </p>
            <Link 
              href="/dashboard/support"
              className="block text-center py-2 px-4 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-600 transition-colors"
            >
              Falar com Suporte
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
