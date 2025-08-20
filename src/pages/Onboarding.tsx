import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/ui/logo';
import { Upload, Building2, Mail, Lock, User, Globe, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const onboardingSchema = z.object({
  // Dados da Corretora
  companyName: z.string().min(2, 'Nome da corretora é obrigatório'),
  cnpj: z.string().min(14, 'CNPJ deve ter 14 dígitos').max(18, 'CNPJ inválido'),
  address: z.string().min(5, 'Endereço é obrigatório'),
  phone: z.string().min(10, 'Telefone é obrigatório'),
  
  // Dados do Admin
  adminName: z.string().min(2, 'Nome do administrador é obrigatório'),
  adminEmail: z.string().email('Email inválido'),
  adminPassword: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  
  // Personalização
  subdomain: z.string().min(3, 'Subdomínio deve ter pelo menos 3 caracteres').regex(/^[a-zA-Z0-9-]+$/, 'Apenas letras, números e hífen'),
  primaryColor: z.string().default('#0D214F'),
  
  // Termos
  acceptTerms: z.boolean().refine(val => val === true, 'Você deve aceitar os termos'),
  acceptLGPD: z.boolean().refine(val => val === true, 'Você deve aceitar a LGPD')
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const totalSteps = 4;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      primaryColor: '#0D214F'
    }
  });

  const companyName = watch('companyName');
  const subdomain = watch('subdomain');

  // Auto-generate subdomain from company name
  const generateSubdomain = (name: string) => {
    const cleanName = name
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 20);
    setValue('subdomain', cleanName);
  };

  const onSubmit = async (data: OnboardingFormData) => {
    console.log('Onboarding data:', data);
    console.log('Logo file:', logoFile);
    
    // Aqui seria feita a integração com Supabase
    // Por enquanto, simula sucesso
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    navigate('/onboarding/success');
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo className="justify-center mb-4" size="lg" />
          <h1 className="text-3xl font-bold text-primary mb-2">
            Bem-vindo ao INTELLICOR!
          </h1>
          <p className="text-muted-foreground">
            Configure sua corretora em poucos passos
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Passo {currentStep} de {totalSteps}</span>
            <span>{Math.round((currentStep / totalSteps) * 100)}% completo</span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        <Card className="intellicor-card-shadow">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Dados da Corretora */}
            {currentStep === 1 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Dados da Corretora
                  </CardTitle>
                  <CardDescription>
                    Informações básicas da sua empresa
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Nome da Corretora *</Label>
                    <Input
                      id="companyName"
                      {...register('companyName')}
                      placeholder="Ex: Silva Seguros Ltda"
                      onChange={(e) => {
                        register('companyName').onChange(e);
                        if (e.target.value && !subdomain) {
                          generateSubdomain(e.target.value);
                        }
                      }}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      {...register('cnpj')}
                      placeholder="00.000.000/0000-00"
                    />
                    {errors.cnpj && (
                      <p className="text-sm text-destructive mt-1">{errors.cnpj.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço Completo *</Label>
                    <Textarea
                      id="address"
                      {...register('address')}
                      placeholder="Rua, número, bairro, cidade, estado, CEP"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-sm text-destructive mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </CardContent>
              </>
            )}

            {/* Step 2: Dados do Administrador */}
            {currentStep === 2 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Administrador do Sistema
                  </CardTitle>
                  <CardDescription>
                    Dados do usuário que gerenciará a plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="adminName">Nome Completo *</Label>
                    <Input
                      id="adminName"
                      {...register('adminName')}
                      placeholder="Seu nome completo"
                    />
                    {errors.adminName && (
                      <p className="text-sm text-destructive mt-1">{errors.adminName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="adminEmail">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email *
                    </Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      {...register('adminEmail')}
                      placeholder="seu@email.com"
                    />
                    {errors.adminEmail && (
                      <p className="text-sm text-destructive mt-1">{errors.adminEmail.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="adminPassword">
                      <Lock className="h-4 w-4 inline mr-1" />
                      Senha *
                    </Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      {...register('adminPassword')}
                      placeholder="Mínimo 8 caracteres"
                    />
                    {errors.adminPassword && (
                      <p className="text-sm text-destructive mt-1">{errors.adminPassword.message}</p>
                    )}
                  </div>
                </CardContent>
              </>
            )}

            {/* Step 3: Personalização */}
            {currentStep === 3 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Personalização da Marca
                  </CardTitle>
                  <CardDescription>
                    Configure a identidade visual da sua corretora
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="subdomain">
                      <Globe className="h-4 w-4 inline mr-1" />
                      Subdomínio *
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="subdomain"
                        {...register('subdomain')}
                        placeholder="minha-corretora"
                      />
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        .intellicor.com.br
                      </span>
                    </div>
                    {errors.subdomain && (
                      <p className="text-sm text-destructive mt-1">{errors.subdomain.message}</p>
                    )}
                    {subdomain && (
                      <p className="text-sm text-success mt-1">
                        Sua URL será: <strong>{subdomain}.intellicor.com.br</strong>
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="logo">Logo da Corretora (opcional)</Label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="logo"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Label htmlFor="logo" className="cursor-pointer">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {logoFile ? logoFile.name : 'Clique para fazer upload ou arraste aqui'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PNG, JPG até 5MB
                        </p>
                      </Label>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="primaryColor">Cor Principal da Marca</Label>
                    <div className="flex items-center gap-3">
                      <Input
                        id="primaryColor"
                        type="color"
                        {...register('primaryColor')}
                        className="w-20 h-12 p-1 rounded"
                      />
                      <Input
                        value={watch('primaryColor')}
                        onChange={(e) => setValue('primaryColor', e.target.value)}
                        placeholder="#0D214F"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </>
            )}

            {/* Step 4: Termos */}
            {currentStep === 4 && (
              <>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Termos e Condições
                  </CardTitle>
                  <CardDescription>
                    Aceite os termos para finalizar o cadastro
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="acceptTerms"
                        {...register('acceptTerms')}
                      />
                      <Label htmlFor="acceptTerms" className="text-sm leading-relaxed cursor-pointer">
                        Aceito os <span className="text-primary underline">Termos de Uso</span> e 
                        <span className="text-primary underline"> Política de Privacidade</span> do INTELLICOR
                      </Label>
                    </div>
                    {errors.acceptTerms && (
                      <p className="text-sm text-destructive">{errors.acceptTerms.message}</p>
                    )}

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="acceptLGPD"
                        {...register('acceptLGPD')}
                      />
                      <Label htmlFor="acceptLGPD" className="text-sm leading-relaxed cursor-pointer">
                        Autorizo o tratamento dos meus dados pessoais de acordo com a 
                        <span className="text-primary underline"> LGPD</span> para fins de 
                        prestação de serviços
                      </Label>
                    </div>
                    {errors.acceptLGPD && (
                      <p className="text-sm text-destructive">{errors.acceptLGPD.message}</p>
                    )}
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Resumo da Configuração:</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li><strong>Corretora:</strong> {companyName}</li>
                      <li><strong>URL:</strong> {subdomain}.intellicor.com.br</li>
                      <li><strong>Admin:</strong> {watch('adminName')} ({watch('adminEmail')})</li>
                      <li><strong>Logo:</strong> {logoFile ? 'Enviado' : 'Não enviado'}</li>
                    </ul>
                  </div>
                </CardContent>
              </>
            )}

            {/* Navigation */}
            <div className="flex justify-between p-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Voltar
              </Button>
              
              {currentStep < totalSteps ? (
                <Button type="button" onClick={nextStep}>
                  Próximo
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  className="intellicor-gradient"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Configurando...' : 'Finalizar Configuração'}
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}