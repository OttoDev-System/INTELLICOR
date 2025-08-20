
import { Plus, UserCheck, UserX, Shield } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmptyState } from '@/components/ui/skeleton-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AdminUsers() {
  return (
    <PageLayout
      title="Usuários"
      description="Gerencie usuários e permissões do sistema"
      primaryAction={{
        label: "Adicionar Usuário",
        onClick: () => console.log("Adicionar usuário")
      }}
      showSearch
    >
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <UserCheck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <UserCheck className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inativos</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <UserX className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      <EmptyState
        title="Nenhum usuário cadastrado"
        description="Quando você adicionar usuários, eles aparecerão aqui"
        action="Clique em 'Adicionar Usuário' para começar"
      />
    </PageLayout>
  );
}
