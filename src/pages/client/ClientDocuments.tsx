
import { Upload, FileText, Download, Trash2 } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { EmptyState } from '@/components/ui/skeleton-loader';
import { Card, CardContent } from '@/components/ui/card';

export default function ClientDocuments() {
  return (
    <PageLayout
      title="Documentos"
      description="Gerencie seus documentos e comprovantes"
      primaryAction={{
        label: "Enviar Documento",
        onClick: () => console.log("Upload documento")
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
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Enviados</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <Upload className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                <p className="text-2xl font-bold">--</p>
              </div>
              <Download className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <EmptyState
        title="Nenhum documento encontrado"
        description="Seus documentos aparecerão aqui após o upload"
        action="Clique em 'Enviar Documento' para começar"
      />
    </PageLayout>
  );
}
