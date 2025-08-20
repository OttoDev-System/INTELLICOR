
import { Settings, Building, Plug, Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AdminSettings() {
  return (
    <PageLayout
      title="Configurações"
      description="Configurações gerais do sistema e integrações"
      primaryAction={{
        label: "Salvar Alterações",
        onClick: () => console.log("Salvar configurações")
      }}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Dados da Empresa
            </CardTitle>
            <CardDescription>
              Informações básicas da sua corretora
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nome da Empresa</Label>
              <Input id="company-name" placeholder="Efika Seguros" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">E-mail</Label>
              <Input id="company-email" placeholder="contato@efika.com.br" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Telefone</Label>
              <Input id="company-phone" placeholder="(11) 9999-9999" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plug className="h-5 w-5" />
              Integrações
            </CardTitle>
            <CardDescription>
              Configure conexões com sistemas externos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Sistema de CRM</h4>
                <p className="text-sm text-muted-foreground">Conectar com sistema externo</p>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">API Seguradoras</h4>
                <p className="text-sm text-muted-foreground">Integração para cotações</p>
              </div>
              <Button variant="outline" size="sm">
                Configurar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Permissões de Usuário
            </CardTitle>
            <CardDescription>
              Configure níveis de acesso por role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['admin', 'broker', 'support'].map((role) => (
                <div key={role} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium capitalize">{role}</h4>
                    <p className="text-sm text-muted-foreground">
                      Configurar permissões para {role === 'admin' ? 'administradores' : 
                      role === 'broker' ? 'corretores' : 'suporte'}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
