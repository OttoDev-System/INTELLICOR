import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [userType, setUserType] = useState<'staff' | 'client'>('staff');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login(data.email, data.password, userType);
      
      if (success) {
        toast.success('Login realizado com sucesso!');
        // Redirect based on user type will be handled by App.tsx
      } else {
        toast.error('Credenciais inválidas. Use email: ana@efika.com.br, senha: demo123');
      }
    } catch (error) {
      toast.error('Erro ao fazer login');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-4" />
          <h1 className="text-2xl font-bold text-primary">
            Bem-vindo à Efika
          </h1>
          <p className="text-muted-foreground">
            Faça login para acessar sua conta
          </p>
        </div>

        <Card className="efika-card-shadow">
          <CardHeader className="pb-4">
            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'staff' | 'client')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="staff">Acesso Staff</TabsTrigger>
                <TabsTrigger value="client">Acesso Cliente</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={userType === 'staff' ? 'usuario@efika.com.br' : 'cliente@exemplo.com'}
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    {...form.register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full efika-gradient hover:opacity-90 efika-transition"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Entrando...
                  </>
                ) : (
                  'Entrar'
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-center mb-2">Contas de Demonstração:</p>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div><strong>Admin:</strong> ana@efika.com.br</div>
                <div><strong>Corretor:</strong> carlos@efika.com.br</div>
                <div><strong>Suporte:</strong> maria@efika.com.br</div>
                <div><strong>Cliente:</strong> joao.costa@gmail.com</div>
                <div className="text-center mt-2 font-medium">Senha: <code>demo123</code></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}