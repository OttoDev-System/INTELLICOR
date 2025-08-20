
import { MessageSquare, Phone, Mail, Calendar } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ClientContact() {
  return (
    <PageLayout
      title="Contato"
      description="Entre em contato com seu corretor ou suporte"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Seu Corretor</CardTitle>
            <CardDescription>
              Entre em contato diretamente com seu corretor
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Dados do Corretor</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Informações serão carregadas via API<br />
                🔌 Conectar sistema de CRM
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Ligar
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  E-mail
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Agendar Reunião</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Agende uma conversa com seu corretor
              </p>
              <Button size="sm" className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="efika-card-shadow">
          <CardHeader>
            <CardTitle>Suporte Técnico</CardTitle>
            <CardDescription>
              Precisa de ajuda? Entre em contato conosco
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message">Sua Mensagem</Label>
              <Textarea 
                id="message" 
                placeholder="Descreva sua dúvida ou problema..."
                rows={4}
              />
            </div>
            
            <Button className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Enviar Mensagem
            </Button>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-2">Outras Formas de Contato</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📧 suporte@efika.com.br</p>
                <p>📞 0800 123 4567</p>
                <p>💬 Chat Online (Em breve)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
