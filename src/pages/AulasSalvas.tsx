
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Trophy, 
  Trash2, 
  Info, 
  Edit, 
  Share2, 
  Search,
  Check 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types for data
interface Aula {
  id: string;
  nome: string;
  horario: string;
  instrutor: string;
  duracao: string;
  nivel: string;
  tipo: string;
  concluida: boolean;
}

interface Conquista {
  id: string;
  titulo: string;
  progresso: number;
  total: number;
  desbloqueada: boolean;
}

const AulasSalvas = () => {
  // States
  const [currentTab, setCurrentTab] = useState<'aulas' | 'conquistas'>('aulas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('hoje');
  const [aulas, setAulas] = useState<Aula[]>([
    {
      id: '1',
      nome: 'HIIT com Pesos',
      horario: '08:00',
      instrutor: 'Carla',
      duracao: '45 min',
      nivel: 'Avançado',
      tipo: 'Força',
      concluida: false
    },
    {
      id: '2',
      nome: 'Yoga Flow',
      horario: '10:30',
      instrutor: 'Paulo',
      duracao: '60 min',
      nivel: 'Intermediário',
      tipo: 'Flexibilidade',
      concluida: false
    },
    {
      id: '3',
      nome: 'Spinning Express',
      horario: '17:45',
      instrutor: 'Amanda',
      duracao: '30 min',
      nivel: 'Todos',
      tipo: 'Cardio',
      concluida: true
    },
    {
      id: '4',
      nome: 'Boxe Funcional',
      horario: '19:00',
      instrutor: 'Roberto',
      duracao: '50 min',
      nivel: 'Intermediário',
      tipo: 'Força',
      concluida: false
    },
    {
      id: '5',
      nome: 'Pilates',
      horario: '07:15',
      instrutor: 'Mariana',
      duracao: '45 min',
      nivel: 'Iniciante',
      tipo: 'Core',
      concluida: false
    }
  ]);
  
  const [conquistas, setConquistas] = useState<Conquista[]>([
    { id: '1', titulo: '5 Aulas', progresso: 5, total: 5, desbloqueada: true },
    { id: '2', titulo: '10 Aulas', progresso: 5, total: 10, desbloqueada: false },
    { id: '3', titulo: '30 Dias', progresso: 15, total: 30, desbloqueada: false },
    { id: '4', titulo: 'CrossTraining', progresso: 2, total: 5, desbloqueada: false },
    { id: '5', titulo: 'Madrugador', progresso: 3, total: 5, desbloqueada: false },
    { id: '6', titulo: 'Sem Faltas', progresso: 2, total: 4, desbloqueada: false }
  ]);

  // Handlers
  const handleToggleComplete = (id: string) => {
    setAulas(prevAulas => 
      prevAulas.map(aula => 
        aula.id === id ? { ...aula, concluida: !aula.concluida } : aula
      )
    );
    
    toast({
      title: "Status da aula atualizado",
      description: "A aula foi marcada como concluída."
    });
  };
  
  const handleDeleteAula = (id: string) => {
    setAulas(prevAulas => prevAulas.filter(aula => aula.id !== id));
    
    toast({
      title: "Aula removida",
      description: "A aula foi removida com sucesso."
    });
  };
  
  const handleSelectAllConquistas = () => {
    const desbloqueadas = conquistas.filter(c => c.desbloqueada);
    
    if (desbloqueadas.length > 0) {
      toast({
        title: `${desbloqueadas.length} conquistas selecionadas`,
        description: "Você pode compartilhá-las agora."
      });
    } else {
      toast({
        title: "Nenhuma conquista desbloqueada",
        description: "Continue progredindo para desbloquear conquistas."
      });
    }
  };
  
  // Derived state
  const aulasConcluidas = aulas.filter(a => a.concluida).length;
  const totalAulas = aulas.length;
  const totalConquistasDesbloqueadas = conquistas.filter(c => c.desbloqueada).length;
  const porcentagemConquistas = Math.round((totalConquistasDesbloqueadas / conquistas.length) * 100);
  
  // Filter aulas
  const filteredAulas = aulas.filter(aula => 
    aula.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aula.instrutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aula.tipo.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Date options
  const dateOptions = [
    { label: 'Hoje', value: 'hoje' },
    { label: 'Seg 12', value: 'seg12' },
    { label: 'Ter 13', value: 'ter13' },
    { label: 'Qua 14', value: 'qua14' },
    { label: 'Qui 15', value: 'qui15' },
    { label: 'Sex 16', value: 'sex16' }
  ];

  return (
    <MainLayout
      pageTitle="Treinos"
      pageSubtitle="Acompanhe e gerencie todas as aulas salvas"
      headerImage="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    >
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Segment Control */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <Tabs defaultValue="aulas" className="w-full">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger 
                value="aulas" 
                onClick={() => setCurrentTab('aulas')}
                className="data-[state=active]:bg-academy-purple data-[state=active]:text-white"
              >
                Aulas Salvas
              </TabsTrigger>
              <TabsTrigger 
                value="conquistas" 
                onClick={() => setCurrentTab('conquistas')}
                className="data-[state=active]:bg-academy-purple data-[state=active]:text-white"
              >
                Conquistas
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Banner */}
        <motion.div 
          className="relative h-48 mb-6 rounded-lg overflow-hidden"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" 
            alt="Academia"
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
            <motion.h3 
              className="text-white text-xl font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {currentTab === 'aulas' ? 'Controle Total, Resultados Reais' : 'Conquiste Seus Objetivos'}
            </motion.h3>
            
            {currentTab === 'aulas' && (
              <motion.div 
                className="mt-2 text-white/80 flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="font-medium">{aulasConcluidas}/{totalAulas} concluídas</span>
                <div className="w-32 bg-white/30 h-1 mx-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white transition-all duration-500" 
                    style={{ width: `${(aulasConcluidas / totalAulas) * 100}%` }} 
                  />
                </div>
                <span>{Math.round((aulasConcluidas / totalAulas) * 100)}%</span>
              </motion.div>
            )}
            
            {currentTab === 'conquistas' && (
              <motion.div 
                className="mt-2 text-white/80 flex items-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <span className="font-medium">{totalConquistasDesbloqueadas}/{conquistas.length} conquistadas</span>
                <Progress value={porcentagemConquistas} className="w-32 mx-2 h-1 bg-white/30" />
                <span>{porcentagemConquistas}%</span>
              </motion.div>
            )}
          </div>
        </motion.div>
  
        {/* Aulas Section */}
        <AnimatePresence mode="wait">
          {currentTab === 'aulas' && (
            <motion.div
              key="aulas"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Search and Date Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder={`Buscar em ${aulas.length} aulas...`}
                    className="pl-10 pr-4 py-2 w-full rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-academy-purple focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex overflow-x-auto whitespace-nowrap pb-1 gap-2">
                  {dateOptions.map((date) => (
                    <Button 
                      key={date.value}
                      variant="ghost"
                      className={cn(
                        "rounded-full px-4",
                        selectedDate === date.value 
                          ? "bg-academy-purple text-white" 
                          : "text-muted-foreground hover:bg-muted"
                      )}
                      onClick={() => setSelectedDate(date.value)}
                    >
                      {date.label}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Aulas List */}
              <div className="space-y-2">
                <AnimatePresence>
                  {filteredAulas.length > 0 ? (
                    filteredAulas.map((aula) => (
                      <motion.div
                        key={aula.id}
                        className={cn(
                          "flex items-center border-b border-border p-4 last:border-0 rounded-lg transition-all",
                          aula.concluida ? "bg-slate-50" : "bg-white"
                        )}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.01)' }}
                      >
                        {/* Checkbox */}
                        <div 
                          className="mr-4 cursor-pointer" 
                          onClick={() => handleToggleComplete(aula.id)}
                        >
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                            aula.concluida 
                              ? "border-academy-purple bg-academy-purple text-white" 
                              : "border-gray-300"
                          )}>
                            {aula.concluida && <Check className="w-4 h-4" />}
                          </div>
                        </div>
                        
                        {/* Aula Details */}
                        <div className="flex-1">
                          <h3 className={cn(
                            "text-base font-medium",
                            aula.concluida && "line-through text-muted-foreground"
                          )}>
                            {aula.nome}
                          </h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            <span className="text-sm text-muted-foreground">
                              {aula.horario} • Instr. {aula.instrutor}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {aula.duracao} • Nível: {aula.nivel}
                            </span>
                            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              {aula.tipo}
                            </span>
                          </div>
                        </div>
                        
                        {/* Action Icons */}
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toast({
                              title: "Editar aula",
                              description: `Editando ${aula.nome}`
                            })}
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteAula(aula.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => toast({
                              title: "Compartilhar aula",
                              description: `Compartilhando ${aula.nome}`
                            })}
                          >
                            <Share2 className="w-4 h-4 text-blue-500" />
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      className="text-center py-8 text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      Nenhuma aula encontrada
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        
          {/* Conquistas Section */}
          {currentTab === 'conquistas' && (
            <motion.div
              key="conquistas"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header with Select All button */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Suas Conquistas</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleSelectAllConquistas}
                  className="flex items-center gap-1"
                >
                  <Check className="w-4 h-4" />
                  Selecionar Todas
                </Button>
              </div>
              
              {/* Conquistas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {conquistas.map((conquista) => (
                  <motion.div
                    key={conquista.id}
                    className={cn(
                      "relative border border-border rounded-lg p-4 flex flex-col items-center transition-all",
                      conquista.desbloqueada ? "bg-white" : "bg-gray-50"
                    )}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <motion.div 
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-3",
                        conquista.desbloqueada 
                          ? "bg-blue-50 text-academy-purple" 
                          : "bg-gray-100 text-gray-400"
                      )}
                      whileHover={conquista.desbloqueada ? { scale: 1.05 } : {}}
                      animate={conquista.desbloqueada ? 
                        { scale: [1, 1.05, 1], transition: { repeat: Infinity, repeatType: "reverse", duration: 2 } } : 
                        {}
                      }
                    >
                      <Trophy className="w-6 h-6" />
                    </motion.div>
                    
                    <h4 className="text-sm font-medium text-center">
                      {conquista.titulo}
                    </h4>
                    
                    <div className="w-full mt-3 mb-1">
                      <Progress 
                        value={(conquista.progresso / conquista.total) * 100} 
                        className={cn(
                          "h-1",
                          conquista.desbloqueada ? "bg-academy-purple" : "bg-gray-200"
                        )}
                      />
                    </div>
                    
                    <span className="text-xs text-muted-foreground">
                      {conquista.progresso}/{conquista.total}
                    </span>
                    
                    {conquista.desbloqueada && (
                      <motion.div 
                        className="absolute top-0 right-0 m-1 bg-green-100 rounded-full p-0.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 20, delay: 0.2 }}
                      >
                        <Check className="w-3 h-3 text-green-600" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MainLayout>
  );
};

export default AulasSalvas;
