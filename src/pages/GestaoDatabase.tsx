
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, FileSpreadsheet, Users, Trash2, AlertCircle, Settings, Download, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';

// Placeholder data
const databaseMetrics = {
  totalStudents: 1230,
  dataSize: '45MB',
  backupDate: new Date().toLocaleDateString(),
  backupVersions: 3,
  dataIntegrity: 98,
  dataIssues: 2,
  storageUsed: 15,
  storageAvailable: 85
};

const GestaoDatabase = () => {
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showBackupDialog, setShowBackupDialog] = useState(false);
  const [showCleanDialog, setShowCleanDialog] = useState(false);
  const [showAuditDialog, setShowAuditDialog] = useState(false);

  // Simulate actions
  const handleExport = (format) => {
    toast({
      title: "Exportação iniciada",
      description: `Exportando dados em formato ${format}...`,
    });
    setTimeout(() => {
      toast({
        title: "Exportação concluída",
        description: "Dados exportados com sucesso.",
      });
    }, 2000);
    setShowExportDialog(false);
  };

  const handleBackup = () => {
    toast({
      title: "Backup iniciado",
      description: "Realizando backup dos dados...",
    });
    setTimeout(() => {
      toast({
        title: "Backup concluído",
        description: `Backup realizado em ${new Date().toLocaleTimeString()}.`,
      });
    }, 3000);
    setShowBackupDialog(false);
  };

  const handleCleanCache = () => {
    toast({
      title: "Limpeza iniciada",
      description: "Removendo dados temporários...",
    });
    setTimeout(() => {
      toast({
        title: "Limpeza concluída",
        description: "Cache removido com sucesso.",
      });
    }, 2000);
    setShowCleanDialog(false);
  };

  const handleAudit = () => {
    toast({
      title: "Auditoria iniciada",
      description: "Analisando integridade dos dados...",
    });
    setTimeout(() => {
      toast({
        title: "Auditoria concluída",
        description: "Relatório de auditoria gerado com sucesso.",
      });
    }, 4000);
    setShowAuditDialog(false);
  };

  return (
    <MainLayout
      pageTitle="Gestão de Dados"
      pageSubtitle="Gerencie os dados da sua academia"
      headerImage="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2000&q=80"
    >
      <div className="space-y-6">
        {/* Database metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-secondary/20">
            <CardContent className="flex flex-col pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">INTEGRIDADE</div>
              <div className="text-2xl font-bold">{databaseMetrics.dataIntegrity}% completos</div>
              <div className="text-sm text-destructive">▼{databaseMetrics.dataIssues}% problemas</div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20">
            <CardContent className="flex flex-col pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">BACKUP</div>
              <div className="text-lg font-bold">Último: {databaseMetrics.backupDate}</div>
              <div className="text-sm">{databaseMetrics.backupVersions} versões disponíveis</div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20">
            <CardContent className="flex flex-col pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">PRIVACIDADE</div>
              <div className="text-lg font-bold">0 compartilhamentos</div>
              <div className="text-sm">GDPR compliant</div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/20">
            <CardContent className="flex flex-col pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">ESPAÇO</div>
              <div className="text-lg font-bold">{databaseMetrics.storageUsed}% utilizado</div>
              <div className="text-sm">{databaseMetrics.storageAvailable}GB livres</div>
            </CardContent>
          </Card>
        </div>

        {/* Data modules */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" /> 
              Módulos de Dados
            </CardTitle>
            <CardDescription>Gerencie os diferentes tipos de dados do sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-3 px-4 bg-secondary/10 rounded-lg">
              <div className="flex items-center">
                <Users className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Dados de Alunos</div>
                  <div className="text-sm text-muted-foreground">1.2K registros • Atualizado há 2h</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Detalhes →
              </Button>
            </div>

            <div className="flex justify-between items-center py-3 px-4 bg-secondary/10 rounded-lg">
              <div className="flex items-center">
                <FileSpreadsheet className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Financeiro</div>
                  <div className="text-sm text-muted-foreground">12 meses históricos</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Exportar →
              </Button>
            </div>

            <div className="flex justify-between items-center py-3 px-4 bg-secondary/10 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Métricas de Evasão</div>
                  <div className="text-sm text-muted-foreground">85 padrões detectados</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Treinar novamente →
              </Button>
            </div>

            <div className="flex justify-between items-center py-3 px-4 bg-secondary/10 rounded-lg">
              <div className="flex items-center">
                <Settings className="mr-3 h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">Fontes de Dados</div>
                  <div className="text-sm text-muted-foreground">App (primário), Planilha (secundário)</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Gerenciar →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setShowExportDialog(true)} className="flex items-center">
            <Download className="mr-2 h-4 w-4" /> Exportar Tudo
          </Button>
          <Button onClick={() => setShowCleanDialog(true)} variant="outline" className="flex items-center">
            <Trash2 className="mr-2 h-4 w-4" /> Limpar Cache
          </Button>
          <Button onClick={() => setShowBackupDialog(true)} variant="outline" className="flex items-center">
            <Upload className="mr-2 h-4 w-4" /> Backup Agora
          </Button>
          <Button onClick={() => setShowAuditDialog(true)} variant="outline" className="flex items-center">
            <AlertCircle className="mr-2 h-4 w-4" /> Auditoria...
          </Button>
        </div>

        {/* System info */}
        <div className="text-xs text-muted-foreground mt-8 text-center">
          v4.2.1 | Modelo IA v3.1 | Última análise: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
      </div>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exportar Dados</DialogTitle>
            <DialogDescription>
              Escolha o formato para exportar todos os dados da academia.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button onClick={() => handleExport('CSV')}>Exportar como CSV</Button>
            <Button onClick={() => handleExport('JSON')}>Exportar como JSON</Button>
            <Button onClick={() => handleExport('Excel')} variant="outline">Exportar como Excel</Button>
            <Button onClick={() => handleExport('PDF')} variant="outline">Exportar como PDF</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Backup Dialog */}
      <Dialog open={showBackupDialog} onOpenChange={setShowBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Backup de Dados</DialogTitle>
            <DialogDescription>
              Realizar backup completo de todos os dados da academia?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 py-4">
            <Button variant="outline" onClick={() => setShowBackupDialog(false)}>Cancelar</Button>
            <Button onClick={handleBackup}>Confirmar Backup</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Clean Cache Dialog */}
      <Dialog open={showCleanDialog} onOpenChange={setShowCleanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limpar Cache</DialogTitle>
            <DialogDescription>
              Esta ação irá remover todos os dados temporários. Os dados importantes não serão afetados.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 py-4">
            <Button variant="outline" onClick={() => setShowCleanDialog(false)}>Cancelar</Button>
            <Button onClick={handleCleanCache}>Confirmar Limpeza</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Audit Dialog */}
      <Dialog open={showAuditDialog} onOpenChange={setShowAuditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Auditoria de Dados</DialogTitle>
            <DialogDescription>
              Realizar auditoria completa para verificar integridade e segurança dos dados?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 py-4">
            <Button variant="outline" onClick={() => setShowAuditDialog(false)}>Cancelar</Button>
            <Button onClick={handleAudit}>Iniciar Auditoria</Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default GestaoDatabase;
