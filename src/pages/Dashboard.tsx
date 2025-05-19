
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import { User, Users, TrendingDown, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data for the dashboard
const generateRetencionData = () => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  return months.map(month => {
    const thisYear = Math.round(70 + Math.random() * 15);
    const lastYear = Math.round(60 + Math.random() * 15);
    const prediction = month === 'Jun' || month === 'Jul' ? 
      Math.round(thisYear - Math.random() * 15) : 
      Math.round(thisYear + Math.random() * 5);
    
    return {
      name: month,
      "Atual": thisYear,
      "Ano Anterior": lastYear,
      "Previsão IA": prediction
    };
  });
};

const generateRevenue = () => {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  
  return months.map(month => {
    const revenue = Math.round(20000 + Math.random() * 10000);
    const projected = month === 'Jun' || month === 'Jul' ? 
      Math.round(revenue - Math.random() * 8000) : 
      Math.round(revenue + Math.random() * 2000);
    
    return {
      name: month,
      "Receita": revenue,
      "Projeção": projected
    };
  });
};

const generateAgeDistribution = () => [
  { name: '18-24', value: 20 },
  { name: '25-34', value: 35, color: '#9b87f5' },
  { name: '35-44', value: 30, color: '#9b87f5' },
  { name: '45-54', value: 10 },
  { name: '55+', value: 5 }
];

const generateAttendanceData = () => {
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  
  return days.map(day => {
    return {
      name: day,
      "Manhã": Math.round(20 + Math.random() * 30),
      "Tarde": Math.round(15 + Math.random() * 25),
      "Noite": day === 'Sáb' || day === 'Dom' ? 
        Math.round(5 + Math.random() * 15) : 
        Math.round(30 + Math.random() * 40),
    };
  });
};

