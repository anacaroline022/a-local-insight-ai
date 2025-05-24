
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { 
  Users, 
  DollarSign, 
  UserPlus, 
  TrendingUp,
  Edit3,
  RefreshCw,
  BarChart3,
  Activity,
  Zap,
  Target,
  Heart,
  Trophy,
  Plus,
  Home,
  Settings,
  Bell
} from 'lucide-react';

// Real-time mock data with animations
const generateRealtimeData = () => ({
  activeMembersToday: Math.floor(Math.random() * 30) + 70,
  monthlyRevenue: Math.floor(Math.random() * 10000) + 35000,
  equipmentStatus: Math.floor(Math.random() * 10) + 90,
  newCheckins: Math.floor(Math.random() * 5) + 12,
  satisfaction: Math.floor(Math.random() * 20) + 80
});

const checkinsData = [
  { time: '06:00', value: 15, peak: false },
  { time: '08:00', value: 45, peak: true },
  { time: '10:00', value: 28, peak: false },
  { time: '12:00', value: 52, peak: true },
  { time: '14:00', value: 31, peak: false },
  { time: '16:00', value: 38, peak: false },
  { time: '18:00', value: 67, peak: true },
  { time: '20:00', value: 41, peak: false },
];

const planDistribution = [
  { name: 'Premium', value: 40, color: '#007AFF' },
  { name: 'Standard', value: 35, color: '#34C759' },
  { name: 'VIP', value: 25, color: '#FF9500' }
];

const equipmentStatus = [
  { name: 'Esteiras', status: 'available', count: 8, total: 10 },
  { name: 'Bicicletas', status: 'busy', count: 6, total: 8 },
  { name: 'Pesos Livres', status: 'maintenance', count: 12, total: 15 },
  { name: 'Máquinas', status: 'available', count: 18, total: 20 }
];

const recentActivities = [
  { id: 1, type: 'member', text: 'Nova matrícula: Ana Silva - Plano Premium', time: '2 min atrás', priority: 'high' },
  { id: 2, type: 'equipment', text: 'Manutenção concluída: Esteira #3', time: '5 min atrás', priority: 'medium' },
  { id: 3, type: 'financial', text: 'Pagamento recebido: R$ 180,00', time: '8 min atrás', priority: 'high' },
  { id: 4, type: 'member', text: 'Check-in: João Santos', time: '12 min atrás', priority: 'low' }
];

