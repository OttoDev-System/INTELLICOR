import { Shield, Users, BarChart3, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Gestão Completa de Apólices',
      description: 'Controle total sobre todas as apólices dos seus clientes em um só lugar.'
    },
    {
      icon: Users,
      title: 'CRM Integrado',
      description: 'Gerencie relacionamentos com clientes e acompanhe o pipeline de vendas.'
    },
    {
      icon: BarChart3,
      title: 'Dashboards Inteligentes',
      description: 'Analise performance e tome decisões baseadas em dados precisos.'
    },
    {
      icon: FileText,
      title: 'Documentação Digital',
      description: 'Armazene e organize documentos de forma segura e acessível.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <Button onClick={() => navigate('/auth')} className="intellicor-gradient">
            Acessar Sistema
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/80" />
        
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Plataforma SaaS para{' '}
              <span className="intellicor-gradient bg-clip-text text-transparent">
                Corretoras de Seguros
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Modernize sua corretora com nossa plataforma completa. 
              Gerencie clientes, apólices, vendas e suporte em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="intellicor-gradient text-lg px-8 intellicor-transition hover:shadow-lg"
                onClick={() => navigate('/')}
              >
                Começar Agora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 intellicor-transition hover:shadow-lg"
              >
                Agendar Demo
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
              Tudo que sua corretora precisa
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma solução completa que digitaliza e otimiza todos os processos 
              da sua corretora de seguros.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="intellicor-card-shadow intellicor-transition hover:shadow-lg">
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
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Por que escolher o INTELLICOR?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Aumento de 40% na Produtividade</h3>
                    <p className="text-muted-foreground">
                      Automatize processos repetitivos e foque no que realmente importa: seus clientes.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Redução de 60% no Tempo de Atendimento</h3>
                    <p className="text-muted-foreground">
                      Acesso rápido a informações e processos otimizados para atender melhor.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">ROI Comprovado em 3 Meses</h3>
                    <p className="text-muted-foreground">
                      Veja resultados concretos rapidamente com nossa plataforma eficiente.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="intellicor-card-shadow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Corretoras atendidas</div>
                </CardContent>
              </Card>
              <Card className="intellicor-card-shadow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-accent mb-2">1M+</div>
                  <div className="text-sm text-muted-foreground">Apólices gerenciadas</div>
                </CardContent>
              </Card>
              <Card className="intellicor-card-shadow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-success mb-2">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime garantido</div>
                </CardContent>
              </Card>
              <Card className="intellicor-card-shadow">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-secondary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Suporte técnico</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">
              Pronto para modernizar sua corretora?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a centenas de corretoras que já transformaram 
              seus negócios com o INTELLICOR.
            </p>
            <Button 
              size="lg" 
              className="intellicor-gradient text-lg px-8 intellicor-transition hover:shadow-lg"
              onClick={() => navigate('/')}
            >
              Começar Gratuitamente
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-background">
        <div className="container mx-auto text-center">
          <Logo className="justify-center mb-4" />
          <p className="text-muted-foreground">
            © 2024 INTELLICOR. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}