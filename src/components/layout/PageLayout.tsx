
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { PageBreadcrumbs } from './PageBreadcrumbs';

interface PageLayoutProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    icon?: React.ComponentType<any>;
  };
  secondaryActions?: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }>;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  loading?: boolean;
  children: React.ReactNode;
}

export function PageLayout({ 
  title, 
  description, 
  primaryAction, 
  secondaryActions,
  showSearch = false,
  searchPlaceholder = "Buscar...",
  onSearchChange,
  loading = false,
  children 
}: PageLayoutProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Breadcrumbs Integration */}
      <PageBreadcrumbs />
      
      {/* Header Section */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between efika-mobile-stack">
        <div className="space-y-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-sm lg:text-base text-muted-foreground">{description}</p>
        </div>
        
        {/* Actions Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 efika-mobile-full">
          {showSearch && (
            <div className="relative flex-1 sm:min-w-64 efika-mobile-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={searchPlaceholder}
                className="pl-10 efika-focus"
                onChange={(e) => onSearchChange?.(e.target.value)}
              />
            </div>
          )}
          
          {/* Secondary Actions */}
          {secondaryActions?.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action.onClick}
              className="efika-transition hover:scale-105"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
          
          {/* Primary Action */}
          {primaryAction && (
            <Button 
              onClick={primaryAction.onClick}
              variant={primaryAction.variant || 'default'}
              disabled={primaryAction.loading}
              className={`efika-transition hover:scale-105 ${primaryAction.loading ? 'efika-button-loading' : ''}`}
            >
              {primaryAction.loading && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              {primaryAction.icon && <primaryAction.icon className="h-4 w-4 mr-2" />}
              {primaryAction.label}
            </Button>
          )}
        </div>
      </div>
      
      {/* Content Section */}
      {loading ? (
        <div className="space-y-4">
          <div className="efika-skeleton h-8 w-full"></div>
          <div className="efika-skeleton h-32 w-full"></div>
          <div className="efika-skeleton h-32 w-full"></div>
        </div>
      ) : (
        <div className="animate-scale-in">
          {children}
        </div>
      )}
    </div>
  );
}
