import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  BookOpen, 
  Play,
  Award
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* HEADER ESCASSEZ */}
      <div className="w-full bg-primary text-white text-center py-2 text-sm font-bold uppercase tracking-widest">
        🔥 ÚLTIMAS VAGAS COM ACESSO VITALÍCIO POR APENAS R$ 10,00!
      </div>

      {/* NAVBAR */}
      <nav className="w-full max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">E</span>
          </div>
          <span className="text-xl font-bold tracking-tight">EDUCA<span className="text-primary">DOG</span></span>
        </div>
        <Link 
          href="/login" 
          className="px-6 py-2 border border-dark-300 rounded-full font-bold hover:bg-dark-100 transition-colors"
        >
          Área do Aluno
        </Link>
      </nav>

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-sm">
            <Star size={16} fill="currentColor" />
            Método Comprovado (2.000+ Alunos)
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            O Seu Cão <br />
            <span className="text-gradient">Obediente e Feliz</span> <br />
            em 15 Minutos
          </h1>
          <p className="text-xl text-gray-400 max-w-xl">
            Descubra o passo a passo exato do <strong className="text-white">EDUCA DOG EM CASA</strong>. 
            Sem gritos, sem força física e com resultados visíveis em poucos dias.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/register" 
              className="group flex items-center justify-center px-8 py-5 text-xl font-extrabold text-white bg-primary rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/30"
            >
              COMEÇAR AGORA
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-3 px-4 py-2 border border-dark-300 rounded-2xl">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-dark-200 border-2 border-background flex items-center justify-center overflow-hidden">
                    <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Avatar de aluno ativo" width={32} height={32} />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-400">+2k alunos ativos</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <ShieldCheck className="text-green-500" size={20} />
            Pagamento 100% Seguro • Acesso Imediato
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors"></div>
          <div className="relative rounded-3xl overflow-hidden border border-dark-300 shadow-2xl bg-black">
             <video 
              src="/vsl.mp4#t=0.001" 
              controls 
              preload="metadata"
              className="w-full h-auto aspect-video object-cover"
            >
              Seu navegador não suporta vídeos.
            </video>
          </div>
        </div>
      </section>

      {/* LOGOS / SOCIAL PROOF BAR */}
      <div className="w-full bg-dark-100 py-8 border-y border-dark-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
          <span className="text-xl font-bold italic">REDE GLOBO</span>
          <span className="text-xl font-bold italic">VEJA</span>
          <span className="text-xl font-bold italic">FOLHA</span>
          <span className="text-xl font-bold italic">ESTADÃO</span>
          <span className="text-xl font-bold italic">SBT</span>
        </div>
      </div>

      {/* PAIN POINTS */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
                Você ainda sofre com <br />
                <span className="text-primary italic">comportamentos indesejados?</span>
              </h2>
              <div className="space-y-4">
                {[
                  "Xixi e cocô espalhados pela casa toda",
                  "Móveis, sapatos e chinelos destruídos",
                  "Passeios que parecem uma queda de braço",
                  "Latidos excessivos que incomodam os vizinhos",
                  "Pulos excessivos em visitas e crianças"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-dark-100 rounded-2xl border border-dark-200 group hover:border-primary/30 transition-colors">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 flex-shrink-0">
                      <span className="font-bold">×</span>
                    </div>
                    <span className="text-gray-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-dark-100 p-8 md:p-12 rounded-[40px] border border-dark-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <h3 className="text-2xl font-bold mb-6">A boa notícia é: <br /><span className="text-primary">A culpa não é sua (e nem do seu cão).</span></h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Cães não nascem sabendo as regras dos humanos. Eles precisam de uma guia clara e um método que eles consigam entender. 
              </p>
              <p className="text-gray-400 text-lg leading-relaxed">
                O **EDUCA DOG EM CASA** foi criado justamente para ser essa ponte de comunicação, transformando o caos em obediência em tempo recorde.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES SECTION - Inspired by Reference */}
      <section className="py-24 bg-dark-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold">O Que Você Vai <span className="text-primary">Aprender</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Um cronograma completo do básico ao avançado para transformar o comportamento do seu cão.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Módulo 1: Fundamentos",
                desc: "A psicologia canina e como estabelecer liderança sem medo.",
                items: ["A base do respeito", "Rotina equilibrada", "Linguagem corporal"],
                icon: Zap
              },
              {
                title: "Módulo 2: Comportamento",
                desc: "Resolvendo problemas comuns do dia a dia doméstico.",
                items: ["Xixi e cocô no lugar", "Acabando com a destruição", "Controle de latidos"],
                icon: BookOpen
              },
              {
                title: "Módulo 3: Comandos",
                desc: "Os comandos essenciais para controle e segurança.",
                items: ["Senta e Fica", "O 'Vem' infalível", "Deita e Espera"],
                icon: Play
              },
              {
                title: "Módulo 4: Passeio",
                desc: "Transforme o passeio em um momento de puro prazer.",
                items: ["Andar sem puxar", "Reatividade com outros cães", "Equipamentos corretos"],
                icon: Award
              },
              {
                title: "Módulo 5: Socialização",
                desc: "Como apresentar pessoas e outros animais com segurança.",
                items: ["Visitas em casa", "Crianças e cães", "Ambientes públicos"],
                icon: Star
              },
              {
                title: "BÔNUS: Alimentação",
                desc: "Dicas de nutrição e petiscos saudáveis para treino.",
                items: ["O que evitar", "Petiscos caseiros", "Horários de refeição"],
                icon: Zap,
                isBonus: true
              }
            ].map((mod, i) => (
              <div key={i} className={`p-8 rounded-3xl border transition-all ${mod.isBonus ? 'bg-primary/5 border-primary/20' : 'bg-dark-100 border-dark-200'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${mod.isBonus ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                  <mod.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{mod.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{mod.desc}</p>
                <ul className="space-y-3">
                  {mod.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 size={16} className="text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR SECTION */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-[40px]"></div>
            <div className="relative rounded-[40px] overflow-hidden border border-dark-300 aspect-[4/5]">
              <Image 
                src="https://images.unsplash.com/photo-1541599540903-216a46ca1dfc?auto=format&fit=crop&q=80&w=800" 
                alt="Adestrador Profissional" 
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 bg-dark-100 border border-dark-200 p-6 rounded-3xl shadow-2xl hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Award size={24} />
                </div>
                <div>
                  <p className="font-bold">Certificado Internacional</p>
                  <p className="text-sm text-gray-500">Adestramento Positivo</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold italic">Quem vai te <span className="text-primary">guiar</span>?</h2>
              <p className="text-xl text-gray-400">
                Olá, eu sou o **Micael**, especialista em comportamento canino com mais de 10 anos de experiência transformando a relação entre donos e cães.
              </p>
            </div>
            
            <div className="space-y-6">
              <p className="text-gray-400 leading-relaxed">
                Minha missão é mostrar que você não precisa de força, gritos ou punições para ter um cão educado. O segredo está na **comunicação e no reforço positivo**.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Já ajudei mais de 2.000 famílias a recuperarem a paz em suas casas, ensinando desde comandos básicos até a resolução de comportamentos complexos como agressividade e ansiedade.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <p className="text-3xl font-black text-primary">10+</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Anos de Experiência</p>
              </div>
              <div>
                <p className="text-3xl font-black text-primary">2k+</p>
                <p className="text-sm text-gray-500 uppercase tracking-widest font-bold">Alunos Felizes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white">
            Pronto para começar a <br /> transformação?
          </h2>
          <p className="text-xl text-white/80">
            Garanta sua vaga hoje com acesso vitalício e todos os bônus inclusos.
          </p>
          
          <div className="bg-white p-8 rounded-[40px] shadow-2xl inline-block w-full max-w-md">
            <p className="text-gray-400 line-through text-lg">De R$ 197,00</p>
            <div className="flex items-center justify-center gap-2 my-2">
              <span className="text-2xl font-bold text-gray-900">por apenas</span>
              <span className="text-6xl font-black text-primary">R$ 10</span>
            </div>
            <p className="text-primary font-bold mb-8">PAGAMENTO ÚNICO • SEM MENSALIDADES</p>
            
            <Link 
              href="/register" 
              className="w-full flex items-center justify-center px-8 py-5 text-xl font-extrabold text-white bg-primary rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20"
            >
              QUERO MINHA VAGA AGORA
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-100 border-t border-dark-200 py-16 text-center lg:text-left">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="text-xl font-bold tracking-tight">EDUCA<span className="text-primary">DOG</span></span>
            </div>
            <p className="text-gray-400 max-w-sm mx-auto lg:mx-0">
              Transformando a vida de cães e donos através de um método de adestramento positivo e eficiente.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Links Úteis</h4>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/termos" className="hover:text-primary transition-colors">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="hover:text-primary transition-colors">Privacidade</Link></li>
              <li><Link href="/contato" className="hover:text-primary transition-colors">Contato</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold">Acesso</h4>
            <Link href="/login" className="inline-block px-6 py-2 bg-dark-200 rounded-xl font-bold text-sm hover:bg-dark-300 transition-colors">
              Área do Aluno
            </Link>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-dark-200 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Educa Dog em Casa. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}
