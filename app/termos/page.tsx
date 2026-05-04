import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Termos de Uso | EDUCA DOG EM CASA',
}

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para a página inicial
        </Link>
        
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="prose prose-invert max-w-none text-gray-300 space-y-6">
          <p>
            Bem-vindo ao EDUCA DOG EM CASA. Ao acessar nosso site e adquirir nosso treinamento, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Uso do Conteúdo</h2>
          <p>
            O conteúdo do treinamento EDUCA DOG EM CASA é fornecido exclusivamente para fins educacionais e informativos. 
            É proibida a reprodução, distribuição, modificação ou uso comercial não autorizado do nosso material, vídeos e PDFs.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Acesso à Plataforma</h2>
          <p>
            Ao adquirir o treinamento, você recebe acesso vitalício e individual à nossa plataforma de membros.
            O compartilhamento de credenciais de acesso é estritamente proibido e pode resultar no cancelamento permanente da conta sem direito a reembolso.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Resultados</h2>
          <p>
            Os resultados do adestramento podem variar de cachorro para cachorro. Nós fornecemos as ferramentas, técnicas e o passo a passo, mas o sucesso depende da sua dedicação, consistência e aplicação diária do método.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Reembolso</h2>
          <p>
            Oferecemos uma garantia incondicional de 7 dias, conforme determina a legislação. Se dentro desse período você não estiver satisfeito, basta solicitar o reembolso.
          </p>

          <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Modificações</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão notificadas aos usuários ativos na plataforma.
          </p>
        </div>
      </div>
    </div>
  )
}
