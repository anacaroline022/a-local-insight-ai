
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Brush, PanelRight, Award, Layout, Palette, Type, Slider, Check } from 'lucide-react';

const DesignIntuitivo = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [primaryColor, setPrimaryColor] = useState('#9b87f5');
  const [selectedFont, setSelectedFont] = useState('SF Pro Display');
  const [borderRadius, setBorderRadius] = useState(12);
  const [showPreview, setShowPreview] = useState(true);
  
  // Simulating real-time saving
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState('agora');
  
  const handleColorChange = (color) => {
    setPrimaryColor(color);
    simulateSaving();
  };
  
  const handleFontChange = (font) => {
    setSelectedFont(font);
    simulateSaving();
  };
  
  const handleBorderRadiusChange = (radius) => {
    setBorderRadius(radius);
    simulateSaving();
  };
  
  const handleModeToggle = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
    simulateSaving();
  };
  
  const simulateSaving = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setLastSaved('agora');
    }, 800);
  };
  
  const colors = ['#9b87f5', '#1EAEDB', '#D946EF', '#4CAF50', '#FF5252', '#FF9800'];
  const fonts = ['SF Pro Display', 'SF Pro Text', 'SF Mono', 'Helvetica Neue'];
  const radiusOptions = [4, 8, 12, 16, 20];
  
  return (
    <MainLayout
      pageTitle="Design Intuitivo"
      pageSubtitle="Personalize a aparência do seu aplicativo"
      headerImage="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Design Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="palette">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="palette" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">Cores</span>
              </TabsTrigger>
              <TabsTrigger value="typography" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span className="hidden sm:inline">Tipografia</span>
              </TabsTrigger>
              <TabsTrigger value="ui" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                <span className="hidden sm:inline">UI</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="palette" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Cor Primária</h3>
                <div className="grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-full h-12 rounded-md transition-all ${
                        primaryColor === color ? 'ring-2 ring-offset-2 ring-offset-background ring-primary' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorChange(color)}
                      aria-label={`Selecionar cor ${color}`}
                    />
                  ))}
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium">Modo</h3>
                  <div className="flex mt-2">
                    <button
                      className={`px-4 py-2 rounded-l-md transition-all ${
                        mode === 'light' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      }`}
                      onClick={() => mode !== 'light' && handleModeToggle()}
                    >
                      Claro
                    </button>
                    <button
                      className={`px-4 py-2 rounded-r-md transition-all ${
                        mode === 'dark' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      }`}
                      onClick={() => mode !== 'dark' && handleModeToggle()}
                    >
                      Escuro
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="typography" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Fonte Principal</h3>
                <div className="space-y-2">
                  {fonts.map((font) => (
                    <button
                      key={font}
                      className={`w-full py-3 px-4 rounded-md text-left transition-all ${
                        selectedFont === font ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      }`}
                      onClick={() => handleFontChange(font)}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ui" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Arredondamento</h3>
                <div className="flex flex-wrap gap-3">
                  {radiusOptions.map((radius) => (
                    <button
                      key={radius}
                      className={`px-4 py-2 transition-all ${
                        borderRadius === radius ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                      }`}
                      style={{ borderRadius: radius + 'px' }}
                      onClick={() => handleBorderRadiusChange(radius)}
                    >
                      {radius}px
                    </button>
                  ))}
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-medium">Pré-visualização</h3>
                  <div className="flex items-center mt-2">
                    <Switch 
                      checked={showPreview} 
                      onCheckedChange={setShowPreview} 
                    />
                    <span className="ml-2">Mostrar pré-visualização</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>
              {saving ? (
                <span className="flex items-center gap-2">
                  <span className="animate-pulse">Salvando...</span>
                </span>
              ) : (
                <span>Salvo: {lastSaved}</span>
              )}
            </span>
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                setPrimaryColor('#9b87f5');
                setSelectedFont('SF Pro Display');
                setBorderRadius(12);
                setMode('dark');
                simulateSaving();
              }}
            >
              Restaurar Padrões
            </Button>
          </div>
        </div>
        
        {/* Right Column - Preview */}
        {showPreview && (
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <PanelRight className="h-5 w-5" />
              Pré-visualização em tempo real
            </h3>
            
            <div className="space-y-8 p-6 rounded-xl border">
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Botões</h4>
                <div className="flex flex-wrap gap-3">
                  <Button
                    style={{ 
                      borderRadius: borderRadius + 'px',
                      backgroundColor: primaryColor
                    }}
                  >
                    Botão Primário
                  </Button>
                  <Button
                    variant="outline"
                    style={{ borderRadius: borderRadius + 'px' }}
                  >
                    Botão Secundário
                  </Button>
                  <Button
                    variant="ghost"
                    style={{ borderRadius: borderRadius + 'px' }}
                  >
                    Botão Ghost
                  </Button>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Cards</h4>
                <div className="grid grid-cols-2 gap-4">
                  <Card style={{ borderRadius: borderRadius + 'px' }}>
                    <CardContent className="p-4">
                      <h5 className="font-medium" style={{ fontFamily: selectedFont }}>
                        Título do Card
                      </h5>
                      <p className="text-sm text-muted-foreground mt-2">
                        Conteúdo do card de exemplo
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    style={{ 
                      borderRadius: borderRadius + 'px',
                      borderColor: primaryColor
                    }}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div
                        className="h-10 w-10 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <Award className="h-5 w-5" />
                      </div>
                      <div>
                        <h5 className="font-medium" style={{ fontFamily: selectedFont }}>
                          Card de Destaque
                        </h5>
                        <p className="text-sm text-muted-foreground">Com ícone</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Tipografia</h4>
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold" style={{ fontFamily: selectedFont }}>
                    Título H1
                  </h1>
                  <h2 className="text-2xl font-semibold" style={{ fontFamily: selectedFont }}>
                    Título H2
                  </h2>
                  <h3 className="text-xl font-medium" style={{ fontFamily: selectedFont }}>
                    Título H3
                  </h3>
                  <p style={{ fontFamily: selectedFont }}>
                    Texto de parágrafo normal em {selectedFont}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-muted-foreground">Cores</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className="h-24 rounded-md flex items-center justify-center text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Cor Primária
                  </div>
                  <div className="h-24 bg-secondary rounded-md flex items-center justify-center">
                    Cor Secundária
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-secondary rounded-md text-sm text-center">
              Todas as alterações são aplicadas em tempo real e salvas automaticamente
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

// Custom Switch component
const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        checked ? 'bg-primary' : 'bg-input'
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

export default DesignIntuitivo;
