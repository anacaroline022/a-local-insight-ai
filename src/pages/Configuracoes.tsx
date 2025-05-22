
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Settings, 
  Lock, 
  CreditCard, 
  Bell, 
  Smartphone, 
  Moon, 
  Sun, 
  Database, 
  Upload, 
  Download, 
  RefreshCcw, 
  FileText, 
  MessageSquare, 
  User, 
  Fingerprint, 
  Shield, 
  Clock, 
  Activity as ActivityIcon
} from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { toast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConfigItem {
  id: string;
  title: string;
  description: string;
  type: 'toggle' | 'select' | 'button' | 'info';
  icon?: React.ReactNode;
  value?: boolean | string;
  options?: { label: string; value: string }[];
  action?: () => void;
}

const securityItems: ConfigItem[] = [
  {
    id: 'faceId',
    title: 'Autenticação Biométrica',
    description: 'Usar Face ID para valores acima de R$ 500',
    type: 'toggle',
    icon: <Fingerprint className="h-4 w-4" />,
    value: true
  },
  {
    id: 'doubleTap',
    title: 'Confirmação por duplo toque',
    description: 'Maior segurança em operações críticas',
    type: 'toggle',
    icon: <Shield className="h-4 w-4" />,
    value: true
  },
  {
    id: 'backup',
    title: 'Backup Automático',
    description: 'Realizado diariamente às 2:00',
    type: 'info',
    icon: <Clock className="h-4 w-4" />,
  },
  {
    id: 'lastBackup',
    title: 'Último backup',
    description: 'Hoje às 02:00',
    type: 'info',
    icon: <Database className="h-4 w-4" />,
  },
  {
    id: 'manualBackup',
    title: 'Realizar backup manual',
    description: 'Salvar todos os dados agora',
    type: 'button',
    icon: <Download className="h-4 w-4" />,
    action: () => console.log('Manual backup initiated')
  },
];

const communicationItems: ConfigItem[] = [
  {
    id: 'notifications',
    title: 'Notificações críticas',
    description: 'Alertas sobre evasão e pagamentos',
    type: 'toggle',
    icon: <Bell className="h-4 w-4" />,
    value: true
  },
  {
    id: 'alertSound',
    title: 'Som de alerta',
    description: 'Tocar som ao receber notificações',
    type: 'toggle',
    icon: <MessageSquare className="h-4 w-4" />,
    value: false
  },
  {
    id: 'alertLevel',
    title: 'Sensibilidade de alertas',
    description: 'Define o limite para notificações',
    type: 'select',
    icon: <ActivityIcon className="h-4 w-4" />,
    value: 'medium',
    options: [
      { label: 'Baixa', value: 'low' },
      { label: 'Média', value: 'medium' },
      { label: 'Alta', value: 'high' }
    ]
  },
  {
    id: 'messageTemplates',
    title: 'Templates de mensagens',
    description: 'Gerenciar modelos pré-definidos',
    type: 'button',
    icon: <FileText className="h-4 w-4" />,
    action: () => console.log('Open message templates')
  }
];

const syncItems: ConfigItem[] = [
  {
    id: 'cloudSync',
    title: 'Sincronização com a nuvem',
    description: 'Manter dados atualizados em todos dispositivos',
    type: 'toggle',
    icon: <Upload className="h-4 w-4" />,
    value: true
  },
  {
    id: 'autoSync',
    title: 'Sincronização automática',
    description: 'Sincronizar a cada 30 minutos',
    type: 'toggle',
    icon: <RefreshCcw className="h-4 w-4" />,
    value: true
  },
  {
    id: 'syncNow',
    title: 'Sincronizar agora',
    description: 'Forçar sincronização imediata',
    type: 'button',
    icon: <RefreshCcw className="h-4 w-4" />,
    action: () => console.log('Manual sync initiated')
  }
];

const personalItems: ConfigItem[] = [
  {
    id: 'theme',
    title: 'Tema',
    description: 'Escolher entre claro e escuro',
    type: 'select',
    icon: <Sun className="h-4 w-4" />,
    value: 'light',
    options: [
      { label: 'Claro', value: 'light' },
      { label: 'Escuro', value: 'dark' },
      { label: 'Sistema', value: 'system' }
    ]
  },
  {
    id: 'profile',
    title: 'Perfil',
    description: 'Gerenciar informações pessoais',
    type: 'button',
    icon: <User className="h-4 w-4" />,
    action: () => console.log('Open profile settings')
  }
];

const ConfigSection = ({ 
  items, 
  onChange 
}: { 
  items: ConfigItem[], 
  onChange: (id: string, value: boolean | string) => void 
}) => {
  return (
    <div className="space-y-6">
      {items.map((item) => (
        <motion.div 
          key={item.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
          whileHover={{ y: -1, backgroundColor: 'rgba(0,0,0,0.02)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <div className="flex items-start gap-3">
            {item.icon && (
              <div className="mt-0.5 bg-secondary p-2 rounded-md">
                {item.icon}
              </div>
            )}
            <div>
              <h4 className="text-sm font-medium">{item.title}</h4>
              <p className="text-xs text-muted-foreground">{item.description}</p>
            </div>
          </div>
          
          <div>
            {item.type === 'toggle' && (
              <Switch 
                checked={item.value as boolean} 
                onCheckedChange={(checked) => onChange(item.id, checked)}
                className="data-[state=checked]:bg-academy-purple"
              />
            )}
            
            {item.type === 'select' && (
              <Select 
                value={item.value as string}
                onValueChange={(value) => onChange(item.id, value)}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {item.options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {item.type === 'button' && (
              <Button 
                size="sm" 
                variant="outline"
                onClick={item.action}
              >
                {item.title.split(' ').pop()}
              </Button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Configuracoes = () => {
  const [securityConfig, setSecurityConfig] = useState<ConfigItem[]>(securityItems);
  const [communicationConfig, setCommunicationConfig] = useState<ConfigItem[]>(communicationItems);
  const [syncConfig, setSyncConfig] = useState<ConfigItem[]>(syncItems);
  const [personalConfig, setPersonalConfig] = useState<ConfigItem[]>(personalItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResetDialog, setShowResetDialog] = useState(false);
  
  const handleConfigChange = (category: 'security' | 'communication' | 'sync' | 'personal') => {
    return (id: string, value: boolean | string) => {
      let setter;
      let items;
      
      switch (category) {
        case 'security':
          setter = setSecurityConfig;
          items = securityConfig;
          break;
        case 'communication':
          setter = setCommunicationConfig;
          items = communicationConfig;
          break;
        case 'sync':
          setter = setSyncConfig;
          items = syncConfig;
          break;
        case 'personal':
          setter = setPersonalConfig;
          items = personalConfig;
          break;
      }
      
      const updatedItems = items.map(item => 
        item.id === id ? { ...item, value } : item
      );
      
      setter(updatedItems);
      
      // Show feedback toast
      toast({
        title: "Configuração atualizada",
        description: `${items.find(item => item.id === id)?.title} foi atualizado.`
      });
    };
  };
  
  const handleResetDefaults = () => {
    setSecurityConfig(securityItems);
    setCommunicationConfig(communicationItems);
    setSyncConfig(syncItems);
    setPersonalConfig(personalItems);
    setShowResetDialog(false);
    
    toast({
      title: "Configurações restauradas",
      description: "Todas as configurações foram restauradas para os valores padrão."
    });
  };
  
  // Handle search/filtering
  const filteredItems = () => {
    if (!searchQuery) return null;
    
    const allItems = [
      ...securityConfig, 
      ...communicationConfig,
      ...syncConfig,
      ...personalConfig
    ];
    
    return allItems.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const filtered = filteredItems();
  
  return (
    <MainLayout
      pageTitle="Configurações"
      pageSubtitle="Personalize a aplicação de acordo com suas preferências"
      headerImage="https://images.unsplash.com/photo-1470165407954-59ca31db8ab4?auto=format&fit=crop&w=2000&q=80"
    >
      <motion.div 
        className="max-w-3xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header icon */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 180, 0] }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20, 
            delay: 0.3 
          }}
        >
          <div className="bg-secondary rounded-full p-6">
            <Settings className="h-12 w-12 text-academy-purple" />
          </div>
        </motion.div>
        
        {/* Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar ajustes..."
            className="w-full py-2 pl-10 pr-4 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-academy-purple"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        
        {/* Search results */}
        {filtered && filtered.length > 0 && (
          <motion.div 
            className="bg-background border border-border rounded-lg p-4 shadow-sm"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h3 className="text-sm font-medium mb-2">Resultados da busca</h3>
            <div className="space-y-4">
              {filtered.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                  <div>
                    <h4 className="text-sm font-medium">{item.title}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Main settings */}
        {!searchQuery && (
          <motion.div 
            className="bg-background border border-border rounded-lg shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Tabs defaultValue="security">
              <div className="flex justify-center border-b">
                <TabsList className="grid grid-cols-4 w-full max-w-lg">
                  <TabsTrigger value="security" className="data-[state=active]:text-academy-purple">
                    <Lock className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Segurança</span>
                  </TabsTrigger>
                  <TabsTrigger value="communication" className="data-[state=active]:text-academy-purple">
                    <Bell className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Comunicação</span>
                  </TabsTrigger>
                  <TabsTrigger value="sync" className="data-[state=active]:text-academy-purple">
                    <RefreshCcw className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Sincronização</span>
                  </TabsTrigger>
                  <TabsTrigger value="personal" className="data-[state=active]:text-academy-purple">
                    <User className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Personalização</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-6">
                <TabsContent value="security" className="mt-0">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Lock className="h-5 w-5 mr-2 text-academy-purple" />
                      Segurança
                    </h3>
                    <ConfigSection 
                      items={securityConfig}
                      onChange={handleConfigChange('security')}
                    />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="communication" className="mt-0">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-academy-purple" />
                      Comunicação
                    </h3>
                    <ConfigSection 
                      items={communicationConfig}
                      onChange={handleConfigChange('communication')}
                    />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="sync" className="mt-0">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <RefreshCcw className="h-5 w-5 mr-2 text-academy-purple" />
                      Sincronização
                    </h3>
                    <ConfigSection 
                      items={syncConfig}
                      onChange={handleConfigChange('sync')}
                    />
                  </motion.div>
                </TabsContent>
                
                <TabsContent value="personal" className="mt-0">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-lg font-medium mb-4 flex items-center">
                      <User className="h-5 w-5 mr-2 text-academy-purple" />
                      Personalização
                    </h3>
                    <ConfigSection 
                      items={personalConfig}
                      onChange={handleConfigChange('personal')}
                    />
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        )}
        
        {/* Footer */}
        <div className="flex items-center justify-between py-4">
          <div className="text-sm text-muted-foreground">
            versão 4.2.1 (Build 20240516)
          </div>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={handleResetDefaults}
          >
            Restaurar Padrões
          </Button>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Configuracoes;
