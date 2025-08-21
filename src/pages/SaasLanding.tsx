import { Shield, Users, BarChart3, FileText, Brain, Globe, Star, Check, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';
export default function SaasLanding() {
  const navigate = useNavigate();
  const features = [{
    icon: Brain,
    title: 'IA Integrada',
    description: 'Análise inteligente de leads e automação de processos com inteligência artificial.'
  }, {
    icon: Globe,
    title: 'Landing Pages White-Label',
    description: 'Páginas personalizadas para cada corretora com domínio próprio incluído.'
  }, {
    icon: Shield,
    title: 'Sistema Completo',
    description: 'CRM, gestão de apólices, dashboards e documentos em uma plataforma única.'
  }, {
    icon: Users,
    title: 'Multi-Tenancy',
    description: 'Gestão completa de múltiplas corretoras com isolamento total de dados.'
  }];
  const plans = [{
    name: 'BÁSICO',
    price: 'R$ 297',
    period: '/mês',
    description: 'Ideal para corretoras iniciando a digitalização',
    features: ['Sistema completo de gestão', 'Subdomain personalizado', 'Até 500 clientes', 'Dashboard básico', 'Suporte por email', 'Relatórios essenciais'],
    badge: '',
    ctaText: 'Escolher Básico',
    ctaVariant: 'outline' as const
  }, {
    name: 'PRO',
    price: 'R$ 597',
    period: '/mês',
    description: 'Para corretoras que querem crescer com IA',
    features: ['Tudo do Básico', 'Landing page personalizada', 'IA para análise de leads', 'Até 2.000 clientes', 'Dashboards avançados', 'Suporte prioritário', 'API completa', 'Automações inteligentes'],
    badge: 'MAIS POPULAR',
    ctaText: 'Escolher Pro',
    ctaVariant: 'default' as const
  }, {
    name: 'ENTERPRISE',
    price: 'R$ 997',
    period: '/mês',
    description: 'Solução completa para grandes corretoras',
    features: ['Tudo do Pro', 'Domínio próprio', 'White-label completo', 'Clientes ilimitados', 'IA avançada personalizada', 'Suporte dedicado', 'Integração customizada', 'Treinamento incluso'],
    badge: 'PREMIUM',
    ctaText: 'Falar com Especialista',
    ctaVariant: 'secondary' as const
  }];
  const testimonials = [{
    name: 'Carlos Silva',
    company: 'Silva Seguros',
    content: 'Aumentamos nossa conversão em 180% com as landing pages personalizadas do INTELLICOR.',
    rating: 5
  }, {
    name: 'Maria Santos',
    company: 'Santos Corretora',
    content: 'A IA do sistema identifica os melhores leads automaticamente. Revolucionou nosso processo!',
    rating: 5
  }, {
    name: 'João Oliveira',
    company: 'Oliveira & Associados',
    content: 'White-label perfeito! Nossos clientes nem sabem que usamos INTELLICOR. Profissional total.',
    rating: 5
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/auth')}>
              Login
            </Button>
            <Button onClick={() => navigate('/auth')} className="intellicor-gradient">
              Começar Agora
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5" style={{
        backgroundImage: `url(${heroImage})`
      }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-300">
              INTELLICOR - A {' '}
              <span className="intellicor-gradient bg-clip-text text-transparent">
                Corretagem Inteligente
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Inteligência Artificial + Gestão Completa + Landing Pages Personalizadas.
              Tudo que sua corretora precisa para dominar o mercado digital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="intellicor-gradient text-lg px-8 intellicor-transition hover:shadow-lg" onClick={() => navigate('#planos')}>
                <Zap className="mr-2 h-5 w-5" />
                Escolher Plano
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 intellicor-transition hover:shadow-lg">
                Ver Demo Grátis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Tecnologia que Faz a Diferença
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Não é apenas um sistema. É uma revolução completa na forma como sua corretora 
              opera, vende e se relaciona com clientes.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => <Card key={index} className="intellicor-card-shadow intellicor-transition hover:shadow-lg border-0">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-lg intellicor-gradient flex items-center justify-center mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-slate-200">
              Planos que Cabem no seu Bolso
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano ideal para sua corretora. Todos incluem suporte completo e 
              atualizações automáticas.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            {plans.map((plan, index) => <Card key={index} className={`intellicor-card-shadow intellicor-transition hover:shadow-xl relative ${plan.badge === 'MAIS POPULAR' ? 'border-primary ring-2 ring-primary/20 scale-105' : ''}`}>
                {plan.badge && <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 ${plan.badge === 'MAIS POPULAR' ? 'bg-primary' : 'bg-secondary'}`}>
                    {plan.badge}
                  </Badge>}
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-300">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => <li key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-success shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>)}
                  </ul>
                  <Button className="w-full h-12" variant={plan.ctaVariant} onClick={() => console.log(`Escolheu plano: ${plan.name}`)}>
                    {plan.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Corretoras que Já Revolucionaram
            </h2>
            <p className="text-xl text-muted-foreground">
              Veja o que nossos clientes dizem sobre os resultados
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => <Card key={index} className="intellicor-card-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Pronto para Revolucionar sua Corretora?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a centenas de corretoras que já transformaram seus negócios 
              com INTELLICOR. Comece hoje mesmo!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="intellicor-gradient text-lg px-8 intellicor-transition hover:shadow-lg" onClick={() => navigate('#planos')}>
                Começar Agora - Teste Grátis
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 intellicor-transition">
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Logo className="mb-4" />
              <p className="text-muted-foreground mb-4 max-w-md">
                INTELLICOR é a plataforma SaaS completa para corretoras de seguros. 
                Revolucione seu negócio com inteligência artificial e tecnologia de ponta.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Plataforma</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sistema de Gestão</li>
                <li>Landing Pages</li>
                <li>IA Integrada</li>
                <li>White-Label</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Sobre Nós</li>
                <li>Contato</li>
                <li>Suporte</li>
                <li>Termos de Uso</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 INTELLICOR. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>;
}