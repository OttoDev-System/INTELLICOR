
import { Bell, LogOut, User, Moon, Sun, HelpCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/providers/ThemeProvider';
import { PageBreadcrumbs } from './PageBreadcrumbs';

const roleLabels = {
  admin: 'Administrador',
  broker: 'Corretor',
  support: 'Suporte',
  client: 'Cliente'
};

export function Header() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  if (!user) return null;

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-slide-in">
      <header className="h-14 lg:h-16 border-b">
        <div className="flex h-full items-center px-4 lg:px-6 gap-2 lg:gap-4">
          <SidebarTrigger className="efika-transition hover:bg-muted hover:scale-105" />
          
          <div className="flex-1" />

          <div className="flex items-center gap-1 lg:gap-3">
            {/* Role Badge - Hidden on small screens */}
            <Badge variant="secondary" className="hidden lg:inline-flex text-xs">
              {roleLabels[user.role]}
            </Badge>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="h-8 w-8 lg:h-10 lg:w-10 efika-transition hover:scale-105 hover:bg-muted"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>

            {/* Help Button - Hidden on mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex h-8 w-8 lg:h-10 lg:w-10 efika-transition hover:scale-105 hover:bg-muted"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="sr-only">Ajuda</span>
            </Button>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-8 w-8 lg:h-10 lg:w-10 efika-transition hover:scale-105 hover:bg-muted animate-bounce-subtle"
            >
              <Bell className="h-4 w-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-4 w-4 lg:h-5 lg:w-5 rounded-full p-0 flex items-center justify-center text-[10px] animate-pulse"
              >
                3
              </Badge>
              <span className="sr-only">3 notificações</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="relative h-8 w-8 lg:h-10 lg:w-10 rounded-full efika-transition hover:scale-105 efika-hover-glow"
                >
                  <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-56 lg:w-64 animate-scale-in bg-popover border border-border shadow-lg" 
                align="end" 
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    <Badge variant="outline" className="w-fit text-xs mt-1">
                      {roleLabels[user.role]}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="efika-transition hover:bg-accent">
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="efika-transition hover:bg-accent">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout} 
                  className="text-destructive efika-transition hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Breadcrumbs Section */}
      <div className="px-4 lg:px-6 py-2 lg:py-4 border-b border-border/50">
        <PageBreadcrumbs />
      </div>
    </div>
  );
}
