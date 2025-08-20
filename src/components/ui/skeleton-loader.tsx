import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function KPICardSkeleton() {
  return (
    <Card className="efika-card-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24 animate-pulse" />
            <Skeleton className="h-8 w-20 animate-pulse" />
            <Skeleton className="h-3 w-32 animate-pulse" />
          </div>
          <Skeleton className="h-12 w-12 rounded-lg animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export function DataCardSkeleton({ title, description }: { title: string; description: string }) {
  return (
    <Card className="efika-card-shadow">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48 animate-pulse" />
                <Skeleton className="h-3 w-32 animate-pulse" />
              </div>
              <Skeleton className="h-8 w-20 animate-pulse" />
            </div>
          ))}
        </div>
        <div className="pt-4 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-3 py-2 rounded-full">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Dados serão carregados via API
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function EmptyState({ 
  title, 
  description, 
  action 
}: { 
  title: string; 
  description: string; 
  action?: string;
}) {
  return (
    <Card className="efika-card-shadow">
      <CardContent className="p-12 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-muted-foreground/20 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
            {action && (
              <p className="text-sm text-accent font-medium">{action}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}