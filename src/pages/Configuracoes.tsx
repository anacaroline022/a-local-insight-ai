
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Settings, Shield, CreditCard, Bell, RefreshCcw, Palette, Cloud, Lock, AlertTriangle, Volume2, RotateCw
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ConfigCard = ({ icon: Icon, title, children }) => {
  return (
    <motion.div 
      className="bg-secondary/20 p-4 rounded-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

const Configuracoes = () => {
  const [backupFrequency, setBackupFrequency] = useState(1);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [doubleConfirmEnabled, setDoubleConfirmEnabled] = useState(true);
  const [criticalAlertsEnabled, setCriticalAlertsEnabled] = useState(true);
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  const handleBackupNow = () => {
    toast({
      title: "Backup iniciado",
      description: "Realizando backup dos dados...",
    });
    setTimeout(() => {
      toast({
        title: "Backup concluído",
        description: `Backup realizado em ${new Date().toLocaleTimeString()}.`,
      });
    }, 3000);
  };
  
  const handleRestoreDefaults = () => {
    toast({
      title: "Confirmação necessária",
      description: "Tem certeza que deseja restaurar todas as configurações para o padrão?",
      action: (
        <Button variant="destructive" size="sm" onClick={() => {
          setBackupFrequency(1);
          setFaceIdEnabled(true);
          setDoubleConfirmEnabled(true);
          setCriticalAlertsEnabled(true);
          setSoundAlertsEnabled(false);
          setDarkMode(false);
          toast({
            title: "Configurações restauradas",
            description: "Todas as configurações foram redefinidas para o padrão."
          });
        }}>
          Confirmar
        </Button>
      )
    });
  };

  return (
    <MainLayout 
      pageTitle="Configurações Essenciais" 
      headerImage="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=2000&q=80"
    >
      <div className="relative">
        <div className="absolute right-0 top-0">
          <div className="relative w-64 h-10">
            <input 
              type="search"
              placeholder="Buscar ajustes..."
              className="w-full h-full bg-secondary/30 rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Settings className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          {/* Segurança */}
          <ConfigCard icon={Shield} title="Segurança">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Face ID para valores {'>'} R$500</p>
                  <p className="text-xs text-muted-foreground">Autenticação biométrica para valores altos</p>
                </div>
                <Switch checked={faceIdEnabled} onCheckedChange={setFaceIdEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Confirmação por duplo toque</p>
                  <p className="text-xs text-muted-foreground">Confirmar ações importantes</p>
                </div>
                <Switch checked={doubleConfirmEnabled} onCheckedChange={setDoubleConfirmEnabled} />
              </div>
              
              <div className="pt-3 border-t border-border/40">
                <p className="text-xs font-medium mb-2">Último login: 15/05 às 14:30</p>
                <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                  <Lock className="h-3.5 w-3.5" /> Alterar Senha
                </Button>
              </div>
            </div>
          </ConfigCard>
          
          {/* Financeiro */}
          <ConfigCard icon={CreditCard} title="Financeiro">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Taxa padrão de desconto</p>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[10]}
                    max={30}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-8">10%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Dias de carência</p>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[5]}
                    max={15}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-8">5d</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border/40">
                <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                  <CreditCard className="h-3.5 w-3.5" /> Integrar Pagamentos
                </Button>
              </div>
            </div>
          </ConfigCard>
          
          {/* Backup */}
          <ConfigCard icon={RefreshCcw} title="Backup">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Frequência de backup</p>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[backupFrequency]}
                    min={1}
                    max={7}
                    step={1}
                    className="flex-1"
                    onValueChange={([value]) => setBackupFrequency(value)}
                  />
                  <span className="text-sm font-medium w-16">
                    {backupFrequency === 1 ? 'Diário' : `${backupFrequency} dias`}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-secondary/30 flex-1 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-academy-green h-full" style={{ width: "25%" }}></div>
                </div>
                <span className="text-xs">1.2GB/5GB</span>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Último: hoje 02:00</span>
                <span>3 versões</span>
              </div>
              
              <div className="pt-2 border-t border-border/40">
                <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs" onClick={handleBackupNow}>
                  <Cloud className="h-3.5 w-3.5" /> Backup Agora
                </Button>
              </div>
            </div>
          </ConfigCard>
          
          {/* Comunicação */}
          <ConfigCard icon={Bell} title="Comunicação">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Notificações críticas</p>
                  <p className="text-xs text-muted-foreground">Evasão, pagamentos, emergências</p>
                </div>
                <Switch checked={criticalAlertsEnabled} onCheckedChange={setCriticalAlertsEnabled} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Som de alerta</p>
                  <p className="text-xs text-muted-foreground">Som para notificações importantes</p>
                </div>
                <Switch checked={soundAlertsEnabled} onCheckedChange={setSoundAlertsEnabled} />
              </div>
              
              <div className="pt-3 border-t border-border/40">
                <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                  <AlertTriangle className="h-3.5 w-3.5" /> Configurar Prioridade
                </Button>
              </div>
            </div>
          </ConfigCard>
          
          {/* IA */}
          <ConfigCard icon={Settings} title="IA">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Sensibilidade de alertas</p>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[65]}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-8">65%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Sugestões automáticas</p>
                  <p className="text-xs text-muted-foreground">Recomendar ações baseadas em dados</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="pt-3 border-t border-border/40">
                <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                  <RotateCw className="h-3.5 w-3.5" /> Retreinar Modelo
                </Button>
              </div>
            </div>
          </ConfigCard>
          
          {/* Personalização */}
          <ConfigCard icon={Palette} title="Personalização">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Modo Escuro</p>
                  <p className="text-xs text-muted-foreground">Tema escuro para uso noturno</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Tamanho da fonte</p>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[2]}
                    min={1}
                    max={5}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm font-medium w-8">A<span className="text-xs">A</span></span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border/40">
                <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                  <Palette className="h-3.5 w-3.5" /> Tema da Academia
                </Button>
              </div>
            </div>
          </ConfigCard>
        </motion.div>
        
        {/* Rodapé */}
        <div className="mt-12 flex flex-col items-center">
          <p className="text-xs text-muted-foreground mb-4">
            Versão: v4.2.1 (Build 20240516)
          </p>
          <Button variant="outline" size="sm" className="text-red-500" onClick={handleRestoreDefaults}>
            Restaurar Padrões
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Configuracoes;
