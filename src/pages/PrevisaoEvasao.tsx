
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useToast } from '@/hooks/use-toast';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingDown, MessageCircle, RefreshCcw, Filter, Calendar } from 'lucide-react';

// Sample data for the chart
const chartData = [
  { data: '01/05', cancelamentos: 3, previsao: 3 },
  { data: '02/05', cancelamentos: 2, previsao: 2 },
  { data: '03/05', cancelamentos: 5, previsao: 4 },
  { data: '04/05', cancelamentos: 4, previsao: 5 },
  { data: '05/05', cancelamentos: 3, previsao: 4 },
  { data: '06/05', cancelamentos: 2, previsao: 3 },
  { data: '07/05', cancelamentos: 1, previsao: 2 },
  { data: '08/05', cancelamentos: 3, previsao: 3 },
  { data: '09/05', cancelamentos: 4, previsao: 3 },
  { data: '10/05', cancelamentos: 6, previsao: 5 },
  { data: '11/05', cancelamentos: 5, previsao: 6 },
  { data: '12/05', cancelamentos: 4, previsao: 5 },
  { data: '13/05', cancelamentos: 3, previsao: 4 },
  { data: '14/05', cancelamentos: 5, previsao: 5 },
  // Future prediction
  { data: '15/05', cancelamentos: null, previsao: 4 },
  { data: '16/05', cancelamentos: null, previsao: 3 },
  { data: '17/05', cancelamentos: null, previsao: 5 },
  { data: '18/05', cancelamentos: null, previsao: 4 },
  { data: '19/05', cancelamentos: null, previsao: 3 },
  { data: '20/05', cancelamentos: null, previsao: 2 },
];

// Sample data for students at risk
const alunosEmRisco = [
  { 
    id: 1, 
    nome: 'Ana Silva', 
    foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    risco: 85,
    padrao: 'frequencia', 
    razao: 'Faltou 5 vezes nas últimas 2 semanas' 
  },
  { 
    id: 2, 
    nome: 'João Pereira', 
    foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    risco: 72,
    padrao: 'pagamento', 
    razao: 'Atrasou pagamento por 7 dias' 
  },
  { 
    id: 3, 
    nome: 'Maria Oliveira', 
    foto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    risco: 68,
    padrao: 'feedback', 
    razao: 'Avaliou treino recente com 2/5 estrelas' 
  },
  { 
    id: 4, 
    nome: 'Carlos Santos', 
    foto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop',
    risco: 65,
    padrao: 'frequencia', 
    razao: 'Frequência irregular nos últimos 20 dias' 
  },
  { 
    id: 5, 
    nome: 'Lúcia Ferreira', 
    foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    risco: 60,
    padrao: 'feedback', 
    razao: 'Reclamou do horário das aulas 2 vezes' 
  }
];

// Icon renderer based on pattern
const renderPatternIcon = (padrao: string) => {
  switch (padrao) {
    case 'frequencia':
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    case 'pagamento':
      return <span className="text-amber-500">💰</span>;
    case 'feedback':
      return <span className="text-blue-500">😞</span>;
    default:
      return <span className="text-gray-500">⚠️</span>;
  }
};

