import { Building2 } from 'lucide-react';
import efikaLogo from '@/assets/efika-logo.jpg';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-lg overflow-hidden flex items-center justify-center`}>
        <img 
          src={efikaLogo} 
          alt="Efika Seguros" 
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-primary ${textSizeClasses[size]}`}>
            Efika
          </span>
          <span className="text-xs text-muted-foreground -mt-1">
            Seguros
          </span>
        </div>
      )}
    </div>
  );
}