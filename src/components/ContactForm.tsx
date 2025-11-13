import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  return (
    <section id="contacto" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Contáctanos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Puedes solicitar tu cotización directamente en la sección de inicio o contactarnos por los siguientes medios.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-2xl font-semibold text-primary mb-6 text-center">
                Información de Contacto
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-xl">
                  <div className="p-4 bg-primary/10 rounded-lg mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground mb-2">Teléfono</p>
                  <p className="text-muted-foreground">79 692 76 08</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-primary/5 to-secondary/10 rounded-xl">
                  <div className="p-4 bg-primary/10 rounded-lg mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground mb-2">Email</p>
                  <p className="text-muted-foreground">murog0723@gmail.com</p>
                </div>
              </div>

              {/* Google Maps */}
              <div className="rounded-xl overflow-hidden shadow-lg">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/10 p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="h-6 w-6 text-primary" />
                    <p className="font-semibold text-foreground text-lg">Nuestra Ubicación</p>
                  </div>
                  <p className="text-muted-foreground text-center text-sm">
                    Quartierweg 7, 3074 Muri bei Bern, Switzerland
                  </p>
                </div>
                <iframe
                  src="https://maps.google.com/maps?q=Quartierweg%207%2C%203074%20Muri%20bei%20Bern%2C%20Switzerland&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de GMG Cleaning Services"
                ></iframe>
              </div>
            </div>

            <div className="p-8 bg-gradient-to-br from-primary/10 to-secondary/20 rounded-xl text-center">
              <h4 className="font-semibold text-primary mb-4 text-xl">Horario de atención</h4>
              <p className="text-foreground text-lg">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p className="text-foreground text-lg">Sábados: 9:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
