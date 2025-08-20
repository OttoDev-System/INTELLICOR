
import { Plus, Users, UserCheck, UserX } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmptyState } from '@/components/ui/skeleton-loader';
import { Card, CardContent } from '@/components/ui/card';

export default function BrokerClients() {
  return (
    <PageLayout
      title="Meus Clientes"
      description="Gerencie seus clientes e relacionamentos"
      primaryAction={{
        label: "Novo Cliente",
        onClick: () => console.log("Adicionar cliente")
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
              <Users className="h-8 w-8 text-primary" />
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
              <UserX className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <EmptyState
        title="Nenhum cliente cadastrado"
        description="Seus clientes aparecerão aqui após o cadastro"
        action="Clique em 'Novo Cliente' para começar"
      />
    </PageLayout>
  );
}
