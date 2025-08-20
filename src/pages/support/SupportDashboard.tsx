import { MessageSquare, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const openTickets = [
  {
    id: 'T-2024-015',
    customer: 'João Costa',
    subject: 'Dúvida sobre cobertura do seguro auto',
    priority: 'média',
    status: 'aberto',
    created: '2 horas atrás',
    sla: '22h restantes'
  },
  {
    id: 'T-2024-016',
    customer: 'Maria Silva',
    subject: 'Problema na renovação da apólice',
    priority: 'alta',
    status: 'em-andamento',
    created: '4 horas atrás',
    sla: '20h restantes'
  },
  {
    id: 'T-2024-017',
    customer: 'Carlos Santos',
    subject: 'Solicitação de alteração de dados',
    priority: 'baixa',
    status: 'aguardando-cliente',
    created: '1 dia atrás',
    sla: '2 dias restantes'
  },
  {
    id: 'T-2024-018',
    customer: 'Ana Oliveira',
    subject: 'Dúvida sobre sinistro',
    priority: 'alta',
    status: 'aberto',
    created: '30 min atrás',
    sla: '23h restantes'
  }
];

const knowledgeBase = [
  {
    id: 1,
    title: 'Como renovar uma apólice vencida?',
    category: 'Renovação',
    views: 245,
    lastUpdated: '2 dias atrás'
  },
  {
    id: 2,
    title: 'Documentos necessários para sinistro auto',
    category: 'Sinistros',
    views: 189,
    lastUpdated: '1 semana atrás'
  },
  {
    id: 3,
    title: 'Alteração de dados do segurado',
    category: 'Cadastro',
    views: 167,
    lastUpdated: '3 dias atrás'
  },
  {
    id: 4,
    title: 'Cobertura do seguro residencial',
    category: 'Coberturas',
    views: 156,
    lastUpdated: '5 dias atrás'
  }
];

const priorityColors = {
  alta: 'bg-destructive text-destructive-foreground',
  média: 'bg-accent text-accent-foreground',
  baixa: 'bg-secondary text-secondary-foreground'
};

const statusColors = {
  aberto: 'bg-primary text-primary-foreground',
  'em-andamento': 'bg-accent text-accent-foreground',
  'aguardando-cliente': 'bg-secondary text-secondary-foreground'
};

export default function SupportDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard de Suporte</h1>
        <p className="text-muted-foreground">
          Gerencie tickets e monitore SLA
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Tickets Abertos"
          value="23"
          icon={MessageSquare}
          change="+3 hoje"
          changeType="neutral"
        />
        <KPICard
          title="Tempo Médio Resposta"
          value="2.4h"
          icon={Clock}
          change="-15min vs ontem"
          changeType="positive"
        />
        <KPICard
          title="Tickets Resolvidos (Hoje)"
          value="18"
          icon={CheckCircle}
          change="+2 vs ontem"
          changeType="positive"
        />
        <KPICard
          title="SLA em Risco"
          value="4"
          icon={AlertTriangle}
          change="2 críticos"
          changeType="negative"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Tickets em Aberto</CardTitle>
            <CardDescription>
              Tickets que precisam de atenção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {openTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-mono text-primary">
                        {ticket.id}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={priorityColors[ticket.priority as keyof typeof priorityColors]}
                      >
                        {ticket.priority}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={statusColors[ticket.status as keyof typeof statusColors]}
                      >
                        {ticket.status}
                      </Badge>
                    </div>
                    <h4 className="text-sm font-medium">{ticket.subject}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Cliente: {ticket.customer}</span>
                      <span>Criado: {ticket.created}</span>
                      <span>SLA: {ticket.sla}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Atender
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Base de Conhecimento</CardTitle>
            <CardDescription>
              Artigos mais acessados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {knowledgeBase.map((article) => (
                <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm font-medium">{article.title}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <span>{article.views} visualizações</span>
                      <span>Atualizado: {article.lastUpdated}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Editar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}