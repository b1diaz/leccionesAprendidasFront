import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { MainLayout } from "@/components/layout/MainLayout";
import { BookOpen, Search, Filter, FileText, ArrowRight, CheckCircle2, Lightbulb, Target, BarChart3, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const InstructionsPage = () => {
  const navigate = useNavigate();
  const steps = [
    {
      icon: Search,
      title: "Realizar una Búsqueda",
      description: "Utiliza el panel derecho para buscar lecciones aprendidas",
      details: [
        "Selecciona el campo de búsqueda (Descripción, Análisis, Consecuencias o Aprendizaje)",
        "Escribe una descripción detallada de la situación que buscas (mínimo 150 caracteres recomendados)",
        "Ajusta los filtros según tus necesidades: rango de fechas, tipo de estado y score mínimo",
        "Haz clic en 'Buscar' para ver los resultados"
      ]
    },
    {
      icon: Filter,
      title: "Filtrar Resultados",
      description: "Refina tu búsqueda usando los filtros disponibles",
      details: [
        "Score mínimo: Usa el slider para filtrar por relevancia (verde = alta, amarillo = media, rojo = baja)",
        "Rango de fechas: Selecciona un período específico para limitar los resultados",
        "Tipo de estado: Filtra por Condición Insegura, Incidente o No Conformidad"
      ]
    },
    {
      icon: FileText,
      title: "Ver Detalle de Lección",
      description: "Explora la información completa de cada lección",
      details: [
        "Haz clic en cualquier tarjeta de resultado para ver el detalle completo",
        "Revisa la Descripción, Análisis, Consecuencias y Aprendizaje",
        "Consulta la información contextual en el panel derecho (fecha, ubicación, cargo, score IA)"
      ]
    },
    {
      icon: Target,
      title: "Entender el Score IA",
      description: "Comprende cómo funciona el sistema de puntuación",
      details: [
        "Score ≥ 0.70 (Verde): Alta coincidencia con tu búsqueda",
        "Score 0.40-0.69 (Amarillo): Coincidencia media",
        "Score < 0.40 (Rojo): Baja coincidencia",
        "Los resultados se ordenan automáticamente de mayor a menor score"
      ]
    }
  ];

  const tips = [
    {
      icon: Lightbulb,
      title: "Búsqueda Efectiva",
      content: "Sé específico y detallado. En lugar de 'Accidente EPP', describe: 'Un accidente ocurrió en el área de montaje donde la causa principal fue el uso incorrecto de EPP de altura'"
    },
    {
      icon: BarChart3,
      title: "Interpretar Resultados",
      content: "Los resultados se muestran ordenados por relevancia. Las tarjetas con score verde son las más relevantes para tu búsqueda."
    },
    {
      icon: Calendar,
      title: "Filtros de Fecha",
      content: "Usa el rango de fechas para encontrar lecciones de períodos específicos. Esto es útil para analizar tendencias temporales."
    },
    {
      icon: MapPin,
      title: "Información Contextual",
      content: "Cada lección incluye ubicación, cargo relacionado y fecha/hora. Esta información te ayuda a contextualizar mejor los aprendizajes."
    }
  ];

  return (
    <AppLayout>
      <MainLayout>
        {/* Header */}
        <div className="bg-white border-b border-border shadow-elevation-1">
          <div className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-foreground">
                  Instrucciones de Uso
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Aprende a utilizar el sistema de Lecciones Aprendidas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Introducción */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Bienvenido al Sistema de Lecciones Aprendidas
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Este sistema te permite buscar y consultar lecciones aprendidas registradas en la organización. 
                      Utiliza la búsqueda inteligente con IA para encontrar información relevante basada en similitud contextual.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pasos principales */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Pasos para Usar el Sistema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps.map((step, index) => (
                  <Card key={index} className="hover:shadow-elevation-2 transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <step.icon className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Consejos y Tips */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Consejos y Mejores Prácticas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <Card key={index} className="bg-card">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
                          <tip.icon className="h-5 w-5 text-accent-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-2">
                            {tip.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {tip.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Información sobre Score */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <BarChart3 className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Sistema de Puntuación IA
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white rounded-lg p-4 border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-600"></div>
                          <span className="font-semibold text-sm">Alta (≥0.70)</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Resultados con alta coincidencia contextual
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-yellow-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <span className="font-semibold text-sm">Media (0.40-0.69)</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Resultados con coincidencia moderada
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-red-600"></div>
                          <span className="font-semibold text-sm">Baja (&lt;0.40)</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Resultados con baja coincidencia
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Acción rápida */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <ArrowRight className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        ¿Listo para comenzar?
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Regresa a la página principal y realiza tu primera búsqueda
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    onClick={() => navigate("/")}
                    className="bg-primary text-primary-foreground"
                  >
                    Ir a Búsqueda
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    </AppLayout>
  );
};

export default InstructionsPage;

