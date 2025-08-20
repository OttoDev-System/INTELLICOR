import { Users, Shield, TrendingUp, Target, Plus, Mail, User } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { KPICard } from '@/components/ui/kpi-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'broker' | 'support';
  status: 'active' | 'inactive';
  avatar_url?: string;
  created_at: string;
}

export default function AdminUsers() {
  const { user } = useAuth();
  
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users', user?.organization_id],
    queryFn: async () => {
      if (!user?.organization_id) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('organization_id', user.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserProfile[];
    },
    enabled: !!user?.organization_id
  });

  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter(u => u.status === 'active').length || 0;
  const inactiveUsers = users?.filter(u => u.status === 'inactive').length || 0;
  const adminUsers = users?.filter(u => u.role === 'admin').length || 0;

  const getRoleLabel = (role: string) => {
    const labels = {
      admin: 'Administrador',
      broker: 'Corretor', 
      support: 'Suporte'
    };
    return labels[role as keyof typeof labels];
  };

  const getRoleBadgeVariant = (role: string) => {
    const variants = {
      admin: 'destructive',
      broker: 'default',
      support: 'secondary'
    };
    return variants[role as keyof typeof variants] || 'default';
  };

  if (error) {
    return (
      <PageLayout
        title="Usuários"
        description="Gerencie usuários e permissões do sistema"
        primaryAction={{
          label: "Adicionar Usuário",
          onClick: () => console.log("Adicionar usuário")
        }}
      >
        <Card className="intellicor-card-shadow">
          <CardContent className="p-6">
            <p className="text-destructive">Erro ao carregar usuários: {error.message}</p>
          </CardContent>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Usuários"
      description={`Gerencie usuários da ${user?.organization?.name || 'organização'}`}
      primaryAction={{
        label: "Adicionar Usuário",
        onClick: () => console.log("Adicionar usuário"),
        icon: Plus
      }}
      showSearch
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <KPICard
          title="Total de Usuários"
          value={totalUsers.toString()}
          description="Usuários cadastrados"
          icon={Users}
          loading={isLoading}
        />
        <KPICard
          title="Usuários Ativos"
          value={activeUsers.toString()}
          description="Usuários com acesso ativo"
          icon={TrendingUp}
          loading={isLoading}
        />
        <KPICard
          title="Administradores"
          value={adminUsers.toString()}
          description="Usuários com perfil admin"
          icon={Shield}
          loading={isLoading}
        />
        <KPICard
          title="Inativos"
          value={inactiveUsers.toString()}
          description="Usuários sem acesso"
          icon={Target}
          loading={isLoading}
        />
      </div>

      <Card className="intellicor-card-shadow">
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            Todos os usuários da organização
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : users && users.length > 0 ? (
            <div className="space-y-4">
              {users.map((userItem) => (
                <div key={userItem.id} className="flex items-center justify-between p-4 border rounded-lg intellicor-hover-glow">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={userItem.avatar_url} />
                      <AvatarFallback>
                        {userItem.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{userItem.name}</p>
                        <Badge 
                          variant={getRoleBadgeVariant(userItem.role) as any}
                          className="text-xs"
                        >
                          {getRoleLabel(userItem.role)}
                        </Badge>
                        <Badge 
                          variant={userItem.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {userItem.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {userItem.email}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>Cadastrado em {new Date(userItem.created_at).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      {userItem.status === 'active' ? 'Desativar' : 'Ativar'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Nenhum usuário encontrado</h3>
              <p className="text-muted-foreground mb-4">
                Comece adicionando o primeiro usuário à sua organização.
              </p>
              <Button className="intellicor-gradient">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Usuário
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </PageLayout>
  );
}