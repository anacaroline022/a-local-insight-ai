
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Database, 
  Cloud, 
  FileText, 
  Trash2, 
  RefreshCw, 
  Search, 
  Shield, 
  ArrowRightLeft, 
  FileSpreadsheet,
  Settings,
  BarChart,
  Lock,
  CheckCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Sample data for storage metrics
const storageData = [
  { name: 'Alunos', value: 45, color: '#9b87f5' },
  { name: 'Financeiro', value: 25, color: '#22c55e' },
  { name: 'Aulas', value: 15, color: '#3b82f6' },
  { name: 'Outros', value: 15, color: '#f97316' },
];

// Sample data for backup history
const backupHistoryData = [
  { date: '20/05', size: 42.1, status: 'success' },
  { date: '19/05', size: 41.8, status: 'success' },
  { date: '18/05', size: 41.5, status: 'success' },
  { date: '17/05', size: 41.2, status: 'success' },
  { date: '16/05', size: 41.0, status: 'warning' },
  { date: '15/05', size: 40.8, status: 'success' },
  { date: '14/05', size: 40.5, status: 'error' },
];

// Sample data for data sources
const dataSources = [
  { 
    name: 'Aplicativo', 
    type: 'primário', 
    lastSync: '21/05/2024 09:30', 
    status: 'conectado',
    records: 1245
  },
  { 
    name: 'Website', 
    type: 'secundário', 
    lastSync: '21/05/2024 08:15', 
    status: 'conectado',
    records: 820
  },
  { 
    name: 'Planilha Excel', 
    type: 'importação', 
    lastSync: '15/05/2024 14:22', 
    status: 'pendente',
    records: 150
  },
];

// Sample data for system health
const systemHealthData = [
  { name: 'JAN', cpu: 30, mem: 45, io: 20 },
  { name: 'FEV', cpu: 35, mem: 50, io: 25 },
  { name: 'MAR', cpu: 40, mem: 45, io: 30 },
  { name: 'ABR', cpu: 45, mem: 60, io: 35 },
  { name: 'MAI', cpu: 25, mem: 40, io: 20 },
  { name: 'JUN', cpu: 30, mem: 45, io: 25 },
];

