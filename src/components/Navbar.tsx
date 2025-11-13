import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCMSData } from "@/hooks/useCMSData";
import { getSetting } from "@/services/cms";

const Navbar = () => {
  const { data } = useCMSData();

  // Get logo and social media URLs from settings with fallbacks
  const logoUrl = getSetting(
    data?.settings || {},
    'logoUrl',
    'https://res.cloudinary.com/dqnsskjfg/image/upload/v1762199163/LOGO_MAURICIO-cropped_tarloq.svg'
  );
  const facebookUrl = getSetting(data?.settings || {}, 'facebookUrl', 'https://facebook.com');
  const instagramUrl = getSetting(data?.settings || {}, 'instagramUrl', 'https://instagram.com');
  const twitterUrl = getSetting(data?.settings || {}, 'twitterUrl', 'https://twitter.com');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary border-b border-primary shadow-sm">
      <div className="container mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoUrl}
              alt="Logo"
              className="h-24 w-auto brightness-0 invert"
            />
          </div>

          <div className="hidden md:flex items-center gap-20">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-white hover:text-secondary transition-colors font-bold text-base tracking-wide uppercase"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-white hover:text-secondary transition-colors font-bold text-base tracking-wide uppercase"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-white hover:text-secondary transition-colors font-bold text-base tracking-wide uppercase"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-white hover:text-secondary transition-colors font-bold text-base tracking-wide uppercase"
            >
              Contacto
            </button>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              <Facebook className="h-7 w-7" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              <Instagram className="h-7 w-7" />
            </a>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              <Twitter className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
