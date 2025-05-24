
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ScatterChart, Scatter
} from 'recharts';
import { 
  Play,
  Square,
  Save,
  PlusCircle,
  FileDown,
  Clock,
  ChevronRight,
  Users,
  TrendingUp,
  Settings,
  MessageSquare,
  BarChart3,
  Calendar,
  Zap,
  Star,
  Plus
} from 'lucide-react';

// Enhanced mock data with real-time updates
const programData = [
  {
    id: 1,
    name: 'HIIT Revolucionário',
    progress: 78,
    members: 23,
    maxMembers: 30,
    color: '#0A84FF',
    intensity: 9.2,
    retention: 94,
    revenue: 2340,
    calories: 480,
    satisfaction: 4.8,
    updates: [
      { date: '16:00', value: 23 },
      { date: '17:00', value: 26 },
      { date: '18:00', value: 29 },
      { date: '19:00', value: 23 },
      { date: '20:00', value: 25 },
      { date: '21:00', value: 22 },
      { date: '22:00', value: 18 },
    ]
  },
  {
    id: 2,
    name: 'Yoga Flow Premium',
    progress: 92,
    members: 18,
    maxMembers: 20,
    color: '#30D158',
    intensity: 6.5,
    retention: 88,
    revenue: 1980,
    calories: 220,
    satisfaction: 4.9,
    updates: [
      { date: '16:00', value: 15 },
      { date: '17:00', value: 18 },
      { date: '18:00', value: 20 },
      { date: '19:00', value: 19 },
      { date: '20:00', value: 17 },
      { date: '21:00', value: 16 },
      { date: '22:00', value: 14 },
    ]
  },
  {
    id: 3,
    name: 'Força Funcional Elite',
    progress: 65,
    members: 15,
    maxMembers: 18,
    color: '#FF6B00',
    intensity: 8.7,
    retention: 91,
    revenue: 2850,
    calories: 520,
    satisfaction: 4.7,
    updates: [
      { date: '16:00', value: 12 },
      { date: '17:00', value: 15 },
      { date: '18:00', value: 18 },
      { date: '19:00', value: 16 },
      { date: '20:00', value: 14 },
      { date: '21:00', value: 13 },
      { date: '22:00', value: 11 },
    ]
  },
  {
    id: 4,
    name: 'Cardio Tech',
    progress: 83,
    members: 28,
    maxMembers: 35,
    color: '#FF3B30',
    intensity: 7.8,
    retention: 85,
    revenue: 1750,
    calories: 380,
    satisfaction: 4.5,
    updates: [
      { date: '16:00', value: 25 },
      { date: '17:00', value: 30 },
      { date: '18:00', value: 35 },
      { date: '19:00', value: 32 },
      { date: '20:00', value: 28 },
      { date: '21:00', value: 24 },
      { date: '22:00', value: 20 },
    ]
  }
];

const scatterData = programData.map(program => ({
  x: program.intensity,
  y: program.retention,
  name: program.name,
  color: program.color,
  size: program.members
}));

const weeklySchedule = [
  { day: 'SEG', programs: [
    { name: 'HIIT', time: '06:00', color: '#0A84FF', participants: 23 },
    { name: 'Yoga', time: '07:30', color: '#30D158', participants: 18 },
    { name: 'Força', time: '19:00', color: '#FF6B00', participants: 15 }
  ]},
  { day: 'TER', programs: [
    { name: 'Cardio', time: '06:30', color: '#FF3B30', participants: 28 },
    { name: 'HIIT', time: '18:00', color: '#0A84FF', participants: 25 }
  ]},
  { day: 'QUA', programs: [
    { name: 'Yoga', time: '07:00', color: '#30D158', participants: 20 },
    { name: 'Força', time: '19:30', color: '#FF6B00', participants: 17 }
  ]},
  { day: 'QUI', programs: [
    { name: 'HIIT', time: '06:00', color: '#0A84FF', participants: 27 },
    { name: 'Cardio', time: '18:30', color: '#FF3B30', participants: 30 }
  ]},
  { day: 'SEX', programs: [
    { name: 'Todos', time: '07:00', color: '#8E8E93', participants: 45 }
  ]}
];

