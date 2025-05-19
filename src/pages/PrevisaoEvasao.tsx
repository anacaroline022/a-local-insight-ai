import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LineChart from '@/components/charts/LineChart';
import PieChart from '@/components/charts/PieChart';
import { AlertTriangle, RefreshCcw, User, Users, CalendarClock, Calendar, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock data generators
const generateEvasionTrends = () => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  return months.map(month => {
    // Summer months (Dec-Feb in Southern hemisphere)
    const isSummer = month === 'Dez' || month === 'Jan' || month === 'Fev';
    // Winter months (Jun-Aug in Southern hemisphere)
    const isWinter = month === 'Jun' || month === 'Jul' || month === 'Ago';
    
    let baseRate = 12; // Base evasion rate
    
    // Adjust rates seasonally
    if (isSummer) baseRate = 8 + Math.random() * 4; // Lower in summer
    if (isWinter) baseRate = 20 + Math.random() * 15; // Higher in winter
    
    // Add some randomness
    const actualRate = baseRate + (Math.random() * 5 - 2.5);
    
    // IA prediction (slightly different from actual)
    let prediction = actualRate + (Math.random() * 4 - 2);
    // IA adjusted prediction (after interventions)
    let adjustedPrediction = prediction * (isWinter ? 0.7 : 0.85);
    
    return {
      name: month,
      "Taxa Real": Math.round(actualRate * 10) / 10,
      "Previsão IA": Math.round(prediction * 10) / 10,
      "Previsão Ajustada": Math.round(adjustedPrediction * 10) / 10
    };
  });
};

const generateRiskFactors = () => [
  { name: 'Frequência baixa', value: 35, color: '#FF5252' },
  { name: 'Clima (inverno)', value: 25, color: '#1EAEDB' },
  { name: 'Inadimplência', value: 15, color: '#FF9800' },
  { name: 'Desmotivação', value: 10, color: '#9b87f5' },
  { name: 'Mudança de endereço', value: 8, color: '#4CAF50' },
  { name: 'Outros fatores', value: 7, color: '#D946EF' }
];

// Status colors for risk levels
const getRiskColor = (risk) => {
  if (risk >= 75) return 'text-academy-red';
  if (risk >= 50) return 'text-academy-orange';
  return 'text-academy-green';
};

const getRiskBgColor = (risk) => {
  if (risk >= 75) return 'bg-academy-red/10';
  if (risk >= 50) return 'bg-academy-orange/10';
  return 'bg-academy-green/10';
};

