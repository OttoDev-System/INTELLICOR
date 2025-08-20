import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <Logo size="lg" className="justify-center mb-8" />
        
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <h2 className="text-2xl font-semibold text-foreground">Página não encontrada</h2>
          <p className="text-muted-foreground">
            A página que você está procurando não existe ou foi removida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <Button onClick={() => navigate('/')} className="efika-gradient">
            <Home className="mr-2 h-4 w-4" />
            Início
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
