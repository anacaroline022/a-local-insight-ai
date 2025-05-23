
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Play, 
  Stop, 
  AlertTriangle, 
  Download, 
  History, 
  Plus,
  Clock,
  Users,
  Activity,
  Dumbbell,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';

const scheduleData = [
  { day: 'Seg', time: '06:00', activity: 'Spinning', room: 'Sala A', participants: 12, status: 'active' },
  { day: 'Seg', time: '08:00', activity: 'Yoga', room: 'Sala B', participants: 8, status: 'active' },
  { day: 'Ter', time: '07:00', activity: 'HIIT', room: 'Sala A', participants: 15, status: 'scheduled' },
  { day: 'Qua', time: '19:00', activity: 'Boxe', room: 'Sala C', participants: 10, status: 'active' },
  { day: 'Qui', time: '18:00', activity: 'Crossfit', room: 'Sala A', participants: 20, status: 'scheduled' },
];

const equipmentStatus = [
  { name: 'Esteira #1', status: 'operational', usage: '5/8' },
  { name: 'Esteira #2', status: 'maintenance', usage: '0/8' },
  { name: 'Bike #1', status: 'operational', usage: '3/6' },
  { name: 'Halteres', status: 'operational', usage: '12/20' },
  { name: 'Cabo de Força', status: 'partial', usage: '2/4' },
];

const recentCheckIns = [
  { name: 'Maria Silva', time: '14:30', activity: 'Spinning' },
  { name: 'João Santos', time: '14:25', activity: 'Musculação' },
  { name: 'Ana Costa', time: '14:20', activity: 'Yoga' },
  { name: 'Carlos Lima', time: '14:15', activity: 'HIIT' },
];

