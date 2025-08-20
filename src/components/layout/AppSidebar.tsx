
import { 
  BarChart3, 
  Users, 
  FileText, 
  Settings, 
  Shield, 
  TrendingUp, 
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';

const getNavItems = (role: string) => {
  const baseItems = [
    { title: 'Dashboard', url: `/${role}`, icon: BarChart3 },
  ];

  switch (role) {
    case 'admin':
      return [
        ...baseItems,
        { title: 'Usuários', url: '/admin/users', icon: Users },
        { title: 'Relatórios', url: '/admin/reports', icon: FileText },
        { title: 'Configurações', url: '/admin/settings', icon: Settings },
      ];
    case 'broker':
      return [
        ...baseItems,
        { title: 'Meus Clientes', url: '/broker/clients', icon: Users },
        { title: 'Vendas', url: '/broker/sales', icon: TrendingUp },
        { title: 'Cotações', url: '/broker/quotes', icon: FileText },
      ];
    case 'support':
      return [
        ...baseItems,
        { title: 'Tickets', url: '/support/tickets', icon: MessageSquare },
        { title: 'Clientes', url: '/support/clients', icon: UserCheck },
        { title: 'Base Conhecimento', url: '/support/knowledge', icon: FileText },
      ];
    case 'client':
      return [
        { title: 'Meu Portal', url: '/portal-cliente', icon: BarChart3 },
        { title: 'Apólices', url: '/portal-cliente/policies', icon: Shield },
        { title: 'Documentos', url: '/portal-cliente/documents', icon: FileText },
        { title: 'Contato', url: '/portal-cliente/contact', icon: MessageSquare },
      ];
    default:
      return baseItems;
  }
};

export function AppSidebar() {
  const { state } = useSidebar();
  const { user } = useAuth();

  if (!user) return null;

  const navItems = getNavItems(user.role);
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar 
      className={isCollapsed ? 'w-16' : 'w-64'} 
      collapsible="icon"
    >
      <SidebarHeader className="p-6">
        <Logo showText={!isCollapsed} size="md" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={`${isCollapsed ? 'sr-only' : ''} text-black dark:text-white font-medium`}>
            {user.role === 'client' ? 'Portal do Cliente' : 'Navegação'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                     <NavLink 
                       to={item.url} 
                       end={item.url === `/${user.role}` || item.url === '/portal-cliente'}
                       className={({ isActive }) =>
                         `flex items-center gap-3 px-3 py-2 rounded-lg efika-transition ${
                           isActive 
                             ? 'bg-primary text-primary-foreground font-medium' 
                             : 'text-black hover:bg-muted hover:text-black dark:text-white dark:hover:text-white'
                         }`
                       }
                     >
                      <item.icon className="h-4 w-4 shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
