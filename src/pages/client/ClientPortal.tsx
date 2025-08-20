import { Shield, FileText, MessageSquare, Download } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const myPolicies = [
  {
    id: 1,
    type: 'Seguro Auto',
    insurer: 'Porto Seguro',
    policyNumber: '1234567890',
    vehicle: 'Honda Civic 2020',
    status: 'ativa',
    premium: 'R$ 1.200,00',
    expiresAt: '15/12/2024',
    coverage: 'Compreensiva'
  },
  {
    id: 2,
    type: 'Seguro Residencial',
    insurer: 'Bradesco Seguros',
    policyNumber: '0987654321',
    property: 'Residência - Rua das Flores, 123',
    status: 'ativa',
    premium: 'R$ 800,00',
    expiresAt: '08/01/2025',
    coverage: 'Residencial Família'
  }
];

const recentDocuments = [
  {
    id: 1,
    name: 'Apólice Seguro Auto - 2024',
    type: 'PDF',
    size: '2.4 MB',
    date: '12/11/2024'
  },
  {
    id: 2,
    name: 'Comprovante Pagamento - Nov/2024',
    type: 'PDF',
    size: '156 KB',
    date: '10/11/2024'
  },
  {
    id: 3,
    name: 'Certificado Seguro Residencial',
    type: 'PDF',
    size: '1.8 MB',
    date: '08/11/2024'
  }
];

const statusColors = {
  ativa: 'bg-success text-success-foreground',
  vencida: 'bg-destructive text-destructive-foreground',
  'em-renovacao': 'bg-accent text-accent-foreground'
};

export default function ClientPortal() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Meu Portal</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu portal de seguros
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Apólices Ativas"
          value="2"
          icon={Shield}
          change="Todas em dia"
          changeType="positive"
        />
        <KPICard
          title="Valor Total Segurado"
          value="R$ 450.000"
          icon={FileText}
          change="Auto + Residencial"
          changeType="neutral"
        />
        <KPICard
          title="Próximo Vencimento"
          value="34 dias"
          icon={MessageSquare}
          change="Seguro Auto"
          changeType="neutral"
        />
        <KPICard
          title="Economia Anual"
          value="R$ 2.400"
          icon={Download}
          change="vs outras seguradoras"
          changeType="positive"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Minhas Apólices</CardTitle>
            <CardDescription>
              Suas apólices de seguro ativas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myPolicies.map((policy) => (
                <div key={policy.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{policy.type}</h4>
                      <Badge 
                        variant="secondary" 
                        className={statusColors[policy.status as keyof typeof statusColors]}
                      >
                        {policy.status}
                      </Badge>
                    </div>
                    <span className="text-sm font-medium text-accent">
                      {policy.premium}
                    </span>
                  </div>
                  
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Seguradora:</strong> {policy.insurer}</p>
                    <p><strong>Apólice:</strong> {policy.policyNumber}</p>
                    <p><strong>Bem:</strong> {policy.vehicle || policy.property}</p>
                    <p><strong>Cobertura:</strong> {policy.coverage}</p>
                    <p><strong>Vencimento:</strong> {policy.expiresAt}</p>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                    <Button variant="outline" size="sm">
                      Baixar Apólice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Documentos Recentes</CardTitle>
            <CardDescription>
              Seus documentos mais recentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{doc.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {doc.type} • {doc.size} • {doc.date}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                Ver Todos os Documentos
              </Button>
            </div>
          </CardContent>
        </Card>
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
                Carlos Santos<br />
                carlos@efika.com.br<br />
                (11) 99999-9999
              </p>
              <Button size="sm" className="w-full">
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