const PrevisaoEvasao = () => {
  const { toast } = useToast();
  const [periodo, setPeriodo] = useState("7d");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);

  // Function to handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    toast({
      title: "Atualizando previsões",
      description: "Recalculando análises de risco...",
    });
    
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Previsões atualizadas",
        description: "Dados de risco atualizados com sucesso",
      });
    }, 1500);
  };

  // Function to handle period change
  const handleChangePeriod = (newPeriod: string) => {
    setPeriodo(newPeriod);
    toast({
      description: `Período alterado para: ${newPeriod}`,
    });
  };

  // Function to send message to student
  const handleSendMessage = (id: number, nome: string) => {
    toast({
      title: "Mensagem enviada",
      description: `Uma mensagem personalizada foi enviada para ${nome}.`,
    });
  };

  // Function to offer discount
  const handleOfferDiscount = (id: number, nome: string) => {
    toast({
      title: "Desconto oferecido",
      description: `Um desconto promocional foi oferecido para ${nome}.`,
    });
  };

  // Toggle student details
  const toggleStudentDetails = (id: number) => {
    setExpandedStudent(expandedStudent === id ? null : id);
  };

  return (
    <MainLayout 
      pageTitle="Previsão de Evasão (IA)" 
      pageSubtitle="Análise preditiva para retenção de alunos"
      headerImage="https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2000&auto=format&fit=crop"
    >
      <div className="space-y-8">
        {/* Top metrics section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 backdrop-blur-xl bg-black/40 border border-white/10 text-white">
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-gray-300">ALUNOS EM RISCO HOJE</h3>
              <div className="text-3xl font-bold">18/120 (15%)</div>
              <div className="text-green-400 flex items-center text-sm">
                ↓2% vs ontem
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-xl bg-black/40 border border-white/10 text-white">
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-gray-300">PREDIÇÃO MENSAL</h3>
              <div className="text-3xl font-bold">R$ 8.200</div>
              <div className="text-amber-400 text-sm">
                em receita em risco (7 cancelamentos previstos)
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-xl bg-black/40 border border-white/10 text-white">
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-gray-300">EFETIVIDADE DA IA</h3>
              <div className="text-3xl font-bold">92%</div>
              <div className="text-blue-400 text-sm">
                de precisão (baseado em dados históricos)
              </div>
            </div>
          </Card>
        </section>

        {/* Control bar */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              variant={periodo === "7d" ? "default" : "outline"} 
              onClick={() => handleChangePeriod("7d")}
              size="sm"
            >
              7 dias
            </Button>
            <Button 
              variant={periodo === "30d" ? "default" : "outline"} 
              onClick={() => handleChangePeriod("30d")}
              size="sm"
            >
              30 dias
            </Button>
            <Button 
              variant={periodo === "90d" ? "default" : "outline"} 
              onClick={() => handleChangePeriod("90d")}
              size="sm"
            >
              90 dias
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCcw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Personalizar
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
          </div>
        </div>

        {/* Chart section */}
        <Card className="p-6 bg-background">
          <h3 className="text-lg font-medium mb-4">Gráfico Preditivo de Evasão</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cancelamentos"
                  stroke="#007AFF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name="Cancelamentos reais"
                />
                <Line
                  type="monotone"
                  dataKey="previsao"
                  stroke="#FF9500"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4 }}
                  name="Previsões IA"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            <strong>Padrão detectado:</strong> Alunos com +3 faltas em 15 dias têm 78% de chance de cancelar
          </p>
        </Card>

        {/* Students at risk section */}
        <div>
          <h3 className="text-lg font-medium mb-4">Lista de Alunos Prioritários</h3>
          <div className="space-y-3">
            {alunosEmRisco.map((aluno) => (
              <Card 
                key={aluno.id} 
                className="overflow-hidden transition-all duration-300"
                onClick={() => toggleStudentDetails(aluno.id)}
              >
                <div className="p-4 cursor-pointer hover:bg-muted/30">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={aluno.foto} 
                      alt={aluno.nome} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{aluno.nome}</h4>
                      <div className="flex items-center mt-1">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${aluno.risco}%`,
                              background: `linear-gradient(90deg, #4ade80 0%, #facc15 50%, #f87171 100%)`
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium">{aluno.risco}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {renderPatternIcon(aluno.padrao)}
                      <span className="text-xs text-muted-foreground">
                        {aluno.padrao === 'frequencia' ? 'Frequência baixa' : 
                         aluno.padrao === 'pagamento' ? 'Pagamento' : 'Feedback negativo'}
                      </span>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {expandedStudent === aluno.id && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      <p className="text-sm mb-4">{aluno.razao}</p>
                      <div className="flex space-x-3">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSendMessage(aluno.id, aluno.nome);
                          }}
                          size="sm"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Enviar mensagem
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOfferDiscount(aluno.id, aluno.nome);
                          }}
                          size="sm"
                        >
                          Oferecer desconto
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom control panel */}
        <div className="fixed bottom-6 right-6 flex space-x-3">
          <Button 
            className="h-12 w-12 rounded-full shadow-lg"
            onClick={() => {
              toast({
                title: "Padrões Detectados",
                description: "Analisando padrões de comportamento...",
              });
            }}
          >
            <span className="sr-only">Padrões Detectados</span>
            <TrendingDown className="h-5 w-5" />
          </Button>
          <Button 
            variant="secondary"
            className="h-12 w-12 rounded-full shadow-lg"
            onClick={() => {
              toast({
                title: "Ajustar Sensibilidade",
                description: "Configure os parâmetros da IA de previsão",
              });
            }}
          >
            <span className="sr-only">Ajustar Sensibilidade</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </Button>
          <Button 
            variant="secondary"
            className="h-12 w-12 rounded-full shadow-lg"
            onClick={() => {
              toast({
                title: "Exportar Relatório",
                description: "Seu relatório está sendo preparado para download",
              });
              setTimeout(() => {
                toast({
                  title: "Relatório Pronto",
                  description: "Relatório de Previsão de Evasão.pdf",
                });
              }, 2000);
            }}
          >
            <span className="sr-only">Exportar Previsões</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-lg shadow-lg">
        <p className="font-medium">{label}</p>
        {payload[0].value !== null && (
          <p className="text-[#007AFF]">
            Cancelamentos: {payload[0].value}
          </p>
        )}
        <p className="text-[#FF9500]">
          Previsão: {payload[1].value}
        </p>
      </div>
    );
  }

  return null;
};

export default PrevisaoEvasao;
