import { MessageSquare, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { KPICardSkeleton, DataCardSkeleton } from '@/components/ui/skeleton-loader';

export default function SupportDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard de Suporte</h1>
        <p className="text-muted-foreground">
          Gerencie tickets e monitore SLA
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
          title="Tickets em Aberto"
          description="Tickets que precisam de atenção"
        />
        <DataCardSkeleton
          title="Base de Conhecimento"
          description="Artigos mais acessados"
        />
      </div>
    </div>
  );
}