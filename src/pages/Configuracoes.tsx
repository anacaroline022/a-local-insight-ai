
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Settings, Lock, Bell, Cloud, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

const Configuracoes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [securitySettings, setSecuritySettings] = useState({
    faceId: true,
    doubleTouch: true,
    criticalNotifications: true,
    soundAlert: false
  });
  const [showResetDialog, setShowResetDialog] = useState(false);
  
  const handleToggle = (setting) => {
    setSecuritySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Configuração atualizada",
      description: `${setting} foi ${!securitySettings[setting] ? "ativado" : "desativado"}.`
    });
  };
  
  const handleResetDefaults = () => {
    setSecuritySettings({
      faceId: true,
      doubleTouch: true,
      criticalNotifications: true,
      soundAlert: true
    });
    
    toast({
      title: "Padrões restaurados",
      description: "Todas as configurações foram redefinidas para os valores padrão."
    });
    
    setShowResetDialog(false);
  };
  
  return (
    <MainLayout
      pageTitle="Configurações"
      pageSubtitle="Personalize o funcionamento da sua plataforma"
      headerImage="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80"
    >
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input 
            type="text" 
            placeholder="Buscar ajustes..." 
            className="w-full pl-10 py-2 pr-4 bg-secondary rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Main menu grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Security */}
          <div 
            className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
            onClick={() => toast({
              title: "Segurança",
              description: "Configurações de segurança selecionadas."
            })}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Segurança</span>
              <span className="text-sm text-muted-foreground">Biometria, Backup</span>
            </div>
          </div>
          
          {/* Financial */}
          <div 
            className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
            onClick={() => toast({
              title: "Financeiro",
              description: "Configurações financeiras selecionadas."
            })}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM9.97 9.47C9.97 10.2 10.54 10.69 12.31 11.14C14.07 11.6 15.96 12.36 15.97 14.56C15.96 16.17 14.76 17.04 13.24 17.33V19H10.9V17.3C9.4 16.99 8.14 16.03 8.04 14.33H9.76C9.85 15.25 10.48 15.97 12.08 15.97C13.79 15.97 14.18 15.11 14.18 14.58C14.18 13.86 13.79 13.17 11.84 12.71C9.67 12.19 8.18 11.29 8.18 9.5C8.18 7.99 9.39 7.01 10.9 6.69V5H13.23V6.71C14.85 7.11 15.67 8.34 15.72 9.68H14.01C13.97 8.7 13.45 8.04 12.07 8.04C10.76 8.04 9.97 8.63 9.97 9.47Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-medium">Financeiro</span>
              <span className="text-sm text-muted-foreground">Pagamentos, Taxas</span>
            </div>
          </div>
          
          {/* Communication */}
          <div 
            className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
            onClick={() => toast({
              title: "Comunicação",
              description: "Configurações de comunicação selecionadas."
            })}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Comunicação</span>
              <span className="text-sm text-muted-foreground">Templates, Alertas</span>
            </div>
          </div>
          
          {/* Sync */}
          <div 
            className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
            onClick={() => toast({
              title: "Sincronização",
              description: "Configurações de sincronização selecionadas."
            })}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Sincronização</span>
              <span className="text-sm text-muted-foreground">Cloud, Backup</span>
            </div>
          </div>
          
          {/* AI */}
          <div 
            className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
            onClick={() => toast({
              title: "IA",
              description: "Configurações de IA selecionadas."
            })}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
                  <path d="M12 2L3 9V22H21V9L12 2ZM19 20H5V10.17L12 4.83L19 10.17V20ZM7.21 10.25C7.58 10.18 7.97 10.18 8.34 10.25C9.15 10.39 9.85 10.85 10.31 11.46C10.78 12.08 10.97 12.8 10.97 13.5C10.97 13.59 10.96 13.67 10.96 13.76C11.93 14.89 11.93 16.47 10.97 17.6C11.3 17.86 11.56 18.17 11.77 18.53C12 18.94 12.15 19.39 12.14 19.86C12.13 20.33 12 20.77 11.74 21.17C11.5 21.56 11.13 21.89 10.69 22.07C10.24 22.26 9.75 22.32 9.27 22.21C8.8 22.11 8.35 21.88 8 21.54C7.34 20.91 6.97 19.96 7.17 19.06C7.37 18.16 8.05 17.34 9 17.13C8.66 16.47 8.66 15.67 9 15C8.21 14.11 7.97 12.82 8.45 11.72C8.61 11.37 8.86 11.06 9.17 10.81C8.46 10.64 7.7 10.33 7.21 10.25ZM12.06 15C12.06 15 12.05 15 12.06 15C12.06 15 12.06 15 12.06 15C12.06 15 12.06 15 12.06 15ZM17.87 19.06C18.07 19.96 17.7 20.91 17.03 21.55C16.68 21.88 16.24 22.11 15.77 22.21C15.29 22.31 14.79 22.26 14.35 22.07C13.91 21.88 13.54 21.55 13.29 21.15C13.03 20.76 12.9 20.32 12.89 19.86C12.89 19.38 13.03 18.94 13.27 18.5C13.47 18.17 13.74 17.87 14.03 17.61C13.07 16.47 13.07 14.89 14.03 13.75C14.03 13.67 14.04 13.59 14.04 13.5C14.04 12.8 14.23 12.08 14.7 11.46C15.16 10.85 15.85 10.39 16.67 10.25C17.03 10.18 17.43 10.18 17.79 10.25C17.31 10.33 16.55 10.64 15.85 10.81C16.16 11.06 16.4 11.38 16.57 11.72C17.03 12.82 16.79 14.11 16 15C16.35 15.67 16.35 16.47 16 17.13C16.94 17.35 17.63 18.16 17.87 19.06Z" fill="currentColor"/>
                </svg>
              </div>
              <span className="font-medium">IA</span>
              <span className="text-sm text-muted-foreground">Sensibilidade, Alertas</span>
            </div>
          </div>
          
          {/* Personalization */}
          <div 
            className="bg-secondary/20 rounded-xl p-4 hover:bg-secondary/40 transition-colors cursor-pointer"
            onClick={() => toast({
              title: "Personalização",
              description: "Configurações de personalização selecionadas."
            })}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <span className="font-medium">Personalização</span>
              <span className="text-sm text-muted-foreground">Tema, Layout</span>
            </div>
          </div>
        </div>
        
        {/* Configuration panel */}
        <div className="bg-secondary/10 rounded-xl p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Lock className="h-5 w-5 mr-2" /> Segurança
            </h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium">Face ID para valores >R$ 500</div>
                <div className="text-sm text-muted-foreground">Exige autenticação biométrica</div>
              </div>
              <button 
                className={`w-12 h-6 rounded-full relative transition-colors ${securitySettings.faceId ? 'bg-primary' : 'bg-muted'}`}
                onClick={() => handleToggle('faceId')}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform transform ${securitySettings.faceId ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium">Confirmação por duplo toque</div>
                <div className="text-sm text-muted-foreground">Para ações importantes</div>
              </div>
              <button 
                className={`w-12 h-6 rounded-full relative transition-colors ${securitySettings.doubleTouch ? 'bg-primary' : 'bg-muted'}`}
                onClick={() => handleToggle('doubleTouch')}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform transform ${securitySettings.doubleTouch ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
            
            <div className="border-t border-border my-3"></div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium">Notificações críticas</div>
                <div className="text-sm text-muted-foreground">Alertas importantes do sistema</div>
              </div>
              <button 
                className={`w-12 h-6 rounded-full relative transition-colors ${securitySettings.criticalNotifications ? 'bg-primary' : 'bg-muted'}`}
                onClick={() => handleToggle('criticalNotifications')}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform transform ${securitySettings.criticalNotifications ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium">Som de alerta</div>
                <div className="text-sm text-muted-foreground">Para notificações críticas</div>
              </div>
              <button 
                className={`w-12 h-6 rounded-full relative transition-colors ${securitySettings.soundAlert ? 'bg-primary' : 'bg-muted'}`}
                onClick={() => handleToggle('soundAlert')}
              >
                <span 
                  className={`absolute top-1 w-4 h-4 rounded-full bg-background transition-transform transform ${securitySettings.soundAlert ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            Versão: v4.2.1 (Build 20240516)
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-500 hover:text-red-600 hover:border-red-600"
            onClick={() => setShowResetDialog(true)}
          >
            Restaurar Padrões
          </Button>
        </div>
      </div>
      
      {/* Reset Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restaurar padrões</DialogTitle>
            <DialogDescription>
              Todas as configurações serão redefinidas para os valores padrão. Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 py-4">
            <Button variant="outline" onClick={() => setShowResetDialog(false)}>Cancelar</Button>
            <Button 
              variant="destructive" 
              onClick={handleResetDefaults}
            >
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Configuracoes;
