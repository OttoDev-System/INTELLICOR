import { Users, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { KPICardSkeleton, DataCardSkeleton } from '@/components/ui/skeleton-loader';

export default function BrokerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe suas vendas e atividades
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DataCardSkeleton
          title="Meus Clientes"
          description="Clientes recentes e status de relacionamento"
        />
        <DataCardSkeleton
          title="Tarefas Pendentes"
          description="Suas próximas atividades"
        />
      </div>
    </div>
  );
}