
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Shield, CreditCard, Bell, RefreshCcw, Palette, Cloud, Lock, 
  AlertTriangle, Volume2, RotateCw, Search, Check, ArrowRight
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

// Sample data for charts
const backupData = [
  { name: 'Dom', size: 0.7 },
  { name: 'Seg', size: 0.9 },
  { name: 'Ter', size: 0.8 },
  { name: 'Qua', size: 1.2 },
  { name: 'Qui', size: 0.5 },
  { name: 'Sex', size: 0.6 },
  { name: 'Sáb', size: 1.0 },
];

const alertsData = [
  { name: 'Dom', count: 5 },
  { name: 'Seg', count: 12 },
  { name: 'Ter', count: 8 },
  { name: 'Qua', count: 7 },
  { name: 'Qui', count: 10 },
  { name: 'Sex', count: 15 },
  { name: 'Sáb', count: 9 },
];

const usageData = [
  { name: 'Dados', usado: 15, livre: 85 },
];

// Animated pulse element
const Pulse = ({ color = "primary", size = "small" }) => {
  const sizeClass = size === "small" ? "h-2 w-2" : size === "medium" ? "h-3 w-3" : "h-4 w-4";
  
  return (
    <div className="relative flex">
      <div className={`${sizeClass} rounded-full bg-${color} z-10`}></div>
      <motion.div 
        className={`absolute top-0 left-0 ${sizeClass} rounded-full bg-${color}/70`} 
        animate={{ 
          scale: [1, 2, 1],
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
};

// Configuration card component with animations
const ConfigCard = ({ icon: Icon, title, children, highlight = false }) => {
  return (
    <motion.div 
      className={`bg-secondary/20 p-4 rounded-xl ${highlight ? 'border-2 border-primary/40' : ''}`}
      whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <motion.div 
          className="bg-primary/10 p-2 rounded-lg"
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="h-5 w-5 text-primary" />
        </motion.div>
        <h3 className="font-medium">{title}</h3>
        {highlight && <Pulse color="primary" size="small" />}
      </div>
      {children}
    </motion.div>
  );
};

// Animated number counter
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    const totalMilSecDuration = duration * 1000;
    const incrementTime = (totalMilSecDuration / end) * 1.1;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{count}</span>;
};

const Configuracoes = () => {
  const [backupFrequency, setBackupFrequency] = useState(1);
  const [faceIdEnabled, setFaceIdEnabled] = useState(true);
  const [doubleConfirmEnabled, setDoubleConfirmEnabled] = useState(true);
  const [criticalAlertsEnabled, setCriticalAlertsEnabled] = useState(true);
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSizeScale, setFontSizeScale] = useState(2);
  const [discountRate, setDiscountRate] = useState(10);
  const [gracePeriod, setGracePeriod] = useState(5);
  const [aiSensitivity, setAiSensitivity] = useState(65);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSetting, setActiveSetting] = useState('seguranca');
  
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
          setFontSizeScale(2);
          setDiscountRate(10);
          setGracePeriod(5);
          setAiSensitivity(65);
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
      headerImage="https://images.unsplash.com/photo-1573496773905-f5b17e717f05?auto=format&fit=crop&w=2000&q=80"
    >
      <div className="relative">
        {/* Search Bar with Animation */}
        <motion.div 
          className="absolute right-0 top-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="relative w-64 h-10">
            <motion.div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </motion.div>
            <input 
              type="search"
              placeholder="Buscar ajustes..."
              className="w-full h-full bg-secondary/30 rounded-full pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
        
        {/* Navigation Tabs - Category Selector */}
        <motion.div 
          className="mt-16 mb-6 border-b border-border"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex space-x-1 overflow-x-auto scrollbar-hidden">
            {[
              { id: 'seguranca', icon: Shield, label: 'Segurança' },
              { id: 'financeiro', icon: CreditCard, label: 'Financeiro' },
              { id: 'backup', icon: RefreshCcw, label: 'Backup' },
              { id: 'comunicacao', icon: Bell, label: 'Comunicação' },
              { id: 'ia', icon: Settings, label: 'IA' },
              { id: 'aparencia', icon: Palette, label: 'Personalização' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                className={`flex items-center gap-1.5 px-4 py-2 border-b-2 transition-colors ${
                  activeSetting === tab.id ? 'border-primary text-primary' : 'border-transparent hover:text-foreground/90'
                }`}
                onClick={() => setActiveSetting(tab.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {activeSetting === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
        
        {/* Settings Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Segurança */}
          {activeSetting === 'seguranca' && (
            <ConfigCard icon={Shield} title="Segurança" highlight={true}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Face ID para valores {'>'} R$500</p>
                    <p className="text-xs text-muted-foreground">Autenticação biométrica para valores altos</p>
                  </div>
                  <Switch 
                    checked={faceIdEnabled} 
                    onCheckedChange={setFaceIdEnabled}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Confirmação por duplo toque</p>
                    <p className="text-xs text-muted-foreground">Confirmar ações importantes</p>
                  </div>
                  <Switch 
                    checked={doubleConfirmEnabled} 
                    onCheckedChange={setDoubleConfirmEnabled}
                  />
                </div>
                
                <div className="pt-3 border-t border-border/40">
                  <p className="text-xs font-medium mb-2">Último login: 15/05 às 14:30</p>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                      <Lock className="h-3.5 w-3.5" /> Alterar Senha
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ConfigCard>
          )}
          
          {/* Financeiro */}
          {activeSetting === 'financeiro' && (
            <ConfigCard icon={CreditCard} title="Financeiro" highlight={false}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium mb-1">Taxa padrão de desconto</p>
                    <span className="text-sm font-medium">{discountRate}%</span>
                  </div>
                  <Slider
                    value={[discountRate]}
                    max={30}
                    step={1}
                    className="my-4"
                    onValueChange={([value]) => setDiscountRate(value)}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium mb-1">Dias de carência</p>
                    <span className="text-sm font-medium">{gracePeriod}d</span>
                  </div>
                  <Slider
                    value={[gracePeriod]}
                    max={15}
                    step={1}
                    className="my-4"
                    onValueChange={([value]) => setGracePeriod(value)}
                  />
                </div>
                
                <div className="h-24 mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Histórico de Receita</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={alertsData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="count" stroke="#10B981" fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="pt-3 border-t border-border/40">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                      <CreditCard className="h-3.5 w-3.5" /> Integrar Pagamentos
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ConfigCard>
          )}
          
          {/* Backup */}
          {activeSetting === 'backup' && (
            <ConfigCard icon={RefreshCcw} title="Backup" highlight={false}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium mb-1">Frequência de backup</p>
                    <span className="text-sm font-medium">
                      {backupFrequency === 1 ? 'Diário' : `${backupFrequency} dias`}
                    </span>
                  </div>
                  <Slider
                    value={[backupFrequency]}
                    min={1}
                    max={7}
                    step={1}
                    className="my-4"
                    onValueChange={([value]) => setBackupFrequency(value)}
                  />
                </div>
                
                <div className="h-28 mb-2">
                  <p className="text-xs text-muted-foreground mb-1">Tamanho dos Backups (GB)</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={backupData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <Bar dataKey="size" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="bg-secondary/30 flex-1 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-academy-green h-full" 
                      initial={{ width: "0%" }}
                      animate={{ width: "25%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  <span className="text-xs">1.2GB/5GB</span>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Último: hoje 02:00</span>
                  <span>3 versões</span>
                </div>
                
                <div className="pt-2 border-t border-border/40">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full flex gap-2 text-xs" 
                      onClick={handleBackupNow}
                    >
                      <Cloud className="h-3.5 w-3.5" /> Backup Agora
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ConfigCard>
          )}
          
          {/* Comunicação */}
          {activeSetting === 'comunicacao' && (
            <ConfigCard icon={Bell} title="Comunicação" highlight={false}>
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
                
                <div className="h-28 mb-2">
                  <p className="text-xs text-muted-foreground mb-1">Volume de notificações</p>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={alertsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                      <Line type="monotone" dataKey="count" stroke="#FF9500" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="pt-3 border-t border-border/40">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                      <AlertTriangle className="h-3.5 w-3.5" /> Configurar Prioridade
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ConfigCard>
          )}
          
          {/* IA */}
          {activeSetting === 'ia' && (
            <ConfigCard icon={Settings} title="IA" highlight={false}>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <p className="text-sm font-medium mb-1">Sensibilidade de alertas</p>
                    <span className="text-sm font-medium">{aiSensitivity}%</span>
                  </div>
                  <Slider
                    value={[aiSensitivity]}
                    max={100}
                    step={5}
                    className="my-4"
                    onValueChange={([value]) => setAiSensitivity(value)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Sugestões automáticas</p>
                    <p className="text-xs text-muted-foreground">Recomendar ações baseadas em dados</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                {/* Visual data representation */}
                <div className="relative h-24 bg-secondary/30 rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          ease: "easeInOut",
                          repeat: Infinity,
                          delay: 0.5
                        }}
                      >
                        <motion.div
                          className="w-8 h-8 rounded-full bg-primary/50 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: 1
                          }}
                        >
                          <motion.div
                            className="w-4 h-4 rounded-full bg-primary"
                            animate={{
                              scale: [1, 1.3, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              ease: "easeInOut",
                              repeat: Infinity,
                              delay: 1.5
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-muted-foreground">
                    Modelo IA v3.1
                  </div>
                </div>
                
                <div className="pt-3 border-t border-border/40">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                      <RotateCw className="h-3.5 w-3.5" /> Retreinar Modelo
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ConfigCard>
          )}
          
          {/* Personalização */}
          {activeSetting === 'aparencia' && (
            <ConfigCard icon={Palette} title="Personalização" highlight={false}>
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
                      value={[fontSizeScale]}
                      min={1}
                      max={5}
                      step={1}
                      className="flex-1"
                      onValueChange={([value]) => setFontSizeScale(value)}
                    />
                    <span className="text-sm font-medium w-12 flex items-baseline">
                      A
                      <span className={`text-xs ml-0.5 ${
                        fontSizeScale === 1 ? 'scale-75' : 
                        fontSizeScale === 2 ? 'scale-90' : 
                        fontSizeScale === 3 ? 'scale-100' : 
                        fontSizeScale === 4 ? 'scale-110' : 'scale-125'
                      }`}>A</span>
                    </span>
                  </div>
                </div>
                
                {/* Theme selector */}
                <div className="grid grid-cols-3 gap-2 my-4">
                  {['#7C3AED', '#2563EB', '#059669', '#D97706', '#DC2626'].map((color, i) => (
                    <motion.div
                      key={color}
                      className={`h-8 rounded-md cursor-pointer ${i === 0 ? 'ring-2 ring-primary ring-offset-2' : ''}`}
                      style={{ backgroundColor: color }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toast({
                        title: "Tema alterado",
                        description: "As alterações serão aplicadas na próxima inicialização."
                      })}
                    />
                  ))}
                </div>
                
                <div className="pt-3 border-t border-border/40">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                      <Palette className="h-3.5 w-3.5" /> Tema da Academia
                    </Button>
                  </motion.div>
                </div>
              </div>
            </ConfigCard>
          )}
          
          {/* Storage usage visualization */}
          <ConfigCard icon={Cloud} title="Uso de Armazenamento" highlight={false}>
            <div className="space-y-4">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={usageData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" hide />
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <Tooltip />
                    <Bar dataKey="usado" stackId="a" fill="#8884d8" name="Usado" />
                    <Bar dataKey="livre" stackId="a" fill="#82ca9d" name="Livre" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#8884d8]"></div>
                    <span className="text-sm">Usado</span>
                  </div>
                  <span className="text-sm font-medium">7.5GB</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#82ca9d]"></div>
                    <span className="text-sm">Livre</span>
                  </div>
                  <span className="text-sm font-medium">42.5GB</span>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border/40">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                    <RotateCw className="h-3.5 w-3.5" /> Otimizar Armazenamento
                  </Button>
                </motion.div>
              </div>
            </div>
          </ConfigCard>
          
          {/* Usage Analytics */}
          <ConfigCard icon={Activity} title="Estatísticas de Uso" highlight={false}>
            <div className="space-y-4">
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={alertsData}>
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      animationDuration={1500}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/30 p-2 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Sessões</p>
                  <p className="text-lg font-semibold">
                    <AnimatedCounter value="87" />
                  </p>
                </div>
                
                <div className="bg-secondary/30 p-2 rounded-lg text-center">
                  <p className="text-xs text-muted-foreground">Tempo Médio</p>
                  <p className="text-lg font-semibold">
                    <AnimatedCounter value="32" /> min
                  </p>
                </div>
              </div>
              
              <div className="pt-3 border-t border-border/40">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button variant="outline" size="sm" className="w-full flex gap-2 text-xs">
                    <ArrowRight className="h-3.5 w-3.5" /> Ver Relatório Completo
                  </Button>
                </motion.div>
              </div>
            </div>
          </ConfigCard>
        </motion.div>
        
        {/* Feature showcase */}
        <motion.div 
          className="mt-12 bg-secondary/20 rounded-xl p-6 border border-border/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Novos Recursos</h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="ghost" size="sm" className="flex gap-1">
                <Check className="h-4 w-4" />
                <span>Marcar como visto</span>
              </Button>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="bg-background/50 p-3 rounded-lg border border-border"
              whileHover={{ y: -2 }}
            >
              <h4 className="font-medium flex items-center gap-1.5">
                <Volume2 className="h-4 w-4 text-primary" />
                Notificações por Voz
              </h4>
              <p className="text-sm text-muted-foreground mt-1">Receba alertas via áudio quando estiver ocupado.</p>
            </motion.div>
            
            <motion.div 
              className="bg-background/50 p-3 rounded-lg border border-border"
              whileHover={{ y: -2 }}
            >
              <h4 className="font-medium flex items-center gap-1.5">
                <ArrowRight className="h-4 w-4 text-primary" />
                Exportação Automatizada
              </h4>
              <p className="text-sm text-muted-foreground mt-1">Envio automático de relatórios para seu email.</p>
            </motion.div>
            
            <motion.div 
              className="bg-background/50 p-3 rounded-lg border border-border"
              whileHover={{ y: -2 }}
            >
              <h4 className="font-medium flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                Proteção Avançada
              </h4>
              <p className="text-sm text-muted-foreground mt-1">Criptografia de ponta a ponta para dados sensíveis.</p>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Footer */}
        <motion.div 
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-xs text-muted-foreground mb-4">
            Versão: v4.2.1 (Build 20240516)
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="text-red-500" onClick={handleRestoreDefaults}>
              Restaurar Padrões
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Configuracoes;
