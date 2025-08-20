import { Users, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const myClients = [
  {
    id: 1,
    name: 'José Silva',
    email: 'jose.silva@email.com',
    lastContact: '2 dias atrás',
    status: 'ativo',
    policies: 2
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    lastContact: '1 semana atrás',
    status: 'follow-up',
    policies: 1
  },
  {
    id: 3,
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@email.com',
    lastContact: '3 dias atrás',
    status: 'ativo',
    policies: 3
  },
  {
    id: 4,
    name: 'Ana Costa',
    email: 'ana.costa@email.com',
    lastContact: '2 semanas atrás',
    status: 'pendente',
    policies: 0
  }
];

const pendingTasks = [
  {
    id: 1,
    task: 'Ligar para Maria Santos - Follow-up cotação residencial',
    priority: 'alta',
    deadline: 'Hoje'
  },
  {
    id: 2,
    task: 'Enviar documentação para José Silva - Renovação auto',
    priority: 'média',
    deadline: 'Amanhã'
  },
  {
    id: 3,
    task: 'Preparar apresentação para novo cliente - Empresa XYZ',
    priority: 'alta',
    deadline: '2 dias'
  },
  {
    id: 4,
    task: 'Analisar sinistro - Cliente Carlos Oliveira',
    priority: 'baixa',
    deadline: '1 semana'
  }
];

const statusColors = {
  ativo: 'bg-success text-success-foreground',
  'follow-up': 'bg-accent text-accent-foreground',
  pendente: 'bg-destructive text-destructive-foreground'
};

const priorityColors = {
  alta: 'bg-destructive text-destructive-foreground',
  média: 'bg-accent text-accent-foreground',
  baixa: 'bg-secondary text-secondary-foreground'
};

export default function BrokerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Meu Dashboard</h1>
        <p className="text-muted-foreground">
          Acompanhe suas vendas e atividades
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Meus Clientes"
          value="47"
          icon={Users}
          change="+3 este mês"
          changeType="positive"
        />
        <KPICard
          title="Vendas do Mês"
          value="R$ 24.500"
          icon={TrendingUp}
          change="+18% vs mês anterior"
          changeType="positive"
        />
        <KPICard
          title="Comissão do Mês"
          value="R$ 6.125"
          icon={DollarSign}
          change="+12% vs mês anterior"
          changeType="positive"
        />
        <KPICard
          title="Tarefas Pendentes"
          value="8"
          icon={Clock}
          change="4 prioritárias"
          changeType="neutral"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Meus Clientes</CardTitle>
            <CardDescription>
              Clientes recentes e status de relacionamento
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myClients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-medium">{client.name}</h4>
                      <Badge 
                        variant="secondary" 
                        className={statusColors[client.status as keyof typeof statusColors]}
                      >
                        {client.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{client.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {client.policies} apólices • Último contato: {client.lastContact}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver detalhes
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Tarefas Pendentes</CardTitle>
            <CardDescription>
              Suas próximas atividades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-3 p-4 border rounded-lg">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${priorityColors[task.priority as keyof typeof priorityColors]}`}
                      >
                        {task.priority}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {task.deadline}
                      </span>
                    </div>
                    <p className="text-sm">{task.task}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Concluir
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