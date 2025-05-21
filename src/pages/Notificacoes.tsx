
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Bell, X, Settings, DownloadCloud, Repeat } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Sample notification data
const initialNotifications = [
  {
    id: 1,
    type: 'critical',
    title: 'RISCO DE CANCELAMENTO',
    icon: '‼️',
    description: 'Joana Silva (5 faltas seguidas)',
    date: '15/05',
    detail: 'Última presença: 15/05',
    chance: '92% chance de evasão',
    actions: ['Mensagem Personalizada', 'Oferecer 10% Desconto'],
  },
  {
    id: 2,
    type: 'warning',
    title: 'PAGAMENTO ATRASADO',
    icon: '💸',
    description: 'Carlos Oliveira: R$ 150 (3 dias)',
    date: '16/05',
    detail: 'Método: Pix',
    actions: ['Lembrar por WhatsApp', 'Enviar Boleto'],
  },
  {
    id: 3,
    type: 'info',
    title: 'BACKUP CONCLUÍDO',
    icon: '🔄',
    description: '16/05 às 02:00',
    date: '16/05',
    detail: '1.2GB de dados seguros',
    actions: ['Marcar como Lida'],
  },
  {
    id: 4,
    type: 'critical',
    title: 'ALUNO INATIVO',
    icon: '⚠️',
    description: 'Pedro Santos (sem acesso há 15 dias)',
    date: '14/05',
    detail: 'Último login: 01/05',
    chance: '78% chance de evasão',
    actions: ['Entrar em Contato', 'Oferecer Aula Grátis'],
  },
  {
    id: 5,
    type: 'warning',
    title: 'CAPACIDADE MÁXIMA',
    icon: '🔔',
    description: 'Turma de 19h: 95% ocupada',
    date: '13/05',
    detail: 'Considere abrir novo horário',
    actions: ['Analisar Horários', 'Ignorar'],
  }
];

const Notificacoes = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('Todos');
  const [showConfigDialog, setShowConfigDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  
  // Filter notifications based on selected filter
  const filteredNotifications = filter === 'Todos' 
    ? notifications 
    : notifications.filter(n => {
        if (filter === 'Não Lidos') return true; // All are unread in this example
        if (filter === 'Financeiro') return n.title.includes('PAGAMENTO');
        if (filter === 'Evasão') return n.title.includes('CANCELAMENTO') || n.title.includes('INATIVO');
        return true;
      });
    
  // Handle notification action
  const handleAction = (notificationId, action) => {
    toast({
      title: "Ação executada",
      description: `${action} para a notificação #${notificationId}`
    });
  };
  
  // Handle remove notification
  const handleRemove = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({
      title: "Notificação removida",
      description: "A notificação foi arquivada com sucesso."
    });
  };
  
  // Clear all notifications
  const handleClearAll = () => {
    setNotifications([]);
    toast({
      title: "Notificações limpas",
      description: "Todas as notificações foram arquivadas com sucesso."
    });
  };
  
  // Export notifications report
  const handleExport = (format) => {
    toast({
      title: "Relatório exportado",
      description: `Relatório de notificações exportado em formato ${format}.`
    });
    setShowExportDialog(false);
  };
  
  // Sync notifications
  const handleSync = () => {
    toast({
      title: "Sincronizando...",
      description: "Buscando novas notificações..."
    });
    
    // Simulate sync delay
    setTimeout(() => {
      toast({
        title: "Sincronização concluída",
        description: "Não há novas notificações."
      });
    }, 2000);
  };
  
  return (
    <MainLayout
      pageTitle="Notificações"
      pageSubtitle="Acompanhe alertas e mensagens importantes"
      headerImage="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=2000&q=80"
    >
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Filter bar */}
        <div className="flex justify-between items-center">
          <div className="relative inline-block">
            <select
              className="appearance-none py-2 pl-3 pr-8 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Não Lidos">Não Lidos</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Evasão">Evasão</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {filteredNotifications.length} notificação(ões)
          </div>
        </div>
        
        {/* Notifications list */}
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-secondary/10 rounded-xl">
            <Bell className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">Nenhuma notificação</h3>
            <p className="text-muted-foreground">Você está com tudo em dia!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`
                  relative overflow-hidden rounded-xl border border-border shadow-sm
                  ${notification.type === 'critical' ? 'bg-red-500/10 border-red-500/30' : 
                    notification.type === 'warning' ? 'bg-orange-500/10 border-orange-500/30' : 
                    'bg-blue-500/10 border-blue-500/30'}
                `}
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="text-xl mr-3">{notification.icon}</div>
                      <div>
                        <div className="font-semibold text-sm">{notification.title}</div>
                        <div className="text-base mt-1">{notification.description}</div>
                        <div className="text-sm text-muted-foreground mt-2">
                          {notification.detail}
                        </div>
                        {notification.chance && (
                          <div className="text-sm font-medium mt-1 text-red-500">
                            {notification.chance}
                          </div>
                        )}
                      </div>
                    </div>
                    <button 
                      className="text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemove(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    {notification.actions.map((action, idx) => (
                      <Button 
                        key={idx} 
                        size="sm" 
                        variant={idx === 0 ? "default" : "outline"}
                        onClick={() => handleAction(notification.id, action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Quick actions */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 items-end">
          <div className="bg-background glass-morphism rounded-lg p-1.5 flex gap-1">
            <Button size="icon" variant="ghost" onClick={handleClearAll}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setShowConfigDialog(true)}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={() => setShowExportDialog(true)}>
              <DownloadCloud className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleSync}>
              <Repeat className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Stats footer */}
        <div className="bg-secondary/10 rounded-lg p-4 text-center text-sm text-muted-foreground">
          <p>📊 Estatísticas: {notifications.length} alertas hoje | 85% resolvidos</p>
          <p className="mt-1">⏱️ Tempo médio de resposta: 23min</p>
        </div>
      </div>
      
      {/* Config Dialog */}
      <Dialog open={showConfigDialog} onOpenChange={setShowConfigDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Configurar Alertas</DialogTitle>
            <DialogDescription>
              Personalize quais notificações você deseja receber e como.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Alertas de evasão</div>
                <div className="text-sm text-muted-foreground">Notificações sobre alunos em risco</div>
              </div>
              <button className="w-12 h-6 rounded-full relative bg-primary">
                <span className="absolute top-1 w-4 h-4 rounded-full bg-background transform translate-x-7" />
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Alertas financeiros</div>
                <div className="text-sm text-muted-foreground">Pagamentos e faturas</div>
              </div>
              <button className="w-12 h-6 rounded-full relative bg-primary">
                <span className="absolute top-1 w-4 h-4 rounded-full bg-background transform translate-x-7" />
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">Alertas de sistema</div>
                <div className="text-sm text-muted-foreground">Backups e atualizações</div>
              </div>
              <button className="w-12 h-6 rounded-full relative bg-primary">
                <span className="absolute top-1 w-4 h-4 rounded-full bg-background transform translate-x-7" />
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowConfigDialog(false)}>Salvar</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Relatório</DialogTitle>
            <DialogDescription>
              Escolha o formato para exportar o relatório de notificações.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button onClick={() => handleExport('PDF')}>PDF</Button>
            <Button onClick={() => handleExport('Excel')}>Excel</Button>
            <Button onClick={() => handleExport('CSV')} variant="outline">CSV</Button>
            <Button onClick={() => handleExport('JSON')} variant="outline">JSON</Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default Notificacoes;