const PrevisaoEvasao = () => {
  const [evasionData, setEvasionData] = useState(generateEvasionTrends());
  const [riskFactors, setRiskFactors] = useState(generateRiskFactors());
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  
  // Update last updated timestamp
  useEffect(() => {
    updateTimestamp();
  }, []);
  
  const updateTimestamp = () => {
    const now = new Date();
    setLastUpdated(now.toLocaleString('pt-BR'));
  };
  
  // Function to simulate refreshing data
  const refreshData = () => {
    setLoading(true);
    setTimeout(() => {
      setEvasionData(generateEvasionTrends());
      setRiskFactors(generateRiskFactors());
      updateTimestamp();
      setLoading(false);
    }, 1500);
  };
  
  // List of high-risk students
  const highRiskStudents = [
    {
      id: 1,
      name: "Marina Silva",
      avatar: "MS",
      risk: 92,
      lastVisit: "15 dias atrás",
      factors: ["Frequência baixa", "Clima (inverno)"],
      email: "marina.silva@email.com",
      phone: "(47) 99876-5432"
    },
    {
      id: 2,
      name: "Rafael Costa",
      avatar: "RC",
      risk: 85,
      lastVisit: "12 dias atrás",
      factors: ["Frequência baixa", "Inadimplência"],
      email: "rafael.costa@email.com",
      phone: "(47) 99876-1234"
    },
    {
      id: 3,
      name: "Carolina Mendes",
      avatar: "CM",
      risk: 78,
      lastVisit: "10 dias atrás",
      factors: ["Clima (inverno)", "Desmotivação"],
      email: "carolina.mendes@email.com",
      phone: "(47) 99876-9876"
    },
    {
      id: 4,
      name: "Pedro Almeida",
      avatar: "PA",
      risk: 71,
      lastVisit: "8 dias atrás",
      factors: ["Frequência baixa", "Mudança de endereço"],
      email: "pedro.almeida@email.com",
      phone: "(47) 99876-4567"
    },
    {
      id: 5,
      name: "Juliana Santos",
      avatar: "JS",
      risk: 68,
      lastVisit: "9 dias atrás",
      factors: ["Clima (inverno)", "Frequência baixa"],
      email: "juliana.santos@email.com",
      phone: "(47) 99876-7890"
    }
  ];
  
  // List of automated intervention strategies
  const interventionStrategies = [
    {
      id: 1,
      name: "Campanha de Inverno",
      description: "Promoção especial para os meses de inverno com descontos progressivos",
      targetRisk: "Alto (75-100%)",
      impact: 85,
      status: "Ativo"
    },
    {
      id: 2,
      name: "Check-in Motivacional",
      description: "Mensagens personalizadas para alunos que não frequentam há mais de 7 dias",
      targetRisk: "Médio-Alto (50-75%)",
      impact: 72,
      status: "Ativo"
    },
    {
      id: 3,
      name: "Reconexão por WhatsApp",
      description: "Contato direto com alunos de alto risco oferecendo ajustes no plano",
      targetRisk: "Alto (75-100%)",
      impact: 90,
      status: "Ativo"
    },
    {
      id: 4,
      name: "Desafio Fitness Invernal",
      description: "Programa de 21 dias com incentivos e recompensas para aumentar frequência",
      targetRisk: "Todos os níveis",
      impact: 65,
      status: "Agendado"
    },
  ];
  
  return (
    <MainLayout 
      pageTitle="Previsão de Evasão (IA)" 
      pageSubtitle="Sistema inteligente para prever e reduzir cancelamentos"
      headerImage="https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Análise Preditiva de Evasão</h2>
            <p className="text-sm text-muted-foreground">
              Atualizado em: {lastUpdated}
            </p>
          </div>
          <Button 
            onClick={refreshData} 
            disabled={loading}
            className="flex items-center"
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            {loading ? 'Atualizando...' : 'Atualizar Dados'}
          </Button>
        </div>
        
        <div className="bg-academy-purple/10 border border-academy-purple/30 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-academy-purple mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-academy-purple">Alerta de Inteligência Artificial</h3>
              <p className="text-sm mt-1">
                O modelo de IA detectou um padrão sazonal de aumento de evasão durante os meses de inverno (Junho a Agosto). 
                A previsão atual indica um risco de aumento de 35% nos cancelamentos neste período se nenhuma ação for tomada.
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Evasão Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14.8%</div>
              <p className="text-xs text-muted-foreground mt-1">
                2.2% maior que no mês anterior
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Previsão para Julho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-academy-red">32.5%</div>
              <p className="text-xs text-muted-foreground mt-1">
                17.7% maior que a taxa atual
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Alunos em Alto Risco</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground mt-1">
                9.8% do total de alunos ativos
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Impacto Financeiro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 12.600</div>
              <p className="text-xs text-muted-foreground mt-1">
                Perda potencial de receita mensal
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="tendencias" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="tendencias">Tendências</TabsTrigger>
            <TabsTrigger value="alunos">Alunos em Risco</TabsTrigger>
            <TabsTrigger value="intervencoes">Intervenções</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tendencias" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <LineChart 
                  title="Tendência de Evasão Anual (%)" 
                  description="Taxas reais e previsões baseadas em IA"
                  tooltip="A linha de previsão ajustada mostra o impacto esperado das intervenções recomendadas pela IA"
                  data={evasionData}
                  lines={[
                    { dataKey: "Taxa Real", color: "#1EAEDB", name: "Taxa Real (%)" },
                    { dataKey: "Previsão IA", color: "#FF5252", name: "Previsão sem Intervenção (%)" },
                    { dataKey: "Previsão Ajustada", color: "#4CAF50", name: "Previsão com Intervenção (%)" }
                  ]}
                  height={400}
                />
              </div>
              
              <div>
                <PieChart 
                  title="Fatores de Risco" 
                  description="Principais causas de evasão identificadas"
                  tooltip="Baseado na análise de padrões históricos e entrevistas de cancelamento"
                  data={riskFactors}
                  height={400}
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Análise Sazonal</CardTitle>
                <CardDescription>
                  Impacto das estações do ano na taxa de evasão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Verão (Dez-Fev)</span>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Outono (Mar-Mai)</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Inverno (Jun-Ago)</span>
                      <span className="text-sm font-medium text-academy-red">35%</span>
                    </div>
                    <Progress value={35} className="h-2 bg-secondary">
                      <div className="h-full bg-destructive" style={{ width: `${35 * 100}%` }} />
                    </Progress>
                  </div>
                  
                  <div className="flex flex-col space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Primavera (Set-Nov)</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <Progress value={12} className="h-2" />
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium mb-2">Principais insights da IA:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="bg-academy-purple/20 text-academy-purple p-1 rounded-full mr-2 flex-shrink-0">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      O inverno apresenta um risco 3.5x maior de evasão comparado ao verão.
                    </li>
                    <li className="flex items-start">
                      <span className="bg-academy-purple/20 text-academy-purple p-1 rounded-full mr-2 flex-shrink-0">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Alunos que reduzem a frequência de 3x para 1x por semana no inverno têm 78% de chance de cancelar.
                    </li>
                    <li className="flex items-start">
                      <span className="bg-academy-purple/20 text-academy-purple p-1 rounded-full mr-2 flex-shrink-0">
                        <ArrowRight className="h-3 w-3" />
                      </span>
                      Campanhas específicas para o inverno podem reduzir a evasão em até 60%.
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alunos" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Alunos com Alto Risco de Evasão</CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Contatar Todos
                    </Button>
                    <Button size="sm">
                      Ações em Massa
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Lista de alunos com probabilidade de cancelamento acima de 65%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-3">Aluno</div>
                    <div className="col-span-2">Último Acesso</div>
                    <div className="col-span-2 text-center">Risco</div>
                    <div className="col-span-3">Fatores</div>
                    <div className="col-span-2 text-right">Ações</div>
                  </div>
                  
                  {highRiskStudents.map((student) => (
                    <div key={student.id} className="grid grid-cols-12 p-4 border-t">
                      <div className="col-span-3 flex items-center">
                        <div className="w-8 h-8 rounded-full bg-academy-purple/20 text-academy-purple flex items-center justify-center mr-3 flex-shrink-0">
                          {student.avatar}
                        </div>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{student.lastVisit}</span>
                      </div>
                      
                      <div className="col-span-2 flex items-center justify-center">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                          getRiskBgColor(student.risk),
                          getRiskColor(student.risk)
                        )}>
                          {student.risk}% de risco
                        </span>
                      </div>
                      
                      <div className="col-span-3 flex items-center space-x-1">
                        {student.factors.map((factor, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="col-span-2 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Mensagem
                        </Button>
                        <Button size="sm">
                          Plano
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Mostrando 5 de 28 alunos em alto risco
                  </p>
                  <Button variant="outline" size="sm">
                    Ver Todos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="intervencoes" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Estratégias de Retenção Automatizadas</CardTitle>
                  <Button>
                    Nova Estratégia
                  </Button>
                </div>
                <CardDescription>
                  Intervenções recomendadas pela IA para reduzir a evasão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-3">Estratégia</div>
                    <div className="col-span-4">Descrição</div>
                    <div className="col-span-2">Público-Alvo</div>
                    <div className="col-span-1 text-center">Impacto</div>
                    <div className="col-span-2 text-right">Status</div>
                  </div>
                  
                  {interventionStrategies.map((strategy) => (
                    <div key={strategy.id} className="grid grid-cols-12 p-4 border-t">
                      <div className="col-span-3">
                        <div className="font-medium">{strategy.name}</div>
                      </div>
                      
                      <div className="col-span-4">
                        <div className="text-sm">{strategy.description}</div>
                      </div>
                      
                      <div className="col-span-2">
                        <span className="text-sm">{strategy.targetRisk}</span>
                      </div>
                      
                      <div className="col-span-1 text-center">
                        <span className={cn(
                          "inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium",
                          strategy.impact > 80 ? "bg-academy-green/10 text-academy-green" : 
                          strategy.impact > 70 ? "bg-academy-blue/10 text-academy-blue" : 
                          "bg-academy-orange/10 text-academy-orange"
                        )}>
                          {strategy.impact}%
                        </span>
                      </div>
                      
                      <div className="col-span-2 flex justify-end">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                          strategy.status === "Ativo" ? "bg-academy-green/10 text-academy-green" : "bg-academy-blue/10 text-academy-blue"
                        )}>
                          {strategy.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="font-medium mb-3">Nova Sugestão da IA</h3>
                  <div className="bg-academy-purple/10 border border-academy-purple/30 rounded-lg p-4">
                    <h4 className="font-medium text-academy-purple">Programa "Superando o Inverno"</h4>
                    <p className="text-sm mt-2">
                      Com base na análise dos dados de evasão e nos fatores identificados, a IA recomenda 
                      implementar um programa específico para o período de inverno que combina:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="bg-academy-purple/20 text-academy-purple p-1 rounded-full mr-2 flex-shrink-0">
                          <Calendar className="h-3 w-3" />
                        </span>
                        Desafio de 30 dias com recompensas progressivas por frequência
                      </li>
                      <li className="flex items-start">
                        <span className="bg-academy-purple/20 text-academy-purple p-1 rounded-full mr-2 flex-shrink-0">
                          <User className="h-3 w-3" />
                        </span>
                        Acompanhamento personalizado para alunos de alto risco
                      </li>
                      <li className="flex items-start">
                        <span className="bg-academy-purple/20 text-academy-purple p-1 rounded-full mr-2 flex-shrink-0">
                          <ArrowRight className="h-3 w-3" />
                        </span>
                        Desconto de 15% nos planos trimestrais pagos antecipadamente
                      </li>
                    </ul>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" className="text-academy-purple border-academy-purple">
                        Mais Detalhes
                      </Button>
                      <Button className="bg-academy-purple hover:bg-academy-purple/90">
                        Implementar Estratégia
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default PrevisaoEvasao;
