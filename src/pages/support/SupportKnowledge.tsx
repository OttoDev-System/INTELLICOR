
import { Plus, BookOpen, Search, Eye } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmptyState } from '@/components/ui/skeleton-loader';
import { Card, CardContent } from '@/components/ui/card';

export default function SupportKnowledge() {
  return (
    <PageLayout
      title="Base de Conhecimento"
      description="Artigos, FAQs e documentação de suporte"
      primaryAction={{
        label: "Novo Artigo",
        onClick: () => console.log("Novo artigo")
      }}
      showSearch
    >
      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Artigos</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Visualizações</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <Eye className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mais Acessado</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <EmptyState
        title="Nenhum artigo cadastrado"
        description="Crie artigos para auxiliar no atendimento"
        action="Clique em 'Novo Artigo' para começar"
      />
    </PageLayout>
  );
}
