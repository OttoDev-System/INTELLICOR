
import { BarChart3, TrendingUp, DollarSign, FileText } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { KPICardSkeleton, DataCardSkeleton } from '@/components/ui/skeleton-loader';

export default function AdminReports() {
  return (
    <PageLayout
      title="Relatórios"
      description="Relatórios gerenciais e análises de performance"
      primaryAction={{
        label: "Exportar Relatório",
        onClick: () => console.log("Exportar relatório")
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
          title="Vendas por Período"
          description="Performance de vendas mensais e anuais"
        />
        <DataCardSkeleton
          title="Performance por Corretor"
          description="Ranking de vendas por corretor"
        />
        <DataCardSkeleton
          title="Relatório Financeiro"
          description="Comissões, prêmios e receitas"
        />
        <DataCardSkeleton
          title="Análise de Produtos"
          description="Produtos mais vendidos por categoria"
        />
      </div>
    </PageLayout>
  );
}
