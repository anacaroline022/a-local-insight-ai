
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  BarChart2, 
  Bell, 
  MessageCircle, 
  Calendar, 
  BookOpen,
  Play, 
  HeartPulse, 
  FileText, 
  Award, 
  Settings,
  User, 
  Globe, 
  Utensils,
  PanelRight,
  Activity,
  TrendingDown
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from '@/context/AuthContext';

type SidebarItem = {
  title: string;
  path: string;
  icon: React.ElementType;
};

const mainItems: SidebarItem[] = [
  { title: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { title: 'Painel de Gestão', path: '/painel-gestao', icon: PanelRight },
  { title: 'Alertas Automáticos', path: '/alertas', icon: Bell },
  { title: 'Previsão de Evasão (IA)', path: '/previsao-evasao', icon: TrendingDown },
  { title: 'Gestão de Dados', path: '/gestao-dados', icon: BarChart2 },
  { title: 'Plataforma de Pagamentos', path: '/pagamentos', icon: Award },
  { title: 'Análise Preditiva', path: '/analise-preditiva', icon: Activity },
  { title: 'Feedback de Alunos', path: '/feedback', icon: HeartPulse },
  { title: 'Chatbot', path: '/chatbot', icon: MessageCircle },
  { title: 'Treinos e Aulas Temáticas', path: '/aulas-tematicas', icon: Award },
  { title: 'Cronograma de Treinos', path: '/cronograma', icon: Calendar },
  { title: 'Aulas Salvas', path: '/aulas-salvas', icon: BookOpen },
  { title: 'Atividades', path: '/atividades', icon: Play },
  { title: 'Programas', path: '/programas', icon: Award },
  { title: 'Controle de Frequência', path: '/frequencia', icon: Activity },
  { title: 'Notificações Motivacionais', path: '/notificacoes', icon: Bell },
  { title: 'Relatórios', path: '/relatorios', icon: FileText },
  { title: 'Programa de Fidelidade', path: '/fidelidade', icon: Award },
];

const bottomItems: SidebarItem[] = [
  { title: 'Configurações', path: '/configuracoes', icon: Settings },
  { title: 'Perfil', path: '/perfil', icon: User },
  { title: 'Idiomas', path: '/idiomas', icon: Globe },
  { title: 'Nutrição', path: '/nutricao', icon: Utensils },
];

const Sidebar: React.FC<{ collapsed: boolean; setCollapsed: (value: boolean) => void }> = ({
  collapsed,
  setCollapsed
}) => {
  const location = useLocation();
  const { user } = useAuth();

  const SidebarItem: React.FC<{ item: SidebarItem }> = ({ item }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={item.path}
              className={cn(
                "flex items-center py-3 px-3 my-1 rounded-lg transition-colors",
                isActive 
                  ? "bg-academy-purple text-white" 
                  : "text-foreground/70 hover:bg-secondary"
              )}
            >
              <Icon size={20} className={collapsed ? "mx-auto" : "mr-2"} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          </TooltipTrigger>
          {collapsed && (
            <TooltipContent side="right">
              {item.title}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div 
      className={cn(
        "h-screen bg-background border-r border-border p-4 transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && (
          <div className="text-xl font-bold text-gradient">
            {user?.academyName || "Academia"}
          </div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-secondary"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          {mainItems.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border mt-4">
        {bottomItems.map((item) => (
          <SidebarItem key={item.path} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
