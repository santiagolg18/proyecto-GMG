import { useState } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, Play } from "lucide-react";

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array de fotos del equipo y empresa (URLs de ejemplo - reemplazar con fotos reales)
  const teamPhotos = [
    {
      url: "https://res.cloudinary.com/dqnsskjfg/image/upload/v1763139795/5_e8wzl0.webp",
      title: "Nuestro Equipo",
      description: "Personal capacitado y profesional"
    },
    {
      url: "https://res.cloudinary.com/dqnsskjfg/image/upload/v1763139795/2_wt52gu.webp",
      title: "En Acción",
      description: "Compromiso con la excelencia"
    },
    {
      url: "https://images.unsplash.com/photo-1758599669327-83d310882929?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Resultados Impecables",
      description: "Garantía de satisfacción"
    },
    {
      url: "https://res.cloudinary.com/dqnsskjfg/image/upload/v1763139795/4_qt4bvm.webp",
      title: "Equipo Profesional",
      description: "Más de 10 años de experiencia"
    }
  ];

  // URL del video (reemplazar con el video real del equipo)
  const videoUrl = "https://youtu.be/xpqQicIliZc"; // Ejemplo - reemplazar

  const features = [
    "Personal capacitado y certificado",
    "Productos de limpieza ecológicos",
    "Atención personalizada",
    "Garantía de satisfacción",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % teamPhotos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + teamPhotos.length) % teamPhotos.length);
  };

  return (
    <section id="nosotros" className="py-20 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Conoce a Nuestro Equipo
          </h2>
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
            Somos una empresa líder en servicios de limpieza con más de 10 años de experiencia.
            Nuestro compromiso es proporcionar espacios impecables que mejoren la calidad de vida
            y productividad de nuestros clientes.
          </p>
        </div>

        {/* Carousel & Video Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Photo Carousel */}
          <div className="animate-fade-in">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-primary/5">
              {/* Carousel Images */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {teamPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6">
                      <h3 className="text-white text-2xl font-bold mb-1">{photo.title}</h3>
                      <p className="text-white/90 text-sm">{photo.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-6 w-6 text-primary" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-110"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="h-6 w-6 text-primary" />
              </button>

              {/* Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {teamPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-white w-8"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                    aria-label={`Ir a foto ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="animate-fade-in">
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-primary/5 aspect-[4/3]">
              <iframe
                src={videoUrl}
                title="Saludo del equipo GMG"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute top-4 left-4 bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span className="text-sm font-semibold">Saludo del Gerente y Equipo</span>
              </div>
            </div>
            <p className="text-center text-muted-foreground mt-4 text-sm">
              Conoce más sobre nosotros y nuestra pasión por la limpieza
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in">
          <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl">
            <div className="text-5xl font-bold text-primary mb-2">10+</div>
            <div className="text-lg text-foreground">Años de experiencia</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl">
            <div className="text-5xl font-bold text-primary mb-2">500+</div>
            <div className="text-lg text-foreground">Clientes satisfechos</div>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl">
            <div className="text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-lg text-foreground">Garantía de calidad</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
