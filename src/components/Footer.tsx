import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

const Footer = () => {
  const logoUrl = 'https://res.cloudinary.com/dqnsskjfg/image/upload/v1762199163/LOGO_MAURICIO-cropped_tarloq.svg';

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <img
                src={logoUrl}
                alt="GMG Logo"
                className="h-20 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Servicios profesionales de limpieza para tu hogar u oficina.
              Calidad garantizada.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>796927608</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>murog0723@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=100094356541894"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center">
          <p className="text-primary-foreground/80">
            &copy; {new Date().getFullYear()} GMG. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
