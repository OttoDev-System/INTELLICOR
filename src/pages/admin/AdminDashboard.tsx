import { Users, Shield, TrendingUp, Target } from 'lucide-react';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const recentActivities = [
  {
    id: 1,
    user: 'Carlos Santos',
    action: 'Vendeu apólice',
    details: 'Seguro Auto - Porto Seguro',
    time: '2 horas atrás',
    type: 'sale'
  },
  {
    id: 2,
    user: 'Maria Oliveira',
    action: 'Resolveu ticket',
    details: '#T-2024-001 - Dúvida sobre cobertura',
    time: '4 horas atrás',
    type: 'support'
  },
  {
    id: 3,
    user: 'Ana Silva',
    action: 'Criou usuário',
    details: 'Novo corretor: Pedro Lima',
    time: '1 dia atrás',
    type: 'user'
  },
  {
    id: 4,
    user: 'Carlos Santos',
    action: 'Enviou cotação',
    details: 'Residencial - Bradesco Seguros',
    time: '2 dias atrás',
    type: 'quote'
  }
];

const typeColors = {
  sale: 'bg-success/10 text-success',
  support: 'bg-accent/10 text-accent',
  user: 'bg-secondary/10 text-secondary',
  quote: 'bg-primary/10 text-primary'
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard Administrativo</h1>
        <p className="text-muted-foreground">
          Visão geral completa da Efika Seguros
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total de Clientes"
          value="1,247"
          icon={Users}
          change="+12% vs mês anterior"
          changeType="positive"
        />
        <KPICard
          title="Apólices Ativas"
          value="2,891"
          icon={Shield}
          change="+8% vs mês anterior"
          changeType="positive"
        />
        <KPICard
          title="Receita Mensal"
          value="R$ 850.400"
          icon={TrendingUp}
          change="+15% vs mês anterior"
          changeType="positive"
        />
        <KPICard
          title="Taxa de Conversão"
          value="68.5%"
          icon={Target}
          change="-2% vs mês anterior"
          changeType="negative"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${typeColors[activity.type as keyof typeof typeColors]}`} />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">
                        <span className="text-primary">{activity.user}</span>{' '}
                        {activity.action}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Performance por Seguradora</CardTitle>
            <CardDescription>
              Volume de vendas por parceiro
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Porto Seguro', volume: 'R$ 245.600', percentage: 28.9, color: 'bg-primary' },
                { name: 'Bradesco Seguros', volume: 'R$ 198.400', percentage: 23.3, color: 'bg-accent' },
                { name: 'SulAmérica', volume: 'R$ 156.800', percentage: 18.4, color: 'bg-secondary' },
                { name: 'Mapfre', volume: 'R$ 134.200', percentage: 15.8, color: 'bg-success' },
                { name: 'Outros', volume: 'R$ 115.400', percentage: 13.6, color: 'bg-muted' }
              ].map((insurer) => (
                <div key={insurer.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${insurer.color}`} />
                    <span className="text-sm font-medium">{insurer.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {insurer.volume}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {insurer.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}