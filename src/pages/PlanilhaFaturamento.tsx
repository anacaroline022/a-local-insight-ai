
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DollarSign, 
  Download, 
  Filter, 
  Upload, 
  PlusCircle, 
  Trash2,
  Eye,
  FileSpreadsheet,
  Calendar,
  Search,
  RefreshCw, 
  BarChart2,
  TrendingUp
} from 'lucide-react';
import { cn } from '@/lib/utils';

const PlanilhaFaturamento = () => {
  const [activeTab, setActiveTab] = useState('registros');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('mensal');
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Mock financial data
  const [financialData, setFinancialData] = useState([
    { 
      id: '1', 
      descricao: 'Mensalidade - Ana Silva', 
      valor: 150.00, 
      data: '15/05/2024', 
      status: 'pago', 
      categoria: 'receita' 
    },
    { 
      id: '2', 
      descricao: 'Mensalidade - Carlos Oliveira', 
      valor: 150.00, 
      data: '16/05/2024', 
      status: 'pendente', 
      categoria: 'receita' 
    },
    { 
      id: '3', 
      descricao: 'Agua Mineral', 
      valor: 250.00, 
      data: '10/05/2024', 
      status: 'pago', 
      categoria: 'despesa' 
    },
    { 
      id: '4', 
      descricao: 'Manutenção Esteira', 
      valor: 450.00, 
      data: '05/05/2024', 
      status: 'pago', 
      categoria: 'despesa' 
    },
    { 
      id: '5', 
      descricao: 'Mensalidade - João Costa', 
      valor: 180.00, 
      data: '18/05/2024', 
      status: 'pago', 
      categoria: 'receita' 
    }
  ]);
  
  // Count summary
  const receitas = financialData.filter(item => item.categoria === 'receita');
  const despesas = financialData.filter(item => item.categoria === 'despesa');
  const totalReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);
  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const saldo = totalReceitas - totalDespesas;
  
  // Filter data based on search term
  const filteredData = financialData.filter(item => 
    item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.valor.toString().includes(searchTerm) ||
    item.data.includes(searchTerm) ||
    item.status.includes(searchTerm)
  );
  
  // Simulate generating a report
  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    setTimeout(() => {
      setIsGeneratingReport(false);
      // Simulate download
      alert('Relatório gerado com sucesso!');
    }, 1500);
  };
  
  // Simulate data update
  const handleUpdateData = () => {
    setIsUpdating(true);
    setTimeout(() => {
      // Add a random transaction
      const newTransaction = {
        id: (financialData.length + 1).toString(),
        descricao: `Transação ${Math.floor(Math.random() * 1000)}`,
        valor: Math.floor(Math.random() * 500) + 100,
        data: '21/05/2024',
        status: Math.random() > 0.5 ? 'pago' : 'pendente',
        categoria: Math.random() > 0.5 ? 'receita' : 'despesa'
      };
      
      setFinancialData([newTransaction, ...financialData]);
      setIsUpdating(false);
    }, 1000);
  };
  
  // Simulated real-time data update
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        handleUpdateData();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [financialData]);
  
  return (
    <MainLayout
      pageTitle="Planilha e Faturamento"
      pageSubtitle="Gestão financeira simplificada da sua academia"
      headerImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    >
      <div className="space-y-6">
        {/* Financial summary cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className={cn(
            "transition-all duration-200 hover:shadow-md",
            saldo > 0 ? "border-green-500/50" : "border-red-500/50"
          )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              <DollarSign className={cn(
                "h-4 w-4",
                saldo > 0 ? "text-green-500" : "text-red-500"
              )} />
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-2xl font-bold",
                saldo > 0 ? "text-green-500" : "text-red-500"
              )}>
                R$ {saldo.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                Atualizado em tempo real
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Receitas</CardTitle>
              <div className="p-2 rounded-full bg-academy-green text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalReceitas.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {receitas.length} transações
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Despesas</CardTitle>
              <div className="p-2 rounded-full bg-academy-red text-white">
                <BarChart2 className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {totalDespesas.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {despesas.length} transações
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="registros" className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Registros
              </TabsTrigger>
              <TabsTrigger value="relatorios" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Relatórios
              </TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-8 pr-4 py-1 h-9 bg-secondary rounded-md text-sm w-[120px] sm:w-[180px] focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button 
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleUpdateData}
                disabled={isUpdating}
              >
                <RefreshCw className={cn(
                  "h-3 w-3",
                  isUpdating && "animate-spin"
                )} />
                {isUpdating ? "Atualizando..." : "Atualizar"}
              </Button>
            </div>
          </div>
          
          <TabsContent value="registros" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-3 w-3" />
                  Filtrar
                </Button>
                <div className="flex items-center border rounded-md overflow-hidden">
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs font-medium",
                      selectedPeriod === 'semanal' ? "bg-primary text-primary-foreground" : "bg-secondary"
                    )}
                    onClick={() => setSelectedPeriod('semanal')}
                  >
                    Semana
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs font-medium",
                      selectedPeriod === 'mensal' ? "bg-primary text-primary-foreground" : "bg-secondary"
                    )}
                    onClick={() => setSelectedPeriod('mensal')}
                  >
                    Mês
                  </button>
                  <button 
                    className={cn(
                      "px-3 py-1 text-xs font-medium",
                      selectedPeriod === 'anual' ? "bg-primary text-primary-foreground" : "bg-secondary"
                    )}
                    onClick={() => setSelectedPeriod('anual')}
                  >
                    Ano
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <Upload className="h-3 w-3" />
                  Importar
                </Button>
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <Download className="h-3 w-3" />
                  Exportar
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <PlusCircle className="h-3 w-3" />
                  Novo
                </Button>
              </div>
            </div>
            
            {/* Table of financial records */}
            <div className="rounded-md border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Descrição</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Valor</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Data</th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-muted-foreground">Status</th>
                    <th className="py-3 px-4 text-right text-xs font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <tr key={item.id} className="border-t hover:bg-muted/50">
                        <td className="py-3 px-4 text-sm">
                          {item.descricao}
                        </td>
                        <td className={cn(
                          "py-3 px-4 text-sm font-medium",
                          item.categoria === 'receita' ? "text-green-500" : "text-red-500"
                        )}>
                          {item.categoria === 'receita' ? '+' : '-'}R$ {item.valor.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {item.data}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            "inline-block px-2 py-1 rounded-full text-xs font-medium",
                            item.status === 'pago' 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-yellow-500/10 text-yellow-500"
                          )}>
                            {item.status === 'pago' ? 'Pago' : 'Pendente'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-10 text-center text-muted-foreground">
                        Nenhum registro encontrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="relatorios" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Relatórios Financeiros</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={handleGenerateReport}
                    disabled={isGeneratingReport}
                  >
                    <span className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4" />
                      Relatório de Receitas
                    </span>
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={handleGenerateReport}
                    disabled={isGeneratingReport}
                  >
                    <span className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4" />
                      Relatório de Despesas
                    </span>
                    <Download className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={handleGenerateReport}
                    disabled={isGeneratingReport}
                  >
                    <span className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4" />
                      Fluxo de Caixa
                    </span>
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">Projeções Financeiras</CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Projeção de Receitas (30 dias)</p>
                        <p className="font-medium">R$ 32.450</p>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-academy-green" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Projeção de Despesas (30 dias)</p>
                        <p className="font-medium">R$ 15.800</p>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-academy-red" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">Lucro Projetado (30 dias)</p>
                        <p className="font-medium text-green-500">R$ 16.650</p>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-academy-blue" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4">Ver Análise Completa</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PlanilhaFaturamento;
