
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings,
  Cloud,
  RefreshCw,
  Lock,
  Calendar,
  Users,
  CreditCard,
  Activity,
  Plus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  BarChart3,
  Wifi,
  WifiOff
} from 'lucide-react';

interface APIStatus {
  id: string;
  name: string;
  status: 'active' | 'unstable' | 'offline';
  lastSync: string;
  progress: number;
  description: string;
}

interface EquipmentLoad {
  name: string;
  usage: number;
  color: string;
}

const IntegracaoAPIs = () => {
  const { toast } = useToast();
  const [apis, setApis] = useState<APIStatus[]>([
    {
      id: 'members',
      name: 'SAP FitnessPro',
      status: 'active',
      lastSync: '98% concluída',
      progress: 98,
      description: 'Sincronização de Membros'
    },
    {
      id: 'schedule',
      name: 'Google Calendar',
      status: 'active',
      lastSync: '2 min atrás',
      progress: 100,
      description: 'Gestão de Horários'
    },
    {
      id: 'payments',
      name: 'PagSeguro',
      status: 'active',
      lastSync: 'R$ 2.340,00 (5 mins atrás)',
      progress: 100,
      description: 'Gateway Financeiro'
    }
  ]);

  const [equipmentLoad, setEquipmentLoad] = useState<EquipmentLoad[]>([
    { name: 'Esteiras', usage: 70, color: 'from-green-500 to-orange-500' },
    { name: 'Halteres', usage: 30, color: 'from-green-500 to-green-400' },
    { name: 'Bicicletas', usage: 90, color: 'from-orange-500 to-red-500' }
  ]);

  const [autoCharge, setAutoCharge] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  // Simulação de dados em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setEquipmentLoad(prev => prev.map(item => ({
        ...item,
        usage: Math.max(10, Math.min(95, item.usage + (Math.random() - 0.5) * 10))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'unstable': return 'text-orange-500';
      case 'offline': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle2;
      case 'unstable': return AlertTriangle;
      case 'offline': return XCircle;
      default: return XCircle;
    }
  };

  const handleForceSync = (apiId: string) => {
    setIsRefreshing(true);
    
    toast({
      description: "Iniciando sincronização forçada..."
    });

    setTimeout(() => {
      setApis(prev => prev.map(api => 
        api.id === apiId 
          ? { ...api, progress: 100, lastSync: 'agora' }
          : api
      ));
      setIsRefreshing(false);
      
      toast({
        description: "Sincronização concluída com sucesso",
      });
    }, 2000);
  };

  const handleRefreshEquipment = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setEquipmentLoad(prev => prev.map(item => ({
        ...item,
        usage: Math.floor(Math.random() * 90) + 10
      })));
      setIsRefreshing(false);
    }, 1000);
  };

  const handleNewClass = () => {
    toast({
      title: "Abrindo Integração",
      description: "Conectando com Google Calendar..."
    });
  };

  const handleConnectNewSystem = () => {
    toast({
      title: "Sistemas Disponíveis",
      description: "MyFitnessPal, Apple Health, Strava, Fitbit"
    });
  };

  const handleDiagnostic = () => {
    toast({
      title: "Diagnóstico Executado",
      description: "Todas as APIs estão funcionando corretamente ✓"
    });
  };

  return (
    <MainLayout
      pageTitle="Controle Total. Simplicidade Radical."
      pageSubtitle="Integração completa com todos os sistemas da academia"
      headerImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop"
    >
      <div className="space-y-12 max-w-6xl mx-auto">
        
        {/* Botão de Configurações Prioritárias */}
        <div className="flex justify-end mb-8">
          <Button 
            variant="outline" 
            className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300"
            onClick={() => toast({ description: "Configurações prioritárias abertas" })}
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar Conexões Prioritárias
          </Button>
        </div>

        {/* Seção 1: API de Membros */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Sincronização de Membros</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-lg">Última sincronização: {apis[0].progress}% concluída</span>
                  </div>
                  <Progress 
                    value={apis[0].progress} 
                    className="h-2"
                    indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-600"
                  />
                </div>
                
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Button
                    onClick={() => handleForceSync('members')}
                    disabled={isRefreshing}
                    className="ml-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full h-12 w-12 p-0"
                  >
                    <motion.div
                      animate={isRefreshing ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                    >
                      <Cloud className="h-5 w-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
              
              <p className="text-sm text-gray-600">
                Conectado ao {apis[0].name} | Status: <span className={getStatusColor(apis[0].status)}>Ativo</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Seção 2: API de Agendamento */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Gestão de Horários</h2>
            
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-7 gap-2 flex-1">
                {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'].map((day, index) => (
                  <div key={day} className="text-center">
                    <div className="text-xs text-gray-500 mb-2">{day}</div>
                    <div className="space-y-1">
                      {[1, 2, 3].map(slot => (
                        <div 
                          key={slot}
                          className={`h-3 rounded ${Math.random() > 0.5 ? 'bg-blue-500' : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <motion.div
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                className="ml-8"
              >
                <Button
                  onClick={handleNewClass}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full h-12 px-6"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Classe
                </Button>
              </motion.div>
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              Sincronizando com 3 instrutores externos
            </p>
          </div>
        </motion.div>

        {/* Seção 3: API de Pagamentos */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onDoubleClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
        >
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Gateway Financeiro</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="text-lg">Conexão segura com PagSeguro</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-lg">Cobrança Automática</span>
                <Switch 
                  checked={autoCharge}
                  onCheckedChange={setAutoCharge}
                />
              </div>
              
              <p className="text-sm text-gray-600">
                Última transação: R$ 2.340,00 (5 mins atrás)
              </p>
            </div>

            <AnimatePresence>
              {showTechnicalDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 p-4 bg-gray-50 rounded-lg"
                >
                  <h3 className="font-medium mb-3">Detalhes Técnicos</h3>
                  <div className="space-y-2 text-sm">
                    <div>Logs de transações: 1.247 registros</div>
                    <div>Chave API: •••••••••••••••••••••••••••••••••••••••••</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      Revalidar Conexão
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Monitoramento em Tempo Real */}
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="border-b border-gray-200 pb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light text-gray-900">Carga de Equipamentos Agora</h2>
              <motion.button
                onClick={handleRefreshEquipment}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0 }}
                >
                  <RefreshCw className="h-5 w-5" />
                </motion.div>
              </motion.button>
            </div>
            
            <div className="space-y-6">
              {equipmentLoad.map((equipment, index) => (
                <motion.div 
                  key={equipment.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg">{equipment.name}</span>
                    <span className="text-lg font-mono">{Math.round(equipment.usage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <motion.div
                      className={`h-4 rounded-full bg-gradient-to-r ${equipment.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${equipment.usage}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Fixo com Integrações Prioritárias */}
        <motion.div 
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="max-w-6xl mx-auto flex justify-center space-x-8">
            <motion.button
              onClick={handleConnectNewSystem}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Wifi className="h-6 w-6" />
              <span className="text-xs">Conectar Novo Sistema</span>
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs">Histórico de Sincronizações</span>
            </motion.button>
            
            <motion.button
              onClick={handleDiagnostic}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Activity className="h-6 w-6" />
              <span className="text-xs">Diagnóstico Rápido</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Espaçamento para o footer fixo */}
        <div className="h-24"></div>
      </div>
    </MainLayout>
  );
};

export default IntegracaoAPIs;