const Perfil: React.FC = () => {
  const { toast } = useToast();
  const [realtimeStats, setRealtimeStats] = useState(generateRealtimeData());
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState('checkins');

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeStats(generateRealtimeData());
      setLastUpdate(new Date());
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Simulate network status
  useEffect(() => {
    const statusInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 30000);

    return () => clearInterval(statusInterval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#34C759';
      case 'busy': return '#FF9500';
      case 'maintenance': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const handleQuickAction = (action: string) => {
    toast({
      title: "Ação Executada",
      description: `${action} realizada com sucesso`,
      className: "bg-black text-white border-none",
    });
  };

  const handleSyncAll = () => {
    setRealtimeStats(generateRealtimeData());
    setLastUpdate(new Date());
    toast({
      title: "Sincronização Completa",
      description: "Todos os dados foram atualizados",
      className: "bg-blue-600 text-white border-none",
    });
  };

  return (
    <MainLayout
      pageTitle="Command Your Empire"
      pageSubtitle="Every rep, every member, every detail."
      headerImage="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2000&auto=format&fit=crop"
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        
        {/* Status Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ scale: isOnline ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
              className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
            />
            <span className="text-sm text-gray-600">
              Academia {isOnline ? 'Online' : 'Offline'} • Última atualização: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSyncAll}
            className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="h-5 w-5 text-blue-600" />
            </motion.div>
          </motion.button>
        </div>

        {/* Real-time Metrics Grid */}
        <div className="grid grid-cols-4 gap-6">
          {[
            {
              label: 'Membros Ativos Hoje',
              value: realtimeStats.activeMembersToday,
              icon: Users,
              color: 'bg-blue-500',
              trend: '+12%'
            },
            {
              label: 'Receita do Mês',
              value: `R$ ${realtimeStats.monthlyRevenue.toLocaleString()}`,
              icon: DollarSign,
              color: 'bg-green-500',
              trend: '+8%'
            },
            {
              label: 'Equipamentos OK',
              value: `${realtimeStats.equipmentStatus}%`,
              icon: Activity,
              color: 'bg-orange-500',
              trend: '+2%'
            },
            {
              label: 'Check-ins Hoje',
              value: realtimeStats.newCheckins,
              icon: Target,
              color: 'bg-purple-500',
              trend: '+15%'
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <motion.p
                    key={metric.value}
                    initial={{ scale: 1.2, color: '#007AFF' }}
                    animate={{ scale: 1, color: '#000000' }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-semibold"
                  >
                    {metric.value}
                  </motion.p>
                  <span className="text-xs text-green-600 font-medium">{metric.trend}</span>
                </div>
                <motion.div
                  animate={{ 
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.5
                  }}
                  className={`${metric.color} p-3 rounded-xl`}
                >
                  <metric.icon className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Charts Section */}
        <div className="grid grid-cols-2 gap-8">
          
          {/* Check-ins Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Check-ins de Hoje</h3>
              <div className="flex space-x-2">
                {['checkins', 'revenue'].map((metric) => (
                  <button
                    key={metric}
                    onClick={() => setSelectedMetric(metric)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedMetric === metric
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {metric === 'checkins' ? 'Check-ins' : 'Receita'}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={checkinsData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#8E8E93' }}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#007AFF"
                  strokeWidth={3}
                  fill="url(#colorGradient)"
                  dot={{ fill: '#007AFF', strokeWidth: 2, r: 4 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Plan Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <h3 className="text-lg font-semibold mb-6">Distribuição de Planos</h3>
            
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={planDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {planDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex justify-center space-x-4 mt-4">
              {planDistribution.map((plan) => (
                <div key={plan.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: plan.color }}
                  />
                  <span className="text-sm text-gray-600">{plan.name}</span>
                  <span className="text-sm font-medium">{plan.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Equipment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-6">Status dos Equipamentos (Tempo Real)</h3>
          
          <div className="grid grid-cols-4 gap-4">
            {equipmentStatus.map((equipment, index) => (
              <motion.div
                key={equipment.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl border-2 transition-all cursor-pointer"
                style={{ borderColor: getStatusColor(equipment.status) }}
                onClick={() => handleQuickAction(`Verificar ${equipment.name}`)}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <motion.div
                    animate={{ 
                      backgroundColor: getStatusColor(equipment.status),
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-3 h-3 rounded-full"
                  />
                  <span className="font-medium">{equipment.name}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {equipment.count}/{equipment.total} disponíveis
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <h3 className="text-lg font-semibold mb-6">Atividades Recentes</h3>
          
          <div className="space-y-3">
            <AnimatePresence>
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, backgroundColor: '#f8f9fa' }}
                  className="flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer"
                  onClick={() => handleQuickAction(`Detalhes: ${activity.text}`)}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ 
                        scale: activity.priority === 'high' ? [1, 1.3, 1] : 1
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className={`w-2 h-2 rounded-full ${
                        activity.priority === 'high' ? 'bg-red-500' :
                        activity.priority === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                    />
                    <span className="text-sm">{activity.text}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 space-y-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleQuickAction('Menu de Ações Rápidas')}
            className="w-14 h-14 bg-black rounded-full shadow-lg flex items-center justify-center text-white"
          >
            <Plus className="h-6 w-6" />
          </motion.button>
        </div>

        {/* Bottom Dock */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4"
        >
          <div className="max-w-7xl mx-auto flex justify-center space-x-12">
            {[
              { icon: Home, label: 'Home', active: true },
              { icon: BarChart3, label: 'Analytics', active: false },
              { icon: Users, label: 'Membros', active: false },
              { icon: Settings, label: 'Configurações', active: false }
            ].map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuickAction(item.label)}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                  item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-black'
                }`}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Spacer for fixed bottom dock */}
        <div className="h-20" />
      </div>
    </MainLayout>
  );
};

export default Perfil;
