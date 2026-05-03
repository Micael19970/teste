import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { lessonId, completed } = await request.json()

    if (completed) {
      const { error } = await supabase
        .from('progress')
        .upsert({ 
          user_id: user.id, 
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        }, { onConflict: 'user_id, lesson_id' })

      if (error) throw error
    } else {
      const { error } = await supabase
        .from('progress')
        .delete()
        .match({ user_id: user.id, lesson_id: lessonId })

      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 })
  }
}