const Programas: React.FC = () => {
  const { toast } = useToast();
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [activeMetric, setActiveMetric] = useState('participants');
  const [isLive, setIsLive] = useState(true);

  const handleProgramAction = (action: string, programName?: string) => {
    const messages = {
      create: 'Novo programa criado com sucesso!',
      manage: `Abrindo dashboard de ${programName}`,
      preview: `Pré-visualizando ${programName}`,
      sync: 'Sincronizando com calendários externos...',
      analytics: 'Carregando analytics avançados...',
      communicate: 'Central de comunicação aberta'
    };
    
    toast({
      title: messages[action] || 'Ação executada!',
      className: "bg-black text-white border-none",
    });
  };

  const getIntensityColor = (intensity: number) => {
    if (intensity >= 9) return '#FF3B30';
    if (intensity >= 7) return '#FF6B00';
    if (intensity >= 5) return '#0A84FF';
    return '#30D158';
  };

  const [showCursor, setShowCursor] = useState(true);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout 
      pageTitle="Programas que Transformam Corpos. Dados que Transformam Negócios."
      pageSubtitle="Sistema inteligente de gestão de programas fitness"
    >
      {/* Header with Real Gym Image */}
      <div className="relative h-72 mb-8 rounded-2xl overflow-hidden shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <motion.h1 
            className="text-5xl font-semibold mb-3"
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Programas Ativos • {new Date().getFullYear()}
          </motion.h1>
          <motion.div 
            className="w-32 h-1 bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        
        {/* Floating Action Button */}
        <motion.button
          className="absolute top-8 right-8 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleProgramAction('create')}
        >
          <Plus className="h-6 w-6 text-black" />
        </motion.button>
      </div>

      {/* Featured Program (Live Dashboard) */}
      <motion.div
        className="bg-white rounded-3xl p-8 mb-8 shadow-lg border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">HIIT Revolucionário • Ao Vivo</h2>
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-red-500 rounded-full"
              />
              <span className="text-sm text-gray-600">23/30 participantes ativos</span>
              <span className="text-sm text-gray-600">480 kcal/h média</span>
            </div>
          </div>
          <Button
            onClick={() => handleProgramAction('manage', 'HIIT Revolucionário')}
            className="bg-black text-white hover:bg-gray-800"
          >
            Acessar Dashboard
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-4">Participação em Tempo Real</h3>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={programData[0].updates}>
                <defs>
                  <linearGradient id="participantsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A84FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0A84FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0A84FF"
                  strokeWidth={3}
                  fill="url(#participantsGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">4.8</div>
              <div className="flex justify-center space-x-1 mb-2">
                {[1,2,3,4,5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= 5 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">Satisfação Média</div>
            </div>
            
            <motion.div
              className="relative h-24"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Concluído', value: 78 },
                      { name: 'Restante', value: 22 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={40}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill="#0A84FF" />
                    <Cell fill="#F5F5F7" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-semibold">78%</span>
              </div>
            </motion.div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-4">Métricas de Desempenho</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Intensidade</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-red-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.5 }}
                    />
                  </div>
                  <span className="text-sm font-medium">9.2</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Retenção</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-green-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                    />
                  </div>
                  <span className="text-sm font-medium">94%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Receita/Mês</span>
                <span className="text-sm font-semibold">R$ 2.340</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active Programs Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {programData.slice(1).map((program, index) => (
          <motion.div
            key={program.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
            onClick={() => setSelectedProgram(program.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-lg mb-1">{program.name}</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">{program.members}/{program.maxMembers} membros</span>
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: getIntensityColor(program.intensity) }}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProgramAction('manage', program.name);
                }}
              >
                Gerenciar
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span className="font-medium">{program.progress}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: program.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${program.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div>
                  <div className="font-medium">{program.calories}</div>
                  <div>kcal/h</div>
                </div>
                <div>
                  <div className="font-medium">{program.satisfaction}★</div>
                  <div>satisfação</div>
                </div>
                <div>
                  <div className="font-medium">R$ {program.revenue}</div>
                  <div>receita</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Schedule */}
      <motion.div
        className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Calendário Semanal</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProgramAction('sync')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Sincronizar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleProgramAction('create')}
            >
              Criar Evento
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {weeklySchedule.map((day, dayIndex) => (
            <div key={day.day} className="space-y-2">
              <div className="text-sm font-medium text-gray-600 text-center">{day.day}</div>
              {day.programs.map((program, programIndex) => (
                <motion.div
                  key={`${day.day}-${programIndex}`}
                  className="p-3 rounded-lg text-white text-xs cursor-pointer"
                  style={{ backgroundColor: program.color }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: dayIndex * 0.1 + programIndex * 0.05 }}
                >
                  <div className="font-medium">{program.name}</div>
                  <div className="opacity-90">{program.time}</div>
                  <div className="opacity-75">{program.participants} pessoas</div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Scatter Plot */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4">Intensidade vs. Retenção</h3>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <XAxis 
                dataKey="x" 
                name="Intensidade" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                dataKey="y" 
                name="Retenção %" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <Scatter 
                data={scatterData} 
                fill="#0A84FF"
              >
                {scatterData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Real-time Stats */}
        <motion.div
          className="bg-black rounded-2xl p-6 text-white"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-4 text-green-400">Stats • Tempo Real</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Programas Ativos</span>
              <motion.span
                key={programData.length}
                initial={{ scale: 1.2, color: '#30D158' }}
                animate={{ scale: 1, color: '#FFFFFF' }}
                className="text-2xl font-bold"
              >
                {programData.length}
              </motion.span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Receita Total/Mês</span>
              <span className="text-xl font-bold">
                R$ {programData.reduce((acc, p) => acc + p.revenue, 0).toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span>Participantes Ativos</span>
              <span className="text-xl font-bold">
                {programData.reduce((acc, p) => acc + p.members, 0)}
              </span>
            </div>

            <div>
              <span className="text-sm text-gray-400">Sistema Online</span>
              <div className="flex items-center mt-1">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full mr-2"
                />
                <span className="text-sm">Todos os serviços operacionais</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fixed Bottom Dock */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4"
      >
        <div className="max-w-7xl mx-auto flex justify-center space-x-12">
          {[
            { icon: BarChart3, label: 'Analytics', action: 'analytics' },
            { icon: MessageSquare, label: 'Comunicar', action: 'communicate' },
            { icon: Calendar, label: 'Calendário', action: 'sync' },
            { icon: Settings, label: 'Configurações', action: 'settings' }
          ].map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleProgramAction(item.action)}
              className="flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors text-gray-600 hover:text-black"
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Spacer for fixed dock */}
      <div className="h-20" />
    </MainLayout>
  );
};

export default Programas;