const Atividades: React.FC = () => {
  const { toast } = useToast();
  const [activeClasses, setActiveClasses] = useState(3);
  const [totalCheckIns, setTotalCheckIns] = useState(45);
  const [systemStatus, setSystemStatus] = useState('online');

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveClasses(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1));
      setTotalCheckIns(prev => prev + Math.floor(Math.random() * 2));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleAction = (action: string) => {
    const messages = {
      'iniciar-aula': 'Aula iniciada com sucesso!',
      'encerrar-tudo': 'Todas as atividades foram encerradas!',
      'emergencia': 'Protocolo de emergência ativado!',
      'exportar-dados': 'Dados exportados com sucesso!',
      'historico': 'Histórico carregado!',
      'nova-atividade': 'Nova atividade criada!'
    };
    
    toast({
      title: messages[action] || `${action} executado!`,
      description: `Ação "${action}" realizada com sucesso.`,
      className: action === 'emergencia' ? "bg-red-500 text-white border-none" : "bg-green-500 text-white border-none",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400';
      case 'maintenance': return 'text-red-400';
      case 'partial': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <XCircle className="w-4 h-4" />;
      case 'partial': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <MainLayout pageTitle="Atividades ao Vivo" pageSubtitle="Monitoramento em tempo real da academia">
      {/* Header with retro gym image */}
      <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            filter: 'contrast(120%) hue-rotate(-10deg)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <motion.h1 
            className="text-4xl font-bold mb-2"
            style={{ 
              fontFamily: 'Monaco, "Lucida Console", monospace',
              textShadow: '2px 2px 0px #000000',
              color: '#00BFFF'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            ATIVIDADES AO VIVO
          </motion.h1>
          <motion.p 
            className="text-xl font-bold"
            style={{ 
              fontFamily: 'Monaco, "Lucida Console", monospace',
              color: '#32CD32'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Sistema Online • {new Date().toLocaleTimeString()}
          </motion.p>
        </div>
      </div>

      {/* Real-time Statistics */}
      <div className="grid grid-cols-3 gap-8 mb-8 p-6 bg-black rounded-xl border border-green-400">
        <motion.div 
          className="text-center"
          style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-4xl font-bold mb-2"
            style={{ color: '#FF0000' }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {activeClasses}
          </motion.div>
          <div className="text-sm text-green-400 uppercase tracking-wide">Aulas em Andamento</div>
          <div className="text-xs text-gray-400 mt-1">
            {scheduleData.filter(s => s.status === 'active').map(s => `${s.activity} (${s.room})`).join(' | ')}
          </div>
        </motion.div>

        <motion.div 
          className="text-center border-l border-r border-green-400"
          style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-4xl font-bold text-green-400 mb-2">{totalCheckIns}</div>
          <div className="text-sm text-green-400 uppercase tracking-wide">Check-ins Hoje</div>
          <div className="flex justify-center items-center mt-2">
            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-green-400"
                initial={{ width: '0%' }}
                animate={{ width: '75%' }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}
          whileHover={{ scale: 1.05 }}
        >
          <div className="text-4xl font-bold text-yellow-400 mb-2">
            {equipmentStatus.filter(e => e.status === 'operational').length}/{equipmentStatus.length}
          </div>
          <div className="text-sm text-green-400 uppercase tracking-wide">Equipamentos OK</div>
          <div className="flex justify-center space-x-2 mt-2">
            {equipmentStatus.map((equipment, index) => (
              <div key={index} className={`w-3 h-3 rounded-full ${
                equipment.status === 'operational' ? 'bg-green-400' : 
                equipment.status === 'maintenance' ? 'bg-red-400' : 'bg-yellow-400'
              }`} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Interactive Schedule Grid */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-green-400" style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}>
          GRADE DE HORÁRIOS INTERATIVA
        </h3>
        <div className="bg-black p-6 rounded-xl border border-blue-500">
          <div className="grid grid-cols-8 gap-2" style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}>
            <div className="text-center font-bold text-blue-500 p-2">HORÁRIO</div>
            {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map(day => (
              <div key={day} className="text-center font-bold text-blue-500 p-2">{day}</div>
            ))}
            
            {['06:00', '08:00', '10:00', '18:00', '19:00', '20:00'].map(time => (
              <React.Fragment key={time}>
                <div className="text-green-400 p-2 text-center font-bold">{time}</div>
                {Array(7).fill(null).map((_, dayIndex) => {
                  const activity = scheduleData.find(s => s.time === time);
                  return (
                    <motion.div
                      key={dayIndex}
                      className={`p-2 text-center text-xs border border-gray-600 cursor-pointer ${
                        activity ? 'bg-purple-900 border-purple-500' : 'bg-gray-800'
                      }`}
                      whileHover={{ scale: 1.05, backgroundColor: activity ? '#4C1D95' : '#374151' }}
                      onClick={() => handleAction('editar-aula')}
                    >
                      {activity && dayIndex === 0 ? (
                        <>
                          <div className="font-bold text-purple-300">{activity.activity}</div>
                          <div className="text-gray-400">{activity.participants} alunos</div>
                        </>
                      ) : null}
                    </motion.div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Control Panel Actions */}
      <div className="grid grid-cols-6 gap-4 mb-8">
        {[
          { icon: Play, label: 'Iniciar Aula', action: 'iniciar-aula', color: 'bg-green-500' },
          { icon: Stop, label: 'Encerrar Tudo', action: 'encerrar-tudo', color: 'bg-red-500' },
          { icon: AlertTriangle, label: 'Emergência', action: 'emergencia', color: 'bg-yellow-500' },
          { icon: Download, label: 'Exportar Dados', action: 'exportar-dados', color: 'bg-blue-500' },
          { icon: History, label: 'Histórico', action: 'historico', color: 'bg-purple-500' },
          { icon: Plus, label: 'Nova Atividade', action: 'nova-atividade', color: 'bg-orange-500' }
        ].map((button, index) => {
          const Icon = button.icon;
          return (
            <motion.div
              key={button.action}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleAction(button.action)}
                className={`w-full h-20 ${button.color} text-white hover:opacity-80 transition-all duration-300 border-2 border-black`}
                style={{
                  fontFamily: 'Monaco, "Lucida Console", monospace',
                  boxShadow: '4px 4px 0px #000000'
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'translateY(2px)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px #000000';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '4px 4px 0px #000000';
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon size={20} />
                  <span className="text-xs leading-tight">{button.label}</span>
                </div>
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* Equipment Monitoring & Recent Activity */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Equipment Status */}
        <motion.div
          className="bg-black p-6 rounded-xl border border-silver-400"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-4 text-green-400" style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}>
            MONITORAMENTO DE EQUIPAMENTOS
          </h3>
          <div className="space-y-3">
            {equipmentStatus.map((equipment, index) => (
              <motion.div
                key={equipment.name}
                className="flex items-center justify-between p-3 bg-gray-900 border border-gray-700"
                style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}
                whileHover={{ backgroundColor: '#1F2937' }}
              >
                <div className="flex items-center space-x-3">
                  <div className={getStatusColor(equipment.status)}>
                    {getStatusIcon(equipment.status)}
                  </div>
                  <span className="text-green-400 text-sm">{equipment.name}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm ${getStatusColor(equipment.status)}`}>
                    {equipment.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-400">{equipment.usage}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Check-ins */}
        <motion.div
          className="bg-black p-6 rounded-xl border border-silver-400"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-bold mb-4 text-green-400" style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}>
            CHECK-INS RECENTES
          </h3>
          <div className="space-y-3">
            {recentCheckIns.map((checkIn, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-900 border border-gray-700"
                style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <div className="text-green-400 text-sm font-bold">{checkIn.name}</div>
                  <div className="text-xs text-gray-400">{checkIn.activity}</div>
                </div>
                <div className="text-yellow-400 text-sm">{checkIn.time}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* System Status Footer */}
      <div className="bg-gray-800 p-4 rounded-xl border border-gray-600">
        <div className="flex justify-between items-center" style={{ fontFamily: 'Monaco, "Lucida Console", monospace' }}>
          <div className="flex space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400">Sistema Sincronizado</span>
            </div>
            <div className="text-gray-400">
              🕒 Última Sync: {new Date().toLocaleTimeString()}
            </div>
            <div className="text-gray-400">
              📶 45 Dispositivos Conectados
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>🔋 Bateria: 78%</span>
            <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-green-400" />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Atividades;
