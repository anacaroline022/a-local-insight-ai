
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  CreditCard, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Download,
  Zap,
  Shield,
  Smartphone,
  Search,
  Filter,
  Bell,
  Receipt,
  MessageCircle,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Tooltip
} from 'recharts';

// Dados de pagamentos em tempo real
const generateRealtimePaymentData = () => ({
  totalReceived: Math.floor(Math.random() * 5000) + 25000,
  totalPending: Math.floor(Math.random() * 2000) + 3000,
  canceledCount: Math.floor(Math.random() * 3) + 2,
  nextWeekPrediction: Math.floor(Math.random() * 1000) + 8000,
  successRate: Math.floor(Math.random() * 10) + 90
});

// Dados de exemplo para gráficos
const revenueData = [
  { month: 'Jan', received: 22000, pending: 3000, predicted: 25000 },
  { month: 'Fev', received: 24000, pending: 2800, predicted: 27000 },
  { month: 'Mar', received: 26000, pending: 3200, predicted: 29000 },
  { month: 'Abr', received: 25000, pending: 3500, predicted: 28500 },
  { month: 'Mai', received: 28000, pending: 3000, predicted: 31000 },
  { month: 'Jun', received: 30000, pending: 2500, predicted: 32500 }
];

const paymentMethodsData = [
  { name: 'PIX', value: 45, color: '#00FF88' },
  { name: 'Cartão', value: 35, color: '#007AFF' },
  { name: 'Boleto', value: 15, color: '#FF9500' },
  { name: 'Dinheiro', value: 5, color: '#FF3B30' }
];

const paymentsData = [
  {
    id: 1,
    name: 'Ana Silva',
    photo: 'https://i.pravatar.cc/150?img=1',
    amount: 120,
    dueDate: '2024-05-20',
    status: 'paid',
    plan: 'Premium',
    paymentMethod: 'PIX'
  },
  {
    id: 2,
    name: 'Carlos Oliveira',
    photo: 'https://i.pravatar.cc/150?img=2',
    amount: 150,
    dueDate: '2024-05-22',
    status: 'overdue',
    plan: 'VIP',
    paymentMethod: 'Cartão'
  },
  {
    id: 3,
    name: 'Marta Rocha',
    photo: 'https://i.pravatar.cc/150?img=3',
    amount: 90,
    dueDate: '2024-05-25',
    status: 'pending',
    plan: 'Basic',
    paymentMethod: 'Boleto'
  },
  {
    id: 4,
    name: 'João Santos',
    photo: 'https://i.pravatar.cc/150?img=4',
    amount: 180,
    dueDate: '2024-05-28',
    status: 'pending',
    plan: 'Premium',
    paymentMethod: 'PIX'
  },
  {
    id: 5,
    name: 'Lucia Mendes',
    photo: 'https://i.pravatar.cc/150?img=5',
    amount: 200,
    dueDate: '2024-05-30',
    status: 'paid',
    plan: 'VIP',
    paymentMethod: 'Cartão'
  }
];