const GestaoDatabase = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [activeTab, setActiveTab] = useState("visao-geral");

  useEffect(() => {
    if (isBackingUp) {
      const interval = setInterval(() => {
        setBackupProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsBackingUp(false);
            toast({
              title: "Backup concluído",
              description: "Todos os dados foram salvos com sucesso"
            });
            return 0;
          }
          return prev + 5;
        });
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [isBackingUp, toast]);

  const handleBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    toast({
      description: "Iniciando backup dos dados..."
    });
  };

  const handleExport = (format: string) => {
    setLoading(true);
    toast({
      description: `Exportando dados em formato ${format.toUpperCase()}...`
    });
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Exportação concluída",
        description: `Dados exportados em formato ${format.toUpperCase()}`
      });
    }, 1500);
  };

  const handleClearCache = () => {
    setLoading(true);
    toast({
      description: "Limpando cache do sistema..."
    });
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Cache limpo",
        description: "Cache do sistema limpo com sucesso. 15MB liberados."
      });
    }, 1200);
  };

  const handleAudit = () => {
    setLoading(true);
    toast({
      description: "Iniciando auditoria de dados..."
    });
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Auditoria concluída",
        description: "Nenhuma inconsistência encontrada nos dados."
      });
    }, 2000);
  };

  const handleSyncData = (source: string) => {
    setLoading(true);
    toast({
      description: `Sincronizando dados de ${source}...`
    });
    
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Sincronização concluída",
        description: `Dados de ${source} atualizados com sucesso`
      });
    }, 1800);
  };

  return (
    <MainLayout
      pageTitle="Gestão de Dados"
      pageSubtitle="Gerencie e proteja seus dados com elegância"
      headerImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2000&auto=format&fit=crop"
    >
      <Tabs defaultValue="visao-geral" onValueChange={setActiveTab} className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
            <TabsTrigger value="backup">Backup</TabsTrigger>
            <TabsTrigger value="fontes">Fontes de Dados</TabsTrigger>
            <TabsTrigger value="sistema">Sistema</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" onClick={() => handleExport('csv')}>
            <FileText className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
        
        {/* Overview Tab */}
        <TabsContent value="visao-geral" className="space-y-6">
          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-blue-500/20 p-2">
                    <Database className="h-4 w-4 text-blue-500" />
                  </div>
                  <h3 className="text-sm text-muted-foreground">Registros</h3>
                </div>
                <div className="text-2xl font-bold">1.2K</div>
                <div className="text-xs text-muted-foreground mt-1">+120 este mês</div>
              </div>
            </Card>
            
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-green-500/20 p-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <h3 className="text-sm text-muted-foreground">Integridade</h3>
                </div>
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs text-green-500 mt-1">Saudável</div>
                <Progress value={98} className="h-1 mt-2" />
              </div>
            </Card>
            
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-purple-500/20 p-2">
                    <Cloud className="h-4 w-4 text-purple-500" />
                  </div>
                  <h3 className="text-sm text-muted-foreground">Armazenamento</h3>
                </div>
                <div className="text-2xl font-bold">45MB</div>
                <div className="text-xs text-muted-foreground mt-1">15% utilizado</div>
                <Progress value={15} className="h-1 mt-2" />
              </div>
            </Card>
            
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="rounded-full bg-amber-500/20 p-2">
                    <Shield className="h-4 w-4 text-amber-500" />
                  </div>
                  <h3 className="text-sm text-muted-foreground">Privacidade</h3>
                </div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-xs text-amber-500 mt-1">Compartilhamentos</div>
              </div>
            </Card>
          </div>
          
          {/* Storage Distribution Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <h3 className="text-lg font-medium mb-4">Distribuição de Armazenamento</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {storageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}MB`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {storageData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}: {item.value}MB</span>
                  </div>
                ))}
              </div>
            </Card>
            
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Ações Rápidas</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={handleBackup}
                  disabled={isBackingUp}
                >
                  <Cloud className="h-6 w-6 mb-2" />
                  <span>Backup Agora</span>
                  {isBackingUp && <Progress value={backupProgress} className="h-1 w-full mt-2" />}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={handleClearCache}
                  disabled={loading}
                >
                  <Trash2 className="h-6 w-6 mb-2" />
                  <span>Limpar Cache</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={() => handleExport('json')}
                  disabled={loading}
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Exportar JSON</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="h-auto py-4 flex flex-col items-center justify-center"
                  onClick={handleAudit}
                  disabled={loading}
                >
                  <Search className="h-6 w-6 mb-2" />
                  <span>Auditoria</span>
                </Button>
              </div>
            </Card>
          </div>
          
          <Card className="p-5 backdrop-blur-sm bg-white/5">
            <h3 className="text-lg font-medium mb-4">Módulos de Dados</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Dados de Alunos</div>
                    <div className="text-sm text-muted-foreground">1.2K registros • Atualizado há 2h</div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => toast({ description: "Navegando para dados de alunos..." })}>
                  →
                </Button>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Financeiro</div>
                    <div className="text-sm text-muted-foreground">12 meses históricos • Último registro hoje</div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => toast({ description: "Navegando para dados financeiros..." })}>
                  →
                </Button>
              </div>
              
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <BarChart className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Métricas de Evasão</div>
                    <div className="text-sm text-muted-foreground">85 padrões detectados • Precisão 87%</div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => toast({ description: "Navegando para métricas de evasão..." })}>
                  →
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ArrowRightLeft className="h-5 w-5" />
                  <div>
                    <div className="font-medium">Fontes de Dados</div>
                    <div className="text-sm text-muted-foreground">3 fontes conectadas • Última sincronização há 10min</div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" onClick={() => toast({ description: "Navegando para fontes de dados..." })}>
                  →
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Backup Tab */}
        <TabsContent value="backup" className="space-y-6">
          <Card className="p-5 backdrop-blur-sm bg-white/5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-medium">Status do Backup</h3>
                <p className="text-sm text-muted-foreground">Último backup completo: hoje às 02:00</p>
              </div>
              <Button 
                onClick={handleBackup} 
                disabled={isBackingUp}
              >
                {isBackingUp ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Realizando Backup...
                  </>
                ) : (
                  <>
                    <Cloud className="h-4 w-4 mr-2" />
                    Iniciar Backup
                  </>
                )}
              </Button>
            </div>
            
            {isBackingUp && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progresso</span>
                  <span>{backupProgress}%</span>
                </div>
                <Progress value={backupProgress} className="h-2" />
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Backup automático</span>
                <span className="text-green-500">Ativado (Diário, 02:00)</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Retenção de backups</span>
                <span>7 dias</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Armazenamento na nuvem</span>
                <span>iCloud (250GB disponível)</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Criptografia</span>
                <span>AES-256</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-5 backdrop-blur-sm bg-white/5">
            <h3 className="text-lg font-medium mb-4">Histórico de Backups</h3>
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-muted-foreground">
                  <th className="pb-2">Data</th>
                  <th className="pb-2">Tamanho</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {backupHistoryData.map((backup, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="py-3">{backup.date}</td>
                    <td className="py-3">{backup.size} MB</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${
                          backup.status === 'success' ? 'bg-green-500' :
                          backup.status === 'warning' ? 'bg-amber-500' :
                          'bg-red-500'
                        }`}></div>
                        <span>{
                          backup.status === 'success' ? 'Concluído' :
                          backup.status === 'warning' ? 'Atenção' :
                          'Falha'
                        }</span>
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => toast({ description: `Restaurando backup de ${backup.date}...` })}
                      >
                        Restaurar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </TabsContent>
        
        {/* Data Sources Tab */}
        <TabsContent value="fontes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataSources.map((source, index) => (
              <Card key={index} className="p-5 backdrop-blur-sm bg-white/5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    {source.name === 'Aplicativo' ? (
                      <div className="rounded-full bg-blue-500/20 p-2 mr-3">
                        <Database className="h-5 w-5 text-blue-500" />
                      </div>
                    ) : source.name === 'Website' ? (
                      <div className="rounded-full bg-purple-500/20 p-2 mr-3">
                        <Cloud className="h-5 w-5 text-purple-500" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-green-500/20 p-2 mr-3">
                        <FileSpreadsheet className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{source.name}</h3>
                      <div className="text-xs text-muted-foreground">Fonte {source.type}</div>
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    source.status === 'conectado' ? 'bg-green-500/10 text-green-500' :
                    'bg-amber-500/10 text-amber-500'
                  }`}>
                    {source.status === 'conectado' ? 'Conectado' : 'Pendente'}
                  </div>
                </div>
                
                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Registros</span>
                    <span>{source.records}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Última sincronização</span>
                    <span>{source.lastSync}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleSyncData(source.name)}
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    Sincronizar Agora
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-5 backdrop-blur-sm bg-white/5">
            <h3 className="text-lg font-medium mb-4">Adicionar Fonte de Dados</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => toast({ description: "Conectando com Google Sheets..." })}
              >
                <FileSpreadsheet className="h-6 w-6 mb-2" />
                <span>Google Sheets</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => toast({ description: "Conectando com Excel Online..." })}
              >
                <FileSpreadsheet className="h-6 w-6 mb-2" />
                <span>Excel Online</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-4 flex flex-col items-center justify-center"
                onClick={() => toast({ description: "Conectando com API REST..." })}
              >
                <ArrowRightLeft className="h-6 w-6 mb-2" />
                <span>API REST</span>
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* System Tab */}
        <TabsContent value="sistema" className="space-y-6">
          <Card className="p-5 backdrop-blur-sm bg-white/5">
            <h3 className="text-lg font-medium mb-4">Saúde do Sistema</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={systemHealthData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cpu" name="CPU (%)" stroke="#9b87f5" strokeWidth={2} />
                  <Line type="monotone" dataKey="mem" name="Memória (%)" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="io" name="I/O (MB/s)" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 rounded bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">CPU</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">30%</span>
                  <span className="text-xs text-green-500">Normal</span>
                </div>
              </div>
              
              <div className="p-3 rounded bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Memória</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">45%</span>
                  <span className="text-xs text-green-500">Normal</span>
                </div>
              </div>
              
              <div className="p-3 rounded bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Tempo Online</div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">99.9%</span>
                  <span className="text-xs text-green-500">Excelente</span>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <h3 className="text-lg font-medium mb-4">Segurança</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-500/20 p-2 mr-3">
                      <Lock className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Criptografia</div>
                      <div className="text-xs text-muted-foreground">AES-256, em repouso e em trânsito</div>
                    </div>
                  </div>
                  <div className="text-xs bg-green-500/10 px-2 py-1 rounded-full text-green-500">
                    Ativo
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rounded-full bg-green-500/20 p-2 mr-3">
                      <Shield className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Autenticação 2FA</div>
                      <div className="text-xs text-muted-foreground">Obrigatória para todos os administradores</div>
                    </div>
                  </div>
                  <div className="text-xs bg-green-500/10 px-2 py-1 rounded-full text-green-500">
                    Ativo
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rounded-full bg-amber-500/20 p-2 mr-3">
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    </div>
                    <div>
                      <div className="font-medium">Última verificação de vulnerabilidade</div>
                      <div className="text-xs text-muted-foreground">15/05/2024</div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ description: "Iniciando verificação de vulnerabilidades..." })}
                  >
                    Verificar
                  </Button>
                </div>
              </div>
            </Card>
            
            <Card className="p-5 backdrop-blur-sm bg-white/5">
              <h3 className="text-lg font-medium mb-4">Configurações</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Backup automático</div>
                    <div className="text-xs text-muted-foreground">Diário às 02:00</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ description: "Abrindo configurações de backup..." })}
                  >
                    Configurar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Retenção de logs</div>
                    <div className="text-xs text-muted-foreground">30 dias</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ description: "Abrindo configurações de logs..." })}
                  >
                    Configurar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Política de privacidade</div>
                    <div className="text-xs text-muted-foreground">LGPD & GDPR compliant</div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toast({ description: "Abrindo configurações de privacidade..." })}
                  >
                    Configurar
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Limpar todos os dados</div>
                    <div className="text-xs text-red-500">Operação irreversível</div>
                  </div>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => toast({
                      title: "Atenção",
                      description: "Esta operação não pode ser realizada. Contate o suporte."
                    })}
                  >
                    Limpar
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="p-5 backdrop-blur-sm bg-white/5">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Informações do Sistema</h3>
                <p className="text-sm text-muted-foreground">Detalhes técnicos e versões</p>
              </div>
              <Button 
                variant="outline"
                onClick={() => toast({ description: "Verificando atualizações..." })}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Verificar Atualizações
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mt-6">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Versão do Sistema</span>
                <span>4.2.1</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Modelo de IA</span>
                <span>v3.1.5</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Banco de Dados</span>
                <span>MariaDB 10.6</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">API</span>
                <span>v2.0</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Última Atualização</span>
                <span>15/05/2024</span>
              </div>
              
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Próxima Atualização</span>
                <span>01/06/2024</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Technical footer */}
      <div className="text-xs text-muted-foreground text-center mt-8">
        v4.2.1 | Modelo IA v3.1 | Última análise: 21/05/2024 14:30
      </div>
    </MainLayout>
  );
};

export default GestaoDatabase;
