
import { Users, Search, UserCheck, Clock } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmptyState } from '@/components/ui/skeleton-loader';
import { Card, CardContent } from '@/components/ui/card';

export default function SupportClients() {
  return (
    <PageLayout
      title="Clientes"
      description="Busque clientes e visualize histórico de atendimentos"
      showSearch
    >
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Atendimentos Hoje</p>
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
                <p className="text-sm font-medium text-muted-foreground">Tempo Médio</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <EmptyState
        title="Use a busca para encontrar clientes"
        description="Digite o nome, e-mail ou telefone do cliente"
        action="Histórico de atendimentos aparecerá aqui"
      />
    </PageLayout>
  );
}
