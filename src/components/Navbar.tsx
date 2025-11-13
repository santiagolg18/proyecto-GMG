import { Facebook, Menu, X } from "lucide-react";
import { useCMSData } from "@/hooks/useCMSData";
import { getSetting } from "@/services/cms";
import { useState } from "react";

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Navbar = () => {
  const { data } = useCMSData();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get logo and social media URLs from settings with fallbacks
  const logoUrl = getSetting(
    data?.settings || {},
    'logoUrl',
    'https://res.cloudinary.com/dqnsskjfg/image/upload/v1762199163/LOGO_MAURICIO-cropped_tarloq.svg'
  );
  const facebookUrl = getSetting(data?.settings || {}, 'facebookUrl', 'https://facebook.com');
  const tiktokUrl = getSetting(data?.settings || {}, 'tiktokUrl', 'https://tiktok.com');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false); // Cerrar menú móvil al navegar
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/90 backdrop-blur-sm border-b border-primary shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("inicio")}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Ir al inicio"
            >
              <img
                src={logoUrl}
                alt="Logo"
                className="h-16 md:h-24 w-auto brightness-0 invert"
              />
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12 lg:gap-20">
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

            {/* Desktop Social Icons */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5">
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-colors"
              >
                <Facebook className="h-7 w-7 lg:h-9 lg:w-9" />
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-secondary transition-colors"
              >
                <TikTokIcon className="h-7 w-7 lg:h-9 lg:w-9" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:text-secondary transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-8 w-8" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-primary z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Mobile Navigation Links */}
          <div className="flex flex-col gap-6 mb-10">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-white hover:text-secondary transition-colors font-bold text-lg tracking-wide uppercase text-left"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-white hover:text-secondary transition-colors font-bold text-lg tracking-wide uppercase text-left"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-white hover:text-secondary transition-colors font-bold text-lg tracking-wide uppercase text-left"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-white hover:text-secondary transition-colors font-bold text-lg tracking-wide uppercase text-left"
            >
              Contacto
            </button>
          </div>

          {/* Mobile Social Icons */}
          <div className="flex items-center gap-6 pt-6 border-t border-white/20">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              <Facebook className="h-8 w-8" />
            </a>
            <a
              href={tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
            >
              <TikTokIcon className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
