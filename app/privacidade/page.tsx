import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Política de Privacidade | EDUCA DOG EM CASA',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-neon-purple mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a página inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
          <p>
            A sua privacidade é importante para nós. Esta política explica como o EDUCA DOG EM CASA coleta, usa, protege e trata as suas informações pessoais.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Coleta de Informações</h2>
          <p>
            Coletamos informações que você nos fornece diretamente ao se cadastrar em nossa plataforma, como seu nome e endereço de e-mail. Para pagamentos, utilizamos o Mercado Pago, e não armazenamos dados de cartão de crédito em nossos servidores.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Uso das Informações</h2>
          <p>
            Utilizamos suas informações para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Garantir e gerenciar seu acesso à área de membros.</li>
            <li>Enviar comunicações importantes sobre a plataforma e seu acesso.</li>
            <li>Melhorar continuamente nosso produto e suporte.</li>
          </ul>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Proteção de Dados</h2>
          <p>
            Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição, utilizando criptografia e serviços em nuvem seguros.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Compartilhamento</h2>
          <p>
            Não vendemos, trocamos ou transferimos suas informações pessoais para terceiros, exceto para empresas parceiras necessárias para a operação da plataforma (como o serviço de pagamentos e a hospedagem dos vídeos), sempre de forma segura e dentro das normas da LGPD.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Cookies</h2>
          <p>
            Utilizamos cookies para manter sua sessão ativa na área de membros e melhorar a sua experiência no nosso site, garantindo que você não precise fazer login repetidas vezes.
          </p>
        </div>
      </div>
    </div>
  )
}