const Pagamentos: React.FC = () => {
  const { toast } = useToast();
  const [realtimeData, setRealtimeData] = useState(generateRealtimePaymentData());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Atualização em tempo real dos dados
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(generateRealtimePaymentData());
      setLastUpdate(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(value);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500/20 text-green-500 border-green-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-500 border-red-500/30';
      case 'pending': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-500 border-gray-500/30';
    }
  };

  const handleQuickAction = (action: string, paymentId?: number) => {
    toast({
      title: "Ação Executada",
      description: `${action} ${paymentId ? `para pagamento #${paymentId}` : ''} realizada com sucesso`,
      className: "bg-black text-white border-none",
    });
  };

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || payment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <MainLayout
      pageTitle="Financial Command Center"
      pageSubtitle="Every transaction, every insight, perfect control."
      headerImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000&auto=format&fit=crop"
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Status Header Premium */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
            >
              <Activity className="h-4 w-4 text-white" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Fluxo Financeiro: {formatCurrency(realtimeData.totalReceived)}/mês
              </h2>
              <p className="text-sm text-gray-400">
                Última atualização: {lastUpdate.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRealtimeData(generateRealtimePaymentData())}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Download className="h-5 w-5 text-white" />
          </motion.button>
        </div>

        {/* Cards de Visão Financeira */}
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              title: 'Recebidos',
              value: formatCurrency(realtimeData.totalReceived),
              percentage: '+12%',
              icon: CheckCircle,
              color: 'bg-green-500',
              bgColor: 'bg-green-500/10'
            },
            {
              title: 'Pendentes',
              value: formatCurrency(realtimeData.totalPending),
              percentage: '7 clientes',
              icon: Clock,
              color: 'bg-orange-500',
              bgColor: 'bg-orange-500/10'
            },
            {
              title: 'Cancelamentos',
              value: `${realtimeData.canceledCount} (R$ 900)`,
              percentage: '⚠️ 1 reincidente',
              icon: AlertTriangle,
              color: 'bg-red-500',
              bgColor: 'bg-red-500/10'
            },
            {
              title: 'Previsão IA',
              value: formatCurrency(realtimeData.nextWeekPrediction),
              percentage: `${realtimeData.successRate}% de probabilidade`,
              icon: TrendingUp,
              color: 'bg-blue-500',
              bgColor: 'bg-blue-500/10'
            }
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${card.bgColor} rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm text-gray-400 font-medium">{card.title}</h3>
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className={`${card.color} p-2 rounded-xl`}
                >
                  <card.icon className="h-5 w-5 text-white" />
                </motion.div>
              </div>
              
              <motion.div
                key={card.value}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-white mb-1"
              >
                {card.value}
              </motion.div>
              
              <p className="text-xs text-gray-400">{card.percentage}</p>
            </motion.div>
          ))}
        </div>

        {/* Gráficos Dinâmicos */}
        <div className="grid grid-cols-3 gap-8">
          
          {/* Gráfico de Receita */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-2 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Evolução Financeira</h3>
              <div className="flex space-x-2">
                {['6M', '1A', 'Tudo'].map((period) => (
                  <button
                    key={period}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF88" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FF88" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="pendingGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9500" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF9500" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8E8E93' }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: 'white'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="received"
                  stroke="#00FF88"
                  strokeWidth={3}
                  fill="url(#receivedGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#FF9500"
                  strokeWidth={2}
                  fill="url(#pendingGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#007AFF"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Métodos de Pagamento */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Métodos de Pagamento</h3>
            
            <div className="flex justify-center mb-4">
              <ResponsiveContainer width="100%" height={150}>
                <RechartsPieChart>
                  <Pie
                    data={paymentMethodsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentMethodsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-3">
              {paymentMethodsData.map((method) => (
                <div key={method.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: method.color }}
                    />
                    <span className="text-sm text-white">{method.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{method.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Barra de Pesquisa e Filtros */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Buscar por cliente..." 
                className="bg-white/10 border-white/20 pl-10 text-white placeholder:text-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2">
              {[
                { key: 'all', label: 'Todos' },
                { key: 'paid', label: 'Pagos' },
                { key: 'pending', label: 'Pendentes' },
                { key: 'overdue', label: 'Atrasados' }
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedFilter === filter.key
                      ? 'bg-white text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleQuickAction('Relatório gerado')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Relatório
            </Button>
            <Button 
              size="sm"
              onClick={() => handleQuickAction('Novo pagamento criado')}
              className="bg-white text-black hover:bg-gray-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Pagamento
            </Button>
          </div>
        </div>

        {/* Lista de Pagamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Pagamentos</h3>
            
            <div className="space-y-3">
              <AnimatePresence>
                {filteredPayments.map((payment, index) => (
                  <motion.div
                    key={payment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer"
                    onClick={() => handleQuickAction('Detalhes visualizados', payment.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border border-white/20">
                        <AvatarImage src={payment.photo} alt={payment.name} />
                        <AvatarFallback>{payment.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-white">{payment.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {payment.plan}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-400">
                            Venc: {formatDate(payment.dueDate)}
                          </span>
                          <span className="text-sm text-gray-400">
                            {payment.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-white">
                          {formatCurrency(payment.amount)}
                        </div>
                        <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full border ${getStatusColor(payment.status)}`}>
                          {getStatusIcon(payment.status)}
                          <span>
                            {payment.status === 'paid' ? 'Pago' : 
                             payment.status === 'overdue' ? 'Atrasado' : 'Pendente'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {payment.status !== 'paid' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAction('Notificação enviada', payment.id);
                              }}
                              className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
                            >
                              <Bell className="h-4 w-4 text-blue-400" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAction('Cobrança via WhatsApp', payment.id);
                              }}
                              className="p-2 rounded-full bg-green-500/20 hover:bg-green-500/30 transition-colors"
                            >
                              <MessageCircle className="h-4 w-4 text-green-400" />
                            </motion.button>
                          </>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickAction('Recibo gerado', payment.id);
                          }}
                          className="p-2 rounded-full bg-gray-500/20 hover:bg-gray-500/30 transition-colors"
                        >
                          <Receipt className="h-4 w-4 text-gray-400" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 space-y-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleQuickAction('Cobrança automática configurada')}
            className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white"
          >
            <Zap className="h-6 w-6" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleQuickAction('PIX instantâneo enviado')}
            className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg flex items-center justify-center text-white"
          >
            <Smartphone className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Rodapé de Segurança */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-300">Criptografia PCI Nível 1</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-400" />
              <span className="text-sm text-gray-300">Integrado com PagBank e Mercado Pago</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-400" />
              <span className="text-sm text-gray-300">Reconciliação automática</span>
            </div>
          </div>
        </motion.div>

        {/* Spacer para floating buttons */}
        <div className="h-32" />
      </div>
    </MainLayout>
  );
};

export default Pagamentos;
