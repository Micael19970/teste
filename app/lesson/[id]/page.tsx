import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
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
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-gray-400 hover:text-neon-blue mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Voltar para a Área de Membros
      </Link>

      <div className="bg-dark-100 border border-dark-200 rounded-2xl overflow-hidden shadow-2xl mb-8">
        <div className="aspect-video w-full bg-black relative">
          <VideoPlayer videoUrl={displayLesson.video_url} />
        </div>
        
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{displayLesson.title}</h1>
              <p className="text-gray-400">Módulo Único</p>
            </div>
            
            <MarkCompleteButton lessonId={params.id} initialStatus={isCompleted} />
          </div>

          {displayLesson.pdf_url && (
            <div className="prose prose-invert max-w-none">
              <h3 className="text-xl font-bold mb-4">Material Complementar</h3>
              <div className="p-6 border border-dark-300 rounded-xl bg-dark-200/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-neon-purple/20 text-neon-purple rounded-lg">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">Apostila da Aula</h4>
                    <p className="text-sm text-gray-400">PDF</p>
                  </div>
                </div>
                <a 
                  href={displayLesson.pdf_url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-dark-300 hover:bg-dark-200 text-white rounded-lg transition-colors border border-dark-200"
                >
                  Baixar PDF
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
