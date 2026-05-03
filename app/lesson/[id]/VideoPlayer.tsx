'use client'

import { useState } from 'react'
import { PlayCircle } from 'lucide-react'

export default function VideoPlayer({ videoUrl }: { videoUrl: string | null }) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!videoUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500 bg-dark-100">
        <PlayCircle className="w-16 h-16 mb-4 opacity-50" />
        <p>Vídeo indisponível</p>
      </div>
    )
  }

  // Extrai ID do vídeo do YouTube para pegar a miniatura
  let youtubeId = null
  if (videoUrl.includes('youtube.com/watch?v=')) {
    try {
      youtubeId = new URL(videoUrl).searchParams.get('v')
    } catch {
      youtubeId = videoUrl.split('watch?v=')[1]?.split('&')[0]
    }
  } else if (videoUrl.includes('youtu.be/')) {
    youtubeId = videoUrl.split('youtu.be/')[1]?.split('?')[0]
  }

  // Se não foi clicado e é um vídeo do youtube, mostra a capa com nosso botão customizado
  if (!isPlaying && youtubeId) {
    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
    
    return (
      <div 
        className="absolute inset-0 w-full h-full cursor-pointer group bg-black"
        onClick={() => setIsPlaying(true)}
      >
        <img 
          src={thumbnailUrl} 
          alt="Video thumbnail" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        {/* Play button centralizado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-neon-purple/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(176,38,255,0.6)] group-hover:scale-110 transition-transform">
            <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-2"></div>
          </div>
        </div>
      </div>
    )
  }

  // Helper function para formatar a URL para iframe quando for dar o play
  const formatVideoUrl = (url: string) => {
    if (url.includes('youtube.com/') || url.includes('youtu.be/')) {
      // Adiciona autoplay=1 para tocar direto quando substituir a imagem,
      // controls=0 tira a barra, rel=0 tira recomendados estranhos
      return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&controls=0&rel=0&modestbranding=1&disablekb=1`
    }
    // Google Drive
    if (url.includes('drive.google.com/file/d/')) {
      return url.replace('/view', '/preview').split('?')[0] + '/preview'
    }
    return url
  }

  return (
    <iframe 
      src={formatVideoUrl(videoUrl)} 
      className="absolute top-0 left-0 w-full h-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  )
}
