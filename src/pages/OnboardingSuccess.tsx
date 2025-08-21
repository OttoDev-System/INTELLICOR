import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/ui/logo';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Rocket, Users, Globe, BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function OnboardingSuccess() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  const nextSteps = [{
    icon: Users,
    title: 'Cadastrar Primeiro Corretor',
    description: 'Adicione corretores à sua equipe',
    completed: false
  }, {
    icon: Globe,
    title: 'Personalizar Landing Page',
    description: 'Configure sua página de captação',
    completed: false
  }, {
    icon: BarChart3,
    title: 'Configurar Dashboards',
    description: 'Personalize seus relatórios',
    completed: false
  }];
  return <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        {/* Success Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-success/20 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>
          
          <Logo className="justify-center mb-4" size="lg" />
          
          <div className="space-y-2">
            
            <h1 className="text-4xl font-bold text-primary">
              Bem-vindo ao INTELLICOR!
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Sua corretora foi configurada com sucesso e já está pronta para revolucionar seus negócios.
            </p>
          </div>
        </div>

        {/* Setup Progress */}
        <Card className="intellicor-card-shadow mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Rocket className="h-5 w-5" />
              Sistema Configurado
            </CardTitle>
            <CardDescription>
              Todos os componentes foram inicializados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Corretora cadastrada no sistema</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Administrador configurado</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Subdomínio personalizado ativo</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>Landing page white-label criada</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span>IA integrada e funcional</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="intellicor-card-shadow mb-8">
          <CardHeader>
            <CardTitle>Próximos Passos Recomendados</CardTitle>
            <CardDescription>
              Configure estes itens para aproveitar ao máximo a plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextSteps.map((step, index) => <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Button size="lg" className="intellicor-gradient text-lg px-8 h-12 w-full max-w-md" onClick={() => navigate('/admin')}>
            <Rocket className="mr-2 h-5 w-5" />
            Acessar Dashboard Administrativo
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Você receberá um email com informações importantes sobre sua conta.
          </p>
        </div>

        {/* Help Section */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2">Precisa de Ajuda?</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Nossa equipe está pronta para auxiliar você na configuração inicial.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button variant="outline" size="sm">
              Central de Ajuda
            </Button>
            <Button variant="outline" size="sm">
              Agendar Treinamento
            </Button>
            <Button variant="outline" size="sm">
              Falar com Suporte
            </Button>
          </div>
        </div>
      </div>
    </div>;
}