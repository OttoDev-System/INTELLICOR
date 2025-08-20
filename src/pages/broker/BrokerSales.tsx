
import { TrendingUp, DollarSign, Target, Calendar } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { KPICardSkeleton, DataCardSkeleton } from '@/components/ui/skeleton-loader';

export default function BrokerSales() {
  return (
    <PageLayout
      title="Vendas e Comissões"
      description="Acompanhe seu pipeline e histórico de vendas"
      primaryAction={{
        label: "Nova Venda",
        onClick: () => console.log("Nova venda")
      }}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
        <KPICardSkeleton />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <DataCardSkeleton
          title="Pipeline de Vendas"
          description="Oportunidades em andamento"
        />
        <DataCardSkeleton
          title="Histórico de Comissões"
          description="Suas comissões recebidas"
        />
        <DataCardSkeleton
          title="Metas vs Realizado"
          description="Acompanhamento mensal de metas"
        />
        <DataCardSkeleton
          title="Vendas por Produto"
          description="Performance por tipo de seguro"
        />
      </div>
    </PageLayout>
  );
}
