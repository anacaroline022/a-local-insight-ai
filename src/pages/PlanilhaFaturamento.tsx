
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  TrendingUp,
  UserPlus,
  ChevronDown,
  FileText,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  ChartContainer, 
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';

const PlanilhaFaturamento = () => {
  const [activeTab, setActiveTab] = useState('registros');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('mensal');
  const [isUpdating, setIsUpdating] = useState(false);
  const [sortColumn, setSortColumn] = useState('data');
  const [sortDirection, setSortDirection] = useState('desc');
  
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
    },
    { 
      id: '6', 
      descricao: 'Mensalidade - Mariana Santos', 
      valor: 170.00, 
      data: '12/05/2024', 
      status: 'pago', 
      categoria: 'receita' 
    },
    { 
      id: '7', 
      descricao: 'Material de Limpeza', 
      valor: 180.00, 
      data: '08/05/2024', 
      status: 'pago', 
      categoria: 'despesa' 
    },
    { 
      id: '8', 
      descricao: 'Mensalidade - Pedro Oliveira', 
      valor: 150.00, 
      data: '19/05/2024', 
      status: 'pendente', 
      categoria: 'receita' 
    }
  ]);
  
  // Chart data
  const chartData = [
    { name: 'Jan', receita: 22000, despesa: 12000 },
    { name: 'Fev', receita: 20000, despesa: 13000 },
    { name: 'Mar', receita: 25000, despesa: 14000 },
    { name: 'Abr', receita: 27000, despesa: 12500 },
    { name: 'Mai', receita: 28950, despesa: 13800 },
    { name: 'Jun', receita: 30000, despesa: 14200 },
  ];

  // Daily trend data
  const dailyTrendData = [
    { name: '01', valor: 850 },
    { name: '05', valor: 1200 },
    { name: '10', valor: 950 },
    { name: '15', valor: 1500 },
    { name: '20', valor: 1100 },
    { name: '25', valor: 1300 },
    { name: '30', valor: 1800 },
  ];
  
  // Count summary
  const receitas = financialData.filter(item => item.categoria === 'receita');
  const despesas = financialData.filter(item => item.categoria === 'despesa');
  const totalReceitas = receitas.reduce((acc, item) => acc + item.valor, 0);
  const totalDespesas = despesas.reduce((acc, item) => acc + item.valor, 0);
  const saldo = totalReceitas - totalDespesas;
  
  // Filter and sort data
  const sortedAndFilteredData = financialData
    .filter(item => 
      item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.valor.toString().includes(searchTerm) ||
      item.data.includes(searchTerm) ||
      item.status.includes(searchTerm)
    )
    .sort((a, b) => {
      if (sortColumn === 'valor') {
        return sortDirection === 'asc' ? a.valor - b.valor : b.valor - a.valor;
      }
      
      if (sortColumn === 'data') {
        const dateA = a.data.split('/').reverse().join('');
        const dateB = b.data.split('/').reverse().join('');
        return sortDirection === 'asc' ? dateA.localeCompare(dateB) : dateB.localeCompare(dateA);
      }
      
      return sortDirection === 'asc' 
        ? a[sortColumn].localeCompare(b[sortColumn]) 
        : b[sortColumn].localeCompare(a[sortColumn]);
    });
  
  // Handle sort
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
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

  // Handle delete
  const handleDelete = (id) => {
    setFinancialData(financialData.filter(item => item.id !== id));
  };

  // Handle new transaction
  const handleNewTransaction = () => {
    const newTransaction = {
      id: (financialData.length + 1).toString(),
      descricao: 'Nova transação',
      valor: 0,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'pendente',
      categoria: 'receita'
    };
    
    setFinancialData([newTransaction, ...financialData]);
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tendência</CardTitle>
              <div className="p-2 rounded-full bg-academy-blue text-white">
                <TrendingUp className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyTrendData}>
                    <Line 
                      type="monotone" 
                      dataKey="valor" 
                      stroke="#1EAEDB" 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="px-6 pb-4 pt-1 text-xs text-muted-foreground">
                Crescimento diário do mês atual
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly revenue chart */}
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-medium">Visão Financeira Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `R$${value/1000}k`} />
                  <Tooltip formatter={(value) => `R$${value.toFixed(2)}`} />
                  <Bar dataKey="receita" fill="#4CAF50" name="Receitas" />
                  <Bar dataKey="despesa" fill="#FF5252" name="Despesas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
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
              <TabsTrigger value="planilha" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Planilha Inteligente
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
                <Button size="sm" className="flex items-center gap-2" onClick={handleNewTransaction}>
                  <PlusCircle className="h-3 w-3" />
                  Novo
                </Button>
              </div>
            </div>
            
            {/* Table of financial records */}
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-secondary">
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-secondary/80" 
                      onClick={() => handleSort('descricao')}
                    >
                      <div className="flex items-center">
                        Descrição
                        {sortColumn === 'descricao' && (
                          <ChevronDown className={cn(
                            "h-3 w-3 ml-1",
                            sortDirection === 'desc' ? 'rotate-180' : ''
                          )} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-secondary/80" 
                      onClick={() => handleSort('valor')}
                    >
                      <div className="flex items-center">
                        Valor
                        {sortColumn === 'valor' && (
                          <ChevronDown className={cn(
                            "h-3 w-3 ml-1",
                            sortDirection === 'desc' ? 'rotate-180' : ''
                          )} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-secondary/80" 
                      onClick={() => handleSort('data')}
                    >
                      <div className="flex items-center">
                        Data
                        {sortColumn === 'data' && (
                          <ChevronDown className={cn(
                            "h-3 w-3 ml-1",
                            sortDirection === 'desc' ? 'rotate-180' : ''
                          )} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-secondary/80" 
                      onClick={() => handleSort('status')}
                    >
                      <div className="flex items-center">
                        Status
                        {sortColumn === 'status' && (
                          <ChevronDown className={cn(
                            "h-3 w-3 ml-1",
                            sortDirection === 'desc' ? 'rotate-180' : ''
                          )} />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedAndFilteredData.length > 0 ? (
                    sortedAndFilteredData.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{item.descricao}</TableCell>
                        <TableCell className={cn(
                          "font-medium",
                          item.categoria === 'receita' ? "text-green-500" : "text-red-500"
                        )}>
                          {item.categoria === 'receita' ? '+' : '-'}R$ {item.valor.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            {item.data}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={cn(
                            "inline-block px-2 py-1 rounded-full text-xs font-medium",
                            item.status === 'pago' 
                              ? "bg-green-500/10 text-green-500" 
                              : "bg-yellow-500/10 text-yellow-500"
                          )}>
                            {item.status === 'pago' ? 'Pago' : 'Pendente'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                        Nenhum registro encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
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

          <TabsContent value="planilha" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h3 className="font-semibold text-lg">Planilha Inteligente</h3>
                <p className="text-sm text-muted-foreground">Gerencie sua academia com eficiência</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <UserPlus className="h-3 w-3" />
                  Novo Aluno
                </Button>
                <Button size="sm" className="flex items-center gap-2">
                  <Download className="h-3 w-3" />
                  Exportar
                </Button>
              </div>
            </div>
            
            {/* Main spreadsheet table */}
            <div className="rounded-md border overflow-auto">
              <Table>
                <TableHeader className="bg-secondary sticky top-0">
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead className="min-w-[200px]">Aluno</TableHead>
                    <TableHead className="min-w-[120px]">Plano</TableHead>
                    <TableHead className="min-w-[100px]">Frequência</TableHead>
                    <TableHead className="min-w-[120px]">Último Pagamento</TableHead>
                    <TableHead className="min-w-[100px]">Valor</TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[100px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array(8).fill(0).map((_, i) => (
                    <TableRow key={i} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                          {String.fromCharCode(65 + i)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {['Ana Silva', 'Carlos Oliveira', 'Maria Santos', 'João Costa', 
                          'Pedro Alves', 'Lucia Ferreira', 'Rafael Sousa', 'Camila Lima'][i]}
                      </TableCell>
                      <TableCell>
                        {['Mensal', 'Trimestral', 'Mensal', 'Anual', 
                          'Mensal', 'Semestral', 'Mensal', 'Trimestral'][i]}
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              [80, 40, 90, 75, 60, 85, 30, 70][i] > 70 ? "bg-green-500" : 
                              [80, 40, 90, 75, 60, 85, 30, 70][i] > 50 ? "bg-yellow-500" : "bg-red-500"
                            )}
                            style={{ 
                              width: `${[80, 40, 90, 75, 60, 85, 30, 70][i]}%` 
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1 block">
                          {[80, 40, 90, 75, 60, 85, 30, 70][i]}%
                        </span>
                      </TableCell>
                      <TableCell>
                        {['15/05/2024', '10/05/2024', '18/05/2024', '01/05/2024', 
                          '12/05/2024', '08/05/2024', '16/05/2024', '05/05/2024'][i]}
                      </TableCell>
                      <TableCell>
                        R$ {[150, 450, 150, 1800, 150, 900, 150, 450][i].toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <span className={cn(
                          "inline-block px-2 py-1 rounded-full text-xs font-medium",
                          [true, false, true, true, true, true, false, true][i] 
                            ? "bg-green-500/10 text-green-500" 
                            : "bg-yellow-500/10 text-yellow-500"
                        )}>
                          {[true, false, true, true, true, true, false, true][i] ? 'Ativo' : 'Pendente'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Metrics at the bottom */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Taxa de Renovação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85%</div>
                  <div className="mt-4 h-2 bg-secondary rounded-full">
                    <div className="bg-academy-green h-full rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Meta: 90%
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ocupação da Academia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72%</div>
                  <div className="mt-4 h-2 bg-secondary rounded-full">
                    <div className="bg-academy-blue h-full rounded-full" style={{ width: '72%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    142/200 vagas preenchidas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">R$ 195,50</div>
                  <div className="mt-4 h-2 bg-secondary rounded-full">
                    <div className="bg-academy-purple h-full rounded-full" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    +12% vs mês anterior
                  </p>
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
