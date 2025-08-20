import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
  loading?: boolean;
  description?: string;
}

export function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'neutral',
  className,
  loading = false,
  description
}: KPICardProps) {
  const changeColor = {
    positive: 'text-success',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className={cn("efika-card-shadow efika-transition hover:shadow-lg", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground mt-2">
              {loading ? '--' : value}
            </p>
            {change && (
              <p className={cn("text-xs mt-1", changeColor[changeType])}>
                {change}
              </p>
            )}
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-accent" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}