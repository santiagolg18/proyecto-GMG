import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  ArrowLeft,
  Home,
  Building2,
  Sparkles,
  Calendar,
  Users,
  Dog,
  Baby,
  CheckCircle2,
  Loader2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

// Tipos de servicio
const serviceTypes = [
  { id: "residencial", label: "Residencial", icon: Home, desc: "Hogar o apartamento" },
  { id: "comercial", label: "Comercial", icon: Building2, desc: "Oficina o negocio" },
  { id: "profunda", label: "Limpieza Profunda", icon: Sparkles, desc: "Limpieza detallada" },
];

// Tamaños de espacio
const spaceSizes = [
  { id: "pequeno", label: "Pequeño", range: "< 50m²" },
  { id: "mediano", label: "Mediano", range: "50-100m²" },
  { id: "grande", label: "Grande", range: "100-200m²" },
  { id: "muy-grande", label: "Muy Grande", range: "> 200m²" },
];

// Frecuencias de servicio
const frequencies = [
  { id: "unica", label: "Única vez", icon: "1x" },
  { id: "semanal", label: "Semanal", icon: "7d" },
  { id: "quincenal", label: "Quincenal", icon: "15d" },
  { id: "mensual", label: "Mensual", icon: "30d" },
];

interface FormData {
  serviceType: string;
  spaceSize: string;
  frequency: string;
  pets: string;
  kids: string;
  name: string;
  phone: string;
  email: string;
}

