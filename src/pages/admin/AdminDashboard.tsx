import { Users, Shield, TrendingUp, Target } from 'lucide-react';
import { KPICardSkeleton, DataCardSkeleton } from '@/components/ui/skeleton-loader';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">
          Visão geral completa da Efika Seguros
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
          title="Atividades Recentes"
          description="Últimas ações realizadas no sistema"
        />
        <DataCardSkeleton
          title="Performance por Seguradora"
          description="Volume de vendas por parceiro"
        />
      </div>
    </div>
  );
}