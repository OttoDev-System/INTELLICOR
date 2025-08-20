import { Shield, FileText, MessageSquare, Download } from 'lucide-react';
import { KPICardSkeleton, DataCardSkeleton } from '@/components/ui/skeleton-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ClientPortal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Portal</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu portal de seguros
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
          title="Minhas Apólices"
          description="Suas apólices de seguro ativas"
        />
        <DataCardSkeleton
          title="Documentos Recentes"
          description="Seus documentos mais recentes"
        />
      </div>

      <Card className="efika-card-shadow">
        <CardHeader>
          <CardTitle>Precisa de Ajuda?</CardTitle>
          <CardDescription>
            Entre em contato com seu corretor ou nossa equipe de suporte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Seu Corretor</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Dados serão carregados via API<br />
                🔌 Conectar sistema de CRM
              </p>
              <Button size="sm" className="w-full" disabled>
                Entrar em Contato
              </Button>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Suporte 24h</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Equipe de suporte técnico<br />
                suporte@efika.com.br<br />
                0800 123 4567
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Abrir Ticket
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}