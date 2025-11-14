import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { useCMSData } from "@/hooks/useCMSData";
import { lazy } from "react";

// Fallback services data in case CMS is not configured
const fallbackServices = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    title: "Limpieza Residencial",
    description: "Mantén tu hogar impecable con nuestro servicio de limpieza profunda y regular.",
    details: [
      "Limpieza completa de habitaciones",
      "Cocina y baños sanitizados",
      "Aspirado y trapeado de pisos",
      "Desempolvado de superficies",
      "Organización de espacios"
    ],
    price: "Desde $80.000 COP",
    order: 1
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    title: "Limpieza Comercial",
    description: "Espacios de trabajo limpios y profesionales para tu empresa u oficina.",
    details: [
      "Oficinas y áreas comunes",
      "Sanitización de escritorios",
      "Limpieza de salas de reuniones",
      "Mantenimiento de baños",
      "Servicio diario o semanal"
    ],
    price: "Cotización personalizada",
    order: 2
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=800&q=80",
    title: "Limpieza Profunda",
    description: "Servicio especializado que llega a cada rincón y detalle de tu espacio.",
    details: [
      "Limpieza de ventanas y marcos",
      "Techos y paredes",
      "Detrás de electrodomésticos",
      "Áreas de difícil acceso",
      "Desinfección total"
    ],
    price: "Desde $150.000 COP",
    order: 3
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    title: "Lavado de Alfombras",
    description: "Eliminamos manchas y devolvemos la frescura a tus alfombras y tapetes.",
    details: [
      "Eliminación de manchas difíciles",
      "Extracción profunda de suciedad",
      "Tratamiento anti-ácaros",
      "Secado rápido",
      "Resultados garantizados"
    ],
    price: "Desde $40.000 COP por m²",
    order: 4
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80",
    title: "Limpieza de Ventanas",
    description: "Cristales relucientes que dejan entrar toda la luz natural.",
    details: [
      "Interior y exterior",
      "Marcos y rieles",
      "Sin rayas ni manchas",
      "Productos especializados",
      "Edificios de hasta 3 pisos"
    ],
    price: "Desde $30.000 COP",
    order: 5
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
    title: "Desinfección",
    description: "Servicios de sanitización y desinfección completa de espacios.",
    details: [
      "Productos certificados",
      "Eliminación de virus y bacterias",
      "Áreas de alto contacto",
      "Seguro y no tóxico",
      "Ideal para oficinas y hogares"
    ],
    price: "Desde $100.000 COP",
    order: 6
  },
];

const Services = () => {
  const { data, isLoading, error, isError } = useCMSData();

  // Use CMS data if available, otherwise fallback to hardcoded data
  const services = data?.services?.map(service => ({
    ...service,
    image: service.imageUrl,
    // Parse details from description if not provided (split by newlines or periods)
    details: service.details || (service.description ? service.description.split('.').filter(d => d.trim().length > 0).slice(0, 5) : [])
  })) || fallbackServices;

  // Show loading only on initial load, not on subsequent fetches
  const showLoading = isLoading && !data && !isError;

  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="container mx-auto px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-20 animate-fade-in">
          {/* Cleaner Image */}
          <div className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dqnsskjfg/image/upload/v1763080219/FOTO_HERO_OPTIMA_mftw77.png"
              alt="Profesional de limpieza GMG"
              className="w-48 h-48 md:w-64 md:h-64 object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-semibold text-primary mb-6 tracking-tight">
              Nuestros Servicios
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ofrecemos una amplia gama de servicios de limpieza adaptados a tus necesidades
            </p>
          </div>
        </div>

        {/* Loading State - only show on initial load */}
        {showLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Cargando servicios...</p>
            <p className="text-xs text-muted-foreground mt-2">Esto puede tardar unos segundos</p>
          </div>
        )}

        {/* Error State - only show if we have an error and no cached data */}
        {isError && !data && (
          <div className="flex flex-col items-center justify-center py-10 text-center mb-8 bg-muted/30 rounded-sm p-6">
            <AlertCircle className="h-8 w-8 text-yellow-600 mb-2" />
            <p className="text-sm text-muted-foreground mb-1">No se pudo conectar con el CMS</p>
            <p className="text-xs text-muted-foreground">Mostrando servicios predeterminados</p>
          </div>
        )}

        {/* Services Grid - always show if we have data or error (fallback) */}
        {!showLoading && (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
            <div
              key={service.id || index}
              className="group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-300 h-[420px] cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Imagen de fondo */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Overlay más claro para que las imágenes se vean mejor */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent group-hover:from-primary/95 group-hover:via-primary/80 group-hover:to-secondary/60 transition-all duration-300" />

              {/* Contenido inicial (visible por defecto) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                <h3 className="text-2xl font-semibold mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Contenido hover (detalles) */}
              <div className="absolute inset-0 p-8 flex flex-col justify-center text-white opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-6 text-center tracking-tight">
                  {service.title}
                </h3>

                <div className="space-y-3 mb-6">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-5 border-t border-white/40">
                  <p className="text-lg font-medium text-center">
                    {service.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