const GOOGLE_FORM_URL = import.meta.env.VITE_QUOTE_FORM_URL || '';

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    spaceSize: "",
    frequency: "",
    pets: "0",
    kids: "0",
    name: "",
    phone: "",
    email: "",
  });

  const totalSteps = 5;

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.serviceType !== "";
      case 2:
        return formData.spaceSize !== "";
      case 3:
        return formData.frequency !== "";
      case 4:
        return true; // Mascotas y niños son opcionales
      case 5:
        return formData.name && formData.phone && formData.email;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!GOOGLE_FORM_URL) {
      setSubmitError("El formulario no está configurado correctamente. Verifica VITE_QUOTE_FORM_URL en .env.local");
      console.error('❌ VITE_QUOTE_FORM_URL no está configurada');
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'hero_wizard'
    };

    console.log('📤 Enviando cotización a:', GOOGLE_FORM_URL);
    console.log('📦 Datos:', payload);

    try {
      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors', // Importante para Google Apps Script
        body: JSON.stringify(payload),
      });

      // Con mode: 'no-cors', no podemos leer la respuesta
      // Pero si no hay error de red, asumimos que funcionó
      console.log('✅ Formulario enviado (response opaque)');
      setSubmitSuccess(true);

      // Reset después de 3 segundos
      setTimeout(() => {
        setSubmitSuccess(false);
        setStep(1);
        setFormData({
          serviceType: "",
          spaceSize: "",
          frequency: "",
          pets: "0",
          kids: "0",
          name: "",
          phone: "",
          email: "",
        });
      }, 3000);

    } catch (error) {
      console.error('❌ Error al enviar:', error);
      console.error('Error details:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
      setSubmitError("No se pudo enviar. Verifica tu conexión e intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar paso actual
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                ¿Qué tipo de servicio necesitas?
              </h3>
              <p className="text-primary/70 text-sm">
                Selecciona el tipo de limpieza
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      updateField("serviceType", service.id);
                      setTimeout(nextStep, 300);
                    }}
                    className={cn(
                      "p-6 rounded-sm border-2 transition-all duration-300 text-left hover:scale-105",
                      formData.serviceType === service.id
                        ? "border-secondary bg-secondary/20 shadow-large"
                        : "border-primary/30 bg-primary/5 backdrop-blur-sm hover:border-primary/50"
                    )}
                  >
                    <Icon className="h-8 w-8 text-primary mb-3" />
                    <h4 className="font-semibold text-primary mb-1">{service.label}</h4>
                    <p className="text-primary/70 text-sm">{service.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                ¿Cuál es el tamaño del espacio?
              </h3>
              <p className="text-primary/70 text-sm">
                Esto nos ayuda a estimar el tiempo necesario
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {spaceSizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => {
                    updateField("spaceSize", size.id);
                    setTimeout(nextStep, 300);
                  }}
                  className={cn(
                    "p-6 rounded-sm border-2 transition-all duration-300 hover:scale-105",
                    formData.spaceSize === size.id
                      ? "border-secondary bg-secondary/20 shadow-large"
                      : "border-primary/30 bg-primary/5 backdrop-blur-sm hover:border-primary/50"
                  )}
                >
                  <div className="text-3xl font-bold text-primary mb-2">{size.range.split(' ')[0]}</div>
                  <div className="text-sm text-primary/70">{size.label}</div>
                  <div className="text-xs text-primary/50 mt-1">{size.range}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                ¿Con qué frecuencia?
              </h3>
              <p className="text-primary/70 text-sm">
                Elige la frecuencia del servicio
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  onClick={() => {
                    updateField("frequency", freq.id);
                    setTimeout(nextStep, 300);
                  }}
                  className={cn(
                    "p-6 rounded-sm border-2 transition-all duration-300 hover:scale-105 relative",
                    formData.frequency === freq.id
                      ? "border-secondary bg-secondary/20 shadow-large"
                      : "border-primary/30 bg-primary/5 backdrop-blur-sm hover:border-primary/50"
                  )}
                >
                  <Calendar className="h-8 w-8 text-primary mb-3 mx-auto" />
                  <div className="text-base font-semibold text-primary">{freq.label}</div>
                  <div className="text-xs text-primary/50 mt-1">{freq.icon}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in max-w-md mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                Información adicional
              </h3>
              <p className="text-primary/70 text-sm">
                Esto nos ayuda a preparar mejor el servicio
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-primary/5 backdrop-blur-sm p-6 rounded-sm border border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <Dog className="h-6 w-6 text-primary" />
                  <Label htmlFor="pets" className="text-primary font-semibold text-base">
                    ¿Cuántas mascotas?
                  </Label>
                </div>
                <select
                  id="pets"
                  value={formData.pets}
                  onChange={(e) => updateField("pets", e.target.value)}
                  className="w-full p-3 rounded-sm border border-primary/30 bg-white text-primary backdrop-blur-sm focus:border-secondary focus:ring-2 focus:ring-secondary/50 outline-none"
                >
                  {[0, 1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num} className="bg-white text-primary">
                      {num === 0 ? "Ninguna" : num === 5 ? "5 o más" : num}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-primary/5 backdrop-blur-sm p-6 rounded-sm border border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <Baby className="h-6 w-6 text-primary" />
                  <Label htmlFor="kids" className="text-primary font-semibold text-base">
                    ¿Cuántos niños?
                  </Label>
                </div>
                <select
                  id="kids"
                  value={formData.kids}
                  onChange={(e) => updateField("kids", e.target.value)}
                  className="w-full p-3 rounded-sm border border-primary/30 bg-white text-primary backdrop-blur-sm focus:border-secondary focus:ring-2 focus:ring-secondary/50 outline-none"
                >
                  {[0, 1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num} className="bg-white text-primary">
                      {num === 0 ? "Ninguno" : num === 5 ? "5 o más" : num}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in max-w-md mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-2">
                Últimos datos
              </h3>
              <p className="text-primary/70 text-sm">
                Para enviarte tu cotización personalizada
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-primary font-medium mb-2 block">
                  Nombre completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="bg-white border-primary/30 text-primary placeholder:text-primary/50 focus:border-secondary focus:ring-secondary/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-primary font-medium mb-2 block">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="bg-white border-primary/30 text-primary placeholder:text-primary/50 focus:border-secondary focus:ring-secondary/50 backdrop-blur-sm"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-primary font-medium mb-2 block">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="bg-white border-primary/30 text-primary placeholder:text-primary/50 focus:border-secondary focus:ring-secondary/50 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Vista de éxito
  if (submitSuccess) {
    return (
      <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-sm p-8 shadow-large animate-fade-in">
        <div className="text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-primary mb-2">
            ¡Cotización enviada!
          </h3>
          <p className="text-primary/80">
            Te contactaremos pronto con tu cotización personalizada.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-md border border-white/30 rounded-sm p-6 md:p-8 shadow-large">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-primary/70 text-sm font-medium">
            Paso {step} de {totalSteps}
          </span>
          <span className="text-primary/70 text-sm font-medium">
            {Math.round((step / totalSteps) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary transition-all duration-500 ease-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Contenido del paso */}
      <div className="min-h-[300px] md:min-h-[350px] flex items-center">
        {renderStep()}
      </div>

      {/* Error message */}
      {submitError && (
        <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-sm flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-300" />
          <p className="text-red-200 text-sm">{submitError}</p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-8 gap-4">
        <Button
          onClick={prevStep}
          disabled={step === 1 || isSubmitting}
          variant="outline"
          className="border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Atrás
        </Button>

        {step < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={!canProceed() || isSubmitting}
            className="bg-secondary text-primary hover:bg-secondary/90 disabled:opacity-50"
          >
            Siguiente
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed() || isSubmitting}
            className="bg-secondary text-primary hover:bg-secondary/90 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar cotización
                <CheckCircle2 className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
