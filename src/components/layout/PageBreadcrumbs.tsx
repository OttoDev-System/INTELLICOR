
import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useAuth } from '@/contexts/AuthContext';

const routeNames: Record<string, string> = {
  // Admin routes
  'admin': 'Dashboard',
  'users': 'Usuários',
  'reports': 'Relatórios',
  'settings': 'Configurações',
  
  // Broker routes
  'broker': 'Dashboard',
  'clients': 'Meus Clientes',
  'sales': 'Vendas',
  'quotes': 'Cotações',
  
  // Support routes
  'support': 'Dashboard',
  'tickets': 'Tickets',
  'knowledge': 'Base de Conhecimento',
  
  // Client routes
  'portal-cliente': 'Meu Portal',
  'policies': 'Apólices',
  'documents': 'Documentos',
  'contact': 'Contato'
};

export function PageBreadcrumbs() {
  const location = useLocation();
  const { user } = useAuth();
  
  if (!user) return null;

  const pathSegments = location.pathname.split('/').filter(Boolean);
  const basePath = user.role === 'client' ? '/portal-cliente' : `/${user.role}`;
  
  // Don't show breadcrumbs on dashboard pages
  if (pathSegments.length <= 1) return null;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={basePath} className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {pathSegments.slice(1).map((segment, index) => {
          const isLast = index === pathSegments.length - 2;
          const routePath = `/${pathSegments.slice(0, index + 2).join('/')}`;
          const routeName = routeNames[segment] || segment;

          return (
            <div key={segment} className="flex items-center gap-2">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{routeName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={routePath}>{routeName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