const Dashboard = () => {
  const [retentionData, setRetentionData] = useState(generateRetencionData());
  const [revenueData, setRevenueData] = useState(generateRevenue());
  const [ageData, setAgeData] = useState(generateAgeDistribution());
  const [attendanceData, setAttendanceData] = useState(generateAttendanceData());
  const [currentDate, setCurrentDate] = useState('');
  
  // Update real-time data every 5 seconds to simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRetentionData(generateRetencionData());
      setRevenueData(generateRevenue());
      setAttendanceData(generateAttendanceData());
      
      // Update current date/time for real-time effect
      const now = new Date();
      setCurrentDate(now.toLocaleString('pt-BR'));
    }, 5000);
    
    // Set initial current date/time
    const now = new Date();
    setCurrentDate(now.toLocaleString('pt-BR'));
    
    return () => clearInterval(interval);
  }, []);
  
  const StatCard = ({ title, value, icon: Icon, trend, description, color }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("p-2 rounded-full", color)}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3 mr-1 text-academy-green" />
          ) : (
            <TrendingDown className="h-3 w-3 mr-1 text-academy-red" />
          )}
          {description}
        </p>
      </CardContent>
    </Card>
  );
  
  return (
    <MainLayout 
      pageTitle="Dashboard" 
      pageSubtitle="Visão geral da Academia Força Local"
      headerImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Visão Geral</h2>
          <div className="text-sm text-muted-foreground flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Dados atualizados em tempo real: {currentDate}
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total de Alunos" 
            value="286" 
            icon={Users} 
            trend="up" 
            description="12% em relação ao mês anterior"
            color="bg-academy-blue"
          />
          <StatCard 
            title="Novas Matrículas" 
            value="24" 
            icon={User} 
            trend="up" 
            description="8% em relação ao mês anterior"
            color="bg-academy-green"
          />
          <StatCard 
            title="Cancelamentos" 
            value="6" 
            icon={TrendingDown} 
            trend="down" 
            description="3% em relação ao mês anterior"
            color="bg-academy-red"
          />
          <StatCard 
            title="Receita Mensal" 
            value="R$ 42.860" 
            icon={DollarSign} 
            trend="up" 
            description="9% em relação ao mês anterior"
            color="bg-academy-purple"
          />
        </div>
        
        <Tabs defaultValue="retenção" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-lg">
            <TabsTrigger value="retenção">Retenção</TabsTrigger>
            <TabsTrigger value="receita">Receita</TabsTrigger>
            <TabsTrigger value="demografia">Demografia</TabsTrigger>
            <TabsTrigger value="frequência">Frequência</TabsTrigger>
          </TabsList>
          
          <TabsContent value="retenção" className="space-y-4 mt-4">
            <div className="flex flex-col">
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <LineChart 
                  title="Taxa de Retenção de Alunos (%)" 
                  description="Comparativo anual com previsão de IA para os próximos meses"
                  tooltip="Os meses de inverno (Junho e Julho) têm previsão de queda na retenção. A IA sugere implementar campanhas especiais neste período."
                  data={retentionData}
                  lines={[
                    { dataKey: "Atual", color: "#9b87f5", name: "Taxa Atual (%)" },
                    { dataKey: "Ano Anterior", color: "#1EAEDB", name: "Ano Anterior (%)" },
                    { dataKey: "Previsão IA", color: "#D946EF", name: "Previsão IA (%)" }
                  ]}
                  height={400}
                />
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Alerta de IA:</h3>
                <div className="bg-academy-red/10 border border-academy-red/20 rounded-lg p-4">
                  <div className="flex items-start">
                    <TrendingDown className="h-5 w-5 text-academy-red mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-academy-red">Previsão de Queda na Retenção</h4>
                      <p className="text-sm mt-1">
                        O modelo de IA prevê uma queda de 15% na retenção para os meses de junho e julho devido ao inverno.
                        Sugerimos implementar as seguintes ações:
                      </p>
                      <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                        <li>Iniciar campanhas motivacionais específicas para o inverno</li>
                        <li>Oferecer desconto especial para pagamento trimestral antecipado</li>
                        <li>Promover aulas temáticas e desafios internos para aumentar o engajamento</li>
                      </ul>
                      <Button className="mt-3 bg-academy-red text-white hover:bg-academy-red/90">
                        Implementar Recomendações
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="receita" className="mt-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              <LineChart 
                title="Receita Mensal (R$)" 
                description="Valores atuais e projeção baseada em IA"
                tooltip="A projeção considera a taxa de retenção prevista e o histórico de conversão de novos alunos."
                data={revenueData}
                lines={[
                  { dataKey: "Receita", color: "#4CAF50", name: "Receita (R$)" },
                  { dataKey: "Projeção", color: "#FF9800", name: "Projeção (R$)" }
                ]}
                height={400}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="demografia" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
              <PieChart 
                title="Distribuição por Idade" 
                description="Segmentação de alunos por faixa etária"
                tooltip="As faixas destacadas representam o público majoritário da academia (mulheres 25-45 anos)."
                data={ageData}
                height={320}
              />
              
              <PieChart 
                title="Distribuição por Gênero" 
                data={[
                  { name: "Feminino", value: 65, color: "#D946EF" },
                  { name: "Masculino", value: 35, color: "#1EAEDB" }
                ]}
                description="Segmentação de alunos por gênero"
                tooltip="O público feminino representa a maioria dos alunos, alinhado com o foco da academia."
                height={320}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="frequência" className="mt-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              <BarChart 
                title="Frequência Semanal por Período" 
                description="Número médio de alunos por dia da semana e período"
                tooltip="A noite é o horário mais movimentado em dias úteis, enquanto finais de semana têm menor frequência."
                data={attendanceData}
                bars={[
                  { dataKey: "Manhã", color: "#9b87f5" },
                  { dataKey: "Tarde", color: "#1EAEDB" },
                  { dataKey: "Noite", color: "#D946EF" }
                ]}
                height={400}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-medium">Alunos em Risco de Evasão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Ana Silva", days: 12, risk: 85 },
                { name: "Carlos Mendes", days: 8, risk: 76 },
                { name: "Lucia Farias", days: 10, risk: 72 },
                { name: "Roberto Santos", days: 7, risk: 65 },
                { name: "Juliana Lima", days: 9, risk: 62 }
              ].map((student, index) => (
                <div key={index} className="flex items-center justify-between pb-2 border-b border-border last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-xs text-muted-foreground">{student.days} dias sem frequência</p>
                  </div>
                  <div className="flex items-center">
                    <span className={cn(
                      "text-sm font-medium px-2 py-1 rounded",
                      student.risk > 75 ? "bg-academy-red/10 text-academy-red" : "bg-academy-orange/10 text-academy-orange"
                    )}>
                      {student.risk}% risco
                    </span>
                    <Button variant="ghost" size="sm" className="ml-2">
                      Contatar
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-medium">Análise de Frequência</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Frequência Média Semanal</p>
                  <p className="font-medium">3.2 dias/semana</p>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-academy-blue" style={{ width: '64%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Consistência de Horários</p>
                  <p className="font-medium">76%</p>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-academy-purple" style={{ width: '76%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Permanência na Academia</p>
                  <p className="font-medium">52 min</p>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-academy-green" style={{ width: '58%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Taxa de Adesão a Aulas</p>
                  <p className="font-medium">41%</p>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-academy-pink" style={{ width: '41%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle className="text-base font-medium">Próximas Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-academy-blue/10 p-3 rounded-lg flex">
                <Calendar className="h-5 w-5 text-academy-blue mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-academy-blue">Campanha de Inverno</h4>
                  <p className="text-xs">Iniciar em 3 dias • Prioridade Alta</p>
                </div>
              </div>
              
              <div className="bg-academy-purple/10 p-3 rounded-lg flex">
                <Users className="h-5 w-5 text-academy-purple mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-academy-purple">Contatar Alunos em Risco</h4>
                  <p className="text-xs">5 alunos • Prioridade Alta</p>
                </div>
              </div>
              
              <div className="bg-academy-green/10 p-3 rounded-lg flex">
                <TrendingUp className="h-5 w-5 text-academy-green mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-academy-green">Atualizar Planos</h4>
                  <p className="text-xs">Em 7 dias • Prioridade Média</p>
                </div>
              </div>
              
              <Button className="w-full">Ver todas as ações</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
