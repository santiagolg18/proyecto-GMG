import { useEffect, useRef } from "react";
import p5 from "p5";
import QuoteWizard from "./QuoteWizard";

const Hero = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  // Valores fijos del Hero
  const heroTitle = 'Transformamos espacios';
  const heroSubtitle = 'Creamos bienestar';
  const heroDescription = 'Servicios profesionales de aseo para tu empresa, hogar u oficina.';
  const heroImage = 'https://images.unsplash.com/photo-1669101602108-fa5ba89507ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p: p5) => {
      // ====== CLASE BURBUJA ======
      class Bubble {
        x: number;
        y: number;
        size: number;
        speedY: number;
        speedX: number;
        wobbleOffset: number;
        wobbleSpeed: number;
        alpha: number;
        color: p5.Color;
        baseColor: { r: number; g: number; b: number };
        isPopping: boolean;
        popProgress: number;
        rotation: number;
        rotationSpeed: number;
        pulseOffset: number;

        constructor() {
          // Posición inicial: abajo de la pantalla
          this.x = p.random(50, p.width - 50);
          this.y = p.height + p.random(0, 100);

          // Tamaño más grande y variable (liquid glass)
          this.size = p.random(60, 140);

          // Velocidad MUCHO más lenta (efecto flotante)
          this.speedY = p.random(0.1, 0.3);
          this.speedX = p.random(-0.1, 0.1);

          // Movimiento ondulante muy sutil
          this.wobbleOffset = p.random(0, 1000);
          this.wobbleSpeed = p.random(0.005, 0.015);

          // Rotación mínima
          this.rotation = p.random(0, p.TWO_PI);
          this.rotationSpeed = p.random(-0.005, 0.005);

          // Efecto de pulso muy sutil
          this.pulseOffset = p.random(0, 1000);

          // Opacidad MUY baja (liquid glass - casi transparente)
          this.alpha = p.random(15, 35);

          // Colores muy claros y sutiles (liquid glass style)
          const colorChoice = p.random(['frost', 'crystal', 'pearl', 'ice', 'mist']);
          switch (colorChoice) {
            case 'frost':
              this.baseColor = { r: 240, g: 245, b: 250 }; // Blanco azulado
              break;
            case 'crystal':
              this.baseColor = { r: 245, g: 248, b: 252 }; // Cristal
              break;
            case 'pearl':
              this.baseColor = { r: 250, g: 250, b: 255 }; // Perla
              break;
            case 'ice':
              this.baseColor = { r: 235, g: 242, b: 250 }; // Hielo
              break;
            case 'mist':
              this.baseColor = { r: 242, g: 246, b: 250 }; // Niebla
              break;
          }
          this.color = p.color(this.baseColor.r, this.baseColor.g, this.baseColor.b, this.alpha);

          this.isPopping = false;
          this.popProgress = 0;
        }

        // Actualiza la posición de la burbuja
        update() {
          if (this.isPopping) {
            // Animación de estallido más rápida
            this.popProgress += 0.12;
            return;
          }

          // Movimiento hacia arriba MUY lento
          this.y -= this.speedY;

          // Movimiento ondulante horizontal SUTIL
          this.x += p.sin(p.frameCount * this.wobbleSpeed + this.wobbleOffset) * 0.4;
          this.x += this.speedX;

          // Rotación muy sutil
          this.rotation += this.rotationSpeed;

          // Mantiene la burbuja dentro de los límites horizontales con wrap
          if (this.x < -100) this.x = p.width + 100;
          if (this.x > p.width + 100) this.x = -100;
        }

        // Dibuja la burbuja estilo liquid glass (minimalista, sutil, transparente)
        display() {
          if (this.isPopping) {
            this.drawPopEffect();
            return;
          }

          p.push();
          p.translate(this.x, this.y);
          p.rotate(this.rotation);

          // Efecto de pulso MUY sutil en el tamaño
          const pulseEffect = 1 + p.sin(p.frameCount * 0.05 + this.pulseOffset) * 0.02;
          const currentSize = this.size * pulseEffect;

          // Cuerpo de la burbuja - muy transparente (liquid glass)
          p.fill(this.baseColor.r, this.baseColor.g, this.baseColor.b, this.alpha);
          p.noStroke();
          p.circle(0, 0, currentSize);

          // Brillo sutil en la parte superior (único highlight minimalista)
          const highlightSize = currentSize * 0.2;
          const highlightX = -currentSize * 0.15;
          const highlightY = -currentSize * 0.15;
          p.fill(255, 255, 255, this.alpha * 0.5);
          p.circle(highlightX, highlightY, highlightSize);

          // Contorno muy sutil (casi imperceptible)
          p.noFill();
          p.strokeWeight(0.5);
          p.stroke(255, 255, 255, this.alpha * 0.3);
          p.circle(0, 0, currentSize);

          p.pop();
        }

        // Efecto de estallido minimalista (liquid glass style)
        drawPopEffect() {
          const maxProgress = 1;
          if (this.popProgress > maxProgress) return;

          p.push();
          p.translate(this.x, this.y);

          // Onda expansiva única y sutil
          const ringSize = this.size * (1 + this.popProgress * 2);
          const ringAlpha = 80 * (1 - this.popProgress);

          p.noFill();
          p.strokeWeight(1);
          p.stroke(255, 255, 255, ringAlpha);
          p.circle(0, 0, ringSize);

          // Destello central minimalista
          const flashSize = this.size * (1 + this.popProgress * 0.8);
          const flashAlpha = 60 * (1 - this.popProgress);

          p.fill(255, 255, 255, flashAlpha);
          p.noStroke();
          p.circle(0, 0, flashSize);

          p.pop();
        }

        // Verifica si el mouse está sobre la burbuja
        isHovered(mouseX: number, mouseY: number): boolean {
          const distance = p.dist(mouseX, mouseY, this.x, this.y);
          return distance < this.size / 2;
        }

        // Inicia la animación de estallido
        pop() {
          this.isPopping = true;
        }

        // Verifica si la burbuja está fuera de la pantalla o terminó de estallar
        isDead(): boolean {
          return this.y < -100 || this.popProgress > 1;
        }
      }

      // ====== CLASE PALABRA (aparece al estallar) ======
      class Word {
        x: number;
        y: number;
        text: string;
        alpha: number;
        lifespan: number;
        scale: number;
        wobble: number;

        constructor(x: number, y: number) {
          this.x = x;
          this.y = y;

          // 27 palabras relacionadas con limpieza, valores y servicios
          const words = [
            'Higiene', 'Confianza',
            'Frescura', 'Cuidado', 'Calidad', 'Profesionalismo',
            'Excelencia', 'Limpieza', 'Impecable',
            'Orden', 'Compromiso', 'Detalle', 'Eficiencia',
            'Transparencia', 'Dedicación', 'Integridad', 'Pulcritud',
            'Responsabilidad', 'Perfección', 'Desinfección'
          ];
          this.text = p.random(words);

          this.alpha = 250; // Transparente pero visible (liquid glass style)
          this.lifespan = 0;
          this.scale = 0.3; // Comienza pequeño y crece
          this.wobble = 0;
        }

        update() {
          // Flota hacia arriba con desaceleración
          const floatSpeed = 2 * (1 - this.lifespan * 0.5);
          this.y -= floatSpeed;

          // Efecto de crecimiento inicial
          if (this.scale < 1) {
            this.scale += 0.09;
          }

          // Movimiento horizontal sutil
          this.wobble += 0.1;
          this.x += p.sin(this.wobble) * 0.5;

          // Desvanece gradualmente desde alpha inicial más bajo
          this.lifespan += 0.015;
          this.alpha = 180 * (1 - this.lifespan);
        }

        display() {
          p.push();

          const currentScale = p.min(this.scale, 1);
          const textSize = 32 * currentScale;

          p.textSize(textSize);
          p.textAlign(p.CENTER, p.CENTER);
          p.textStyle(p.BOLD);

          // Sombra sutil para legibilidad (minimalista)
          p.fill(0, 0, 0, this.alpha * 0.3);
          p.text(this.text, this.x + 1, this.y + 1);

          // Halo blanco suave para resaltar
          p.fill(255, 255, 255, this.alpha * 0.4);
          p.text(this.text, this.x, this.y);

          // Texto principal en azul oscuro Swiss (transparente)
          p.fill(0, 0, 136, this.alpha); // #000088 con alpha reducido
          p.text(this.text, this.x, this.y);

          p.pop();
        }

        isDead(): boolean {
          return this.lifespan > 1;
        }
      }

      // ====== VARIABLES GLOBALES ======
      let bubbles: Bubble[] = [];
      let words: Word[] = [];
      let particleEffects: any[] = []; // Efectos de partículas adicionales
      const maxBubbles = 25; // Muy pocas burbujas (liquid glass minimalista)
      let bubbleCreationCounter = 0;

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent(canvasRef.current!);

        // Crea burbujas iniciales distribuidas por toda la pantalla
        for (let i = 0; i < maxBubbles; i++) {
          const bubble = new Bubble();
          // Distribuye las burbujas a diferentes alturas para efecto escalonado
          bubble.y = p.random(p.height * 0.2, p.height + 100);
          bubbles.push(bubble);
        }
      };

      p.draw = () => {
        // Fondo transparente para ver el video
        p.clear();

        // ====== ACTUALIZAR Y DIBUJAR BURBUJAS ======
        for (let i = bubbles.length - 1; i >= 0; i--) {
          const bubble = bubbles[i];

          bubble.update();
          bubble.display();

          // Verifica si el mouse está sobre la burbuja (solo si no está estallando)
          if (!bubble.isPopping && bubble.isHovered(p.mouseX, p.mouseY)) {
            bubble.pop();
            // Crea una palabra en la posición de la burbuja
            words.push(new Word(bubble.x, bubble.y));
          }

          // Elimina burbujas muertas
          if (bubble.isDead()) {
            bubbles.splice(i, 1);
          }
        }

        // ====== ACTUALIZAR Y DIBUJAR PALABRAS ======
        for (let i = words.length - 1; i >= 0; i--) {
          const word = words[i];

          word.update();
          word.display();

          // Elimina palabras que se desvanecieron
          if (word.isDead()) {
            words.splice(i, 1);
          }
        }

        // ====== CREAR NUEVAS BURBUJAS ======
        // Genera nuevas burbujas lentamente para mantener el estilo minimalista
        bubbleCreationCounter++;
        if (bubbles.length < maxBubbles && bubbleCreationCounter % 60 === 0) {
          // Crea una burbuja a la vez (liquid glass minimalista)
          bubbles.push(new Bubble());
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        // No eliminamos burbujas al redimensionar, solo ajustamos el canvas
      };
    };

    p5Instance.current = new p5(sketch);

    return () => {
      p5Instance.current?.remove();
    };
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen w-full overflow-hidden pt-20 md:pt-28">
      {/* Background image - positioned to avoid navbar overlap */}
      <img
        src={heroImage}
        alt="Fondo de limpieza"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0, objectPosition: 'center 30%' }}
      />

      {/* Degradado sutil en la parte inferior */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* P5.js canvas overlay with floating bubbles animation */}
      <div ref={canvasRef} className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'auto' }} />
      
      {/* Content - Two Column Layout */}
      <div className="container mx-auto px-4 md:px-8 min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-7rem)] flex items-center relative" style={{ zIndex: 2, pointerEvents: 'auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 w-full items-center py-8">

          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold mb-4 md:mb-6 tracking-tight leading-tight text-white">
              {heroTitle}
              <br/>
              <span className="text-blue-600">{heroSubtitle}</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 leading-relaxed text-gray-800 font-medium">
              {heroDescription}
            </p>
            <p className="text-xs sm:text-sm md:text-base font-medium tracking-wide mb-6 lg:mb-0 text-gray-700">
              ✨Pasa el cursor sobre las burbujas para descubrir nuestros valores✨
            </p>
          </div>

          {/* Right Column - Quote Wizard */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <QuoteWizard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
