import Link from 'next/link'
import { ArrowRight, Star, ShieldCheck, Clock, HelpCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER ESCASSEZ */}
      <div className="w-full bg-red-600 text-white text-center py-2 text-sm font-bold uppercase tracking-wide">
        🚨 Atenção: Últimas horas para garantir o acesso vitalício por apenas R$ 10,00!
      </div>

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-neon-purple/20 border border-neon-purple/50 text-neon-purple font-semibold text-sm">
          🐶 Método Comprovado por mais de 2.000 alunos
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          O Segredo Para Ter Um Cachorro <br className="hidden lg:block" />
          <span className="text-gradient">Obediente Em Poucos Dias</span>
        </h1>
        <p className="text-lg sm:text-2xl text-gray-400 mb-10 max-w-3xl">
          Sem precisar gritar, sem usar força física e dedicando apenas 15 minutos do seu dia. 
          Descubra o passo a passo exato do <strong className="text-white">EDUCA DOG EM CASA</strong>.
        </p>

        <div className="w-full max-w-4xl rounded-2xl shadow-[0_0_40px_rgba(176,38,255,0.3)] mb-12 border border-dark-300 overflow-hidden bg-black">
          <video 
            src="/vsl.mp4" 
            controls 
            controlsList="nodownload"
            className="w-full h-auto max-h-[600px] object-contain"
          >
            Seu navegador não suporta vídeos.
          </video>
        </div>

        <Link 
          href="/register" 
          className="group relative inline-flex items-center justify-center px-8 py-5 text-xl font-extrabold text-black bg-gradient-neon rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.5)]"
        >
          QUERO TRANSFORMAR MEU CÃO AGORA
          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </Link>
        <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Pagamento 100% Seguro via Mercado Pago</span>
        </div>
      </section>

      {/* PAIN POINTS (DORES) */}
      <section className="bg-dark-100 py-20 border-y border-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16">
            Você está cansado de passar por isso?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Chegar do trabalho e encontrar a casa destruída (sofá, sapatos, lixo).",
              "Passear com o cachorro e ele te puxar o tempo todo como se estivesse em uma corrida.",
              "Receber visitas e o cachorro pular, latir e incomodar todo mundo.",
              "Fazer xixi e cocô no lugar errado mesmo você já tendo ensinado mil vezes.",
              "Latidos excessivos que atrapalham o seu sono e geram reclamações dos vizinhos.",
              "Agressividade ou rosnados na hora de comer ou pegar um brinquedo."
            ].map((dor, i) => (
              <div key={i} className="p-6 bg-dark-200 rounded-2xl border border-red-500/20 flex items-start space-x-4">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-500 font-bold">X</span>
                </div>
                <p className="text-gray-300 text-lg">{dor}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gradient mb-4">A culpa não é do seu cachorro (e nem sua!)</h3>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              Vocês apenas estão falando idiomas diferentes. O EDUCA DOG EM CASA é o tradutor que faltava para vocês se entenderem de uma vez por todas.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF (AVALIAÇÕES) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16">
            Quem aplica, <span className="text-gradient">vê resultados rápidos</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mariana Silva",
                img: "https://i.pravatar.cc/150?img=5",
                text: "Eu não aguentava mais meu Golden puxando a guia. Em apenas 3 dias aplicando o módulo 4, ele já está andando do meu lado! Parece mágica."
              },
              {
                name: "Carlos Eduardo",
                img: "https://i.pravatar.cc/150?img=11",
                text: "Achava que meu vira-lata já estava velho demais pra aprender (ele tem 6 anos). Hoje ele não pula mais nas visitas e espera o comando pra comer. Valeu cada centavo!"
              },
              {
                name: "Ana Paula",
                img: "https://i.pravatar.cc/150?img=9",
                text: "Comprei vários cursos caros antes e nenhum funcionou porque eram muito complexos. Esse método é direto ao ponto. Meu tapete da sala agradece! kkk"
              }
            ].map((dep, i) => (
              <div key={i} className="p-8 bg-dark-100 rounded-2xl border border-dark-300 shadow-lg flex flex-col relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <img src={dep.img} alt={dep.name} className="w-16 h-16 rounded-full border-4 border-background" />
                </div>
                <div className="flex justify-center space-x-1 mb-6 mt-8">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 flex-grow mb-6 text-center italic">&quot;{dep.text}&quot;</p>
                <p className="font-bold text-neon-blue text-center">{dep.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER & SCARCITY */}
      <section className="bg-gradient-to-br from-dark-100 to-neon-purple/10 py-20 border-y border-neon-purple/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/20 rounded-full blur-[100px]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-8">
            Tudo o que você precisa por um <span className="text-neon-purple underline">preço simbólico</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Enquanto um adestrador particular cobra em média <strong>R$ 800,00 por mês</strong>, hoje você vai levar o acesso VITALÍCIO ao método completo por um valor inacreditável.
          </p>
          
          <div className="bg-background border-2 border-neon-purple p-8 rounded-3xl inline-block w-full max-w-md shadow-[0_0_40px_rgba(176,38,255,0.2)]">
            <p className="text-gray-400 line-through text-xl mb-2">De R$ 197,00</p>
            <div className="flex items-end justify-center gap-2 mb-2">
              <span className="text-2xl font-bold">por apenas</span>
              <span className="text-6xl font-extrabold text-gradient">R$ 10</span>
            </div>
            <p className="text-neon-blue font-bold mb-8">Pagamento Único • Acesso Vitalício</p>
            
            <Link 
              href="/register" 
              className="w-full flex items-center justify-center px-8 py-5 text-xl font-extrabold text-black bg-gradient-neon rounded-xl hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              SIM! QUERO GARANTIR MINHA VAGA
            </Link>
            
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-red-500" />
              <span>Oferta expira em breve. Vagas limitadas.</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-neon-blue" />
            Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            {[
              {
                q: "Como vou receber o acesso?",
                a: "Assim que o pagamento de R$ 10 for aprovado, seu acesso é liberado instantaneamente aqui mesmo na plataforma. Basta criar sua conta!"
              },
              {
                q: "O pagamento é seguro?",
                a: "Sim! Utilizamos a tecnologia do Mercado Pago. Seus dados estão 100% criptografados e protegidos."
              },
              {
                q: "E se meu cachorro já for adulto, funciona?",
                a: "Absolutamente! O método funciona para filhotes a partir de 45 dias até cães idosos. Cães aprendem em qualquer idade."
              },
              {
                q: "Por quanto tempo tenho acesso?",
                a: "O acesso é VITALÍCIO. Você paga apenas uma vez e pode assistir às aulas quando e quantas vezes quiser, para sempre."
              }
            ].map((faq, i) => (
              <div key={i} className="bg-dark-100 p-6 rounded-xl border border-dark-200">
                <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-100 border-t border-dark-200 py-12 mt-auto text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl font-bold text-gray-400 mb-6">EDUCA DOG EM CASA</h2>
          <div className="flex justify-center gap-6 mb-8 text-sm text-gray-500">
            <Link href="/termos" className="hover:text-neon-purple transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-neon-purple transition-colors">Política de Privacidade</Link>
            <Link href="/contato" className="hover:text-neon-purple transition-colors">Contato</Link>
          </div>
          <p className="text-sm text-gray-600">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. 
            Depois que você sair do Facebook, a responsabilidade não é deles e sim do nosso site.<br/>
            © {new Date().getFullYear()} Educa Dog em Casa. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
