# 🎉 Formulario de Cotizaciones - Resumen Completo

## ✅ ¿Qué se ha implementado?

He creado un **formulario wizard interactivo de 5 pasos** ubicado directamente en el Hero de tu landing page que captura información detallada para generar cotizaciones personalizadas.

---

## 🎨 Características del Formulario

### **✨ Diseño Interactivo y Moderno**
- **Wizard de 5 pasos** con navegación fluida
- **Barra de progreso** visual con porcentaje
- **Animaciones suaves** entre pasos (fade-in con delays)
- **Auto-avance inteligente**: Al seleccionar una opción en los pasos 1-3, avanza automáticamente al siguiente
- **Validación en tiempo real**: Los botones solo se activan cuando los datos son válidos
- **Backdrop blur**: El formulario tiene efecto glassmorphism sobre el fondo

### **📱 Totalmente Responsive**
- **Mobile-first**: Optimizado primero para móviles
- **Layout adaptativo**:
  - Desktop (>1024px): Diseño de 2 columnas (texto izquierda, formulario derecha)
  - Tablet/Mobile: Stack vertical
- **Touch-friendly**: Botones grandes y espaciados para fácil interacción táctil
- **Formulario compacto**: Se adapta perfectamente a pantallas pequeñas

### **🎯 Datos que Captura**

#### **Paso 1: Tipo de Servicio** (con iconos)
- 🏠 Limpieza Residencial
- 🏢 Limpieza Comercial
- ✨ Limpieza Profunda

#### **Paso 2: Tamaño del Espacio**
- Pequeño (< 50m²)
- Mediano (50-100m²)
- Grande (100-200m²)
- Muy Grande (> 200m²)

#### **Paso 3: Frecuencia del Servicio**
- 📅 Única vez
- Semanal (7 días)
- Quincenal (15 días)
- Mensual (30 días)

#### **Paso 4: Información Adicional**
- 🐕 Número de mascotas (selector 0-5+)
- 👶 Número de niños (selector 0-5+)

#### **Paso 5: Datos de Contacto**
- Nombre completo (obligatorio)
- Teléfono (obligatorio)
- Email (obligatorio)

### **🎨 Estilo Swiss Design**
- **Colores**: Consistente con tu paleta (azul #000088, gris-azul #9FB4C7)
- **Tipografía**: Inter font, tracking ajustado
- **Espaciado**: Grid system limpio
- **Bordes**: Mínimos (rounded-sm, 0.25rem)
- **Efectos**: Backdrop blur, sombras suaves, transiciones de 300ms

### **💡 Estados y Feedback**
- **Loading**: Spinner animado con mensaje "Enviando..."
- **Success**: Checkmark verde con mensaje de confirmación
- **Error**: Alerta roja si falla el envío
- **Disabled**: Botones deshabilitados cuando faltan datos
- **Auto-reset**: El formulario se reinicia 3 segundos después del éxito

---

## 🗂️ Archivos Creados/Modificados

### **Nuevos Archivos**

1. **`src/components/QuoteWizard.tsx`**
   - Componente principal del wizard (530+ líneas)
   - Lógica de navegación entre pasos
   - Validación de formulario
   - Integración con Google Sheets API
   - Estados de loading, success y error

2. **`QUOTE_FORM_SETUP.md`**
   - Guía completa paso a paso para configurar Google Sheets
   - Código del Google Apps Script completo
   - Instrucciones de despliegue
   - Solución de problemas
   - Ejemplos de personalización

3. **`.env.example`**
   - Template para variables de entorno
   - Incluye `VITE_QUOTE_FORM_URL`

### **Archivos Modificados**

1. **`src/components/Hero.tsx`**
   - Cambiado de layout centrado a grid de 2 columnas
   - Importa y renderiza QuoteWizard
   - Removida función scrollToContact (ya no necesaria)
   - Ajustes de espaciado para mobile

2. **`.env.local`**
   - Agregada variable `VITE_QUOTE_FORM_URL` (vacía, para que la configures)

---

## 📦 Estructura del Formulario en el Hero

```
┌─────────────────────────────────────────────┐
│              HERO SECTION                   │
├─────────────────┬───────────────────────────┤
│                 │                           │
│  TEXTO          │    FORMULARIO WIZARD      │
│  (izquierda)    │    (derecha)              │
│                 │                           │
│  • Título       │  ┌─────────────────────┐ │
│  • Subtítulo    │  │ Barra de progreso   │ │
│  • Descripción  │  ├─────────────────────┤ │
│                 │  │                     │ │
│                 │  │  Paso actual        │ │
│                 │  │  (con animación)    │ │
│                 │  │                     │ │
│                 │  ├─────────────────────┤ │
│                 │  │ ← Atrás | Siguiente→│ │
│                 │  └─────────────────────┘ │
└─────────────────┴───────────────────────────┘
```

**En mobile**: Todo se apila verticalmente (texto arriba, formulario abajo)

---

## 🚀 Cómo Completar la Configuración

### **Paso 1: Crear la Hoja de Google Sheets**

1. Ve a [sheets.google.com](https://sheets.google.com)
2. Crea una hoja nueva: **"GMG Cotizaciones"**
3. En la primera fila, agrega estos encabezados:

```
timestamp | serviceType | spaceSize | frequency | pets | kids | name | phone | email | source | status
```

### **Paso 2: Crear el Google Apps Script**

1. En la hoja, ve a **Extensiones > Apps Script**
2. Copia el código que está en `QUOTE_FORM_SETUP.md` (sección "Paso 2")
3. Guarda como **"GMG Quote Form Handler"**

### **Paso 3: Probar el Script**

1. Ejecuta la función `testDoPost()` desde el editor
2. Autoriza los permisos
3. Verifica que aparezca una fila de prueba en tu hoja

### **Paso 4: Desplegar como Web App**

1. Click en **Implementar > Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Me**
4. Acceso: **Anyone**
5. Copia la URL que te da (termina en `/exec`)

### **Paso 5: Configurar en tu Proyecto**

1. Abre `.env.local` en tu proyecto
2. Pega la URL:
   ```env
   VITE_QUOTE_FORM_URL=https://script.google.com/macros/s/TU_ID_AQUI/exec
   ```
3. Guarda el archivo
4. El servidor se reiniciará automáticamente

### **Paso 6: ¡Probar!**

1. Abre tu sitio: `http://localhost:8081`
2. Deberías ver el formulario en el Hero
3. Completa los 5 pasos
4. Haz click en "Enviar cotización"
5. Verás el mensaje de éxito
6. Revisa tu Google Sheet → ¡Los datos deberían estar ahí! 🎉

---

## 💡 Detalles Técnicos

### **Tecnologías Usadas**
- **React + TypeScript**: Para el componente
- **Shadcn/ui**: Para Input, Label, Button
- **Lucide React**: Para los iconos
- **Tailwind CSS**: Para el styling
- **Google Apps Script**: Para el backend
- **Fetch API**: Para enviar los datos

### **Validación**
- **Paso 1-3**: Debe seleccionar una opción
- **Paso 4**: Opcional (valores por defecto = 0)
- **Paso 5**: Todos los campos son obligatorios

### **Timeout**
- **10 segundos**: Si Google Sheets no responde, muestra error
- **Retry**: No hay reintentos automáticos (usuario debe intentar de nuevo)

### **Caché**
- No hay caché en el formulario
- Cada envío va directo a Google Sheets
- Los datos se guardan inmediatamente

---

## 🎨 Personalización

### **Cambiar Servicios**

Edita en `QuoteWizard.tsx` línea 18:

```typescript
const serviceTypes = [
  { id: "nuevo-servicio", label: "Nuevo Servicio", icon: MiIcono, desc: "Descripción" },
];
```

### **Cambiar Tamaños**

Línea 26:

```typescript
const spaceSizes = [
  { id: "mi-tamano", label: "Mi Tamaño", range: "X-Y m²" },
];
```

### **Cambiar Frecuencias**

Línea 35:

```typescript
const frequencies = [
  { id: "mi-freq", label: "Mi Frecuencia", icon: "Xd" },
];
```

### **Cambiar Colores**

Los colores se heredan de tu tema global en `src/index.css`:
- `--primary`: #000088 (azul oscuro)
- `--secondary`: #9FB4C7 (azul-gris)

---

## 📊 Gestión de Cotizaciones

### **Columna "status"**

Usa esta columna para el seguimiento:
- **nuevo**: Recién recibida
- **contactado**: Ya contactaste al cliente
- **cotizado**: Enviaste la cotización
- **cerrado**: Confirmado o rechazado

### **Filtros en Google Sheets**

1. Selecciona la fila 1
2. **Datos > Crear filtro**
3. Ahora puedes filtrar por:
   - Tipo de servicio
   - Tamaño de espacio
   - Estado
   - Fecha

### **Notificaciones por Email**

Para recibir un email cada vez que llega una cotización:

1. Abre el Google Apps Script
2. Busca la función `sendEmailNotification`
3. Cambia `'tu-email@example.com'` por tu email real
4. Descomenta el código (quita `/*` y `*/`)
5. Guarda y despliega nueva versión

---

## 🐛 Solución de Problemas

### **El formulario no aparece**

- Verifica que el servidor esté corriendo (`npm run dev`)
- Revisa la consola del navegador (F12) en busca de errores
- Verifica que `QuoteWizard.tsx` se haya creado correctamente

### **"El formulario no está configurado correctamente"**

- Verifica que `VITE_QUOTE_FORM_URL` esté en `.env.local`
- Verifica que la URL sea correcta
- Reinicia el servidor

### **El formulario se envía pero no llega a Sheets**

- Abre el Apps Script editor
- Ve a **"Ejecuciones"** en el menú lateral
- Busca errores en las ejecuciones recientes
- Verifica que los encabezados coincidan exactamente

### **Error CORS**

- Verifica que el script esté desplegado con acceso "Anyone"
- Verifica que la URL termine en `/exec`

---

## 📈 Próximos Pasos Recomendados

1. **✅ Configurar el Google Apps Script** (10 minutos)
2. **✅ Probar el formulario** con datos reales
3. **📧 Activar notificaciones por email** (opcional)
4. **🎨 Personalizar servicios** según tus necesidades
5. **📱 Probar en diferentes dispositivos** (mobile, tablet, desktop)
6. **🔔 Configurar recordatorios** para revisar cotizaciones diariamente
7. **📊 Crear dashboard** en Google Sheets para métricas

---

## 📚 Archivos de Documentación

- **`QUOTE_FORM_SETUP.md`**: Guía detallada paso a paso (completa)
- **`RESUMEN_FORMULARIO_COTIZACIONES.md`**: Este archivo (resumen ejecutivo)
- **`.env.example`**: Template de variables de entorno

---

## 🎉 Resultado Final

Ahora tienes:

✅ Un formulario wizard interactivo de 5 pasos
✅ Diseño Swiss moderno y limpio
✅ Totalmente responsive (mobile, tablet, desktop)
✅ Animaciones suaves y feedback visual
✅ Integración directa con Google Sheets
✅ Auto-avance inteligente
✅ Validación de datos
✅ Estados de loading y error
✅ Sistema de gestión de cotizaciones
✅ Documentación completa

**Tu sitio web ahora puede capturar leads de manera profesional y organizada! 🚀**

---

## 💬 Preguntas Frecuentes

**P: ¿Puedo usar esto en producción?**
R: Sí, pero asegúrate de configurar correctamente el script de Google y probar todo antes.

**P: ¿Los datos están seguros?**
R: Los datos van directamente a tu Google Sheet privada. Solo tú tienes acceso.

**P: ¿Hay límite de cotizaciones?**
R: Google Sheets soporta hasta 5 millones de celdas, así que tienes espacio para miles de cotizaciones.

**P: ¿Puedo personalizar los campos?**
R: Sí! Edita `QuoteWizard.tsx` y el Google Apps Script para agregar/quitar campos.

**P: ¿Funciona sin JavaScript?**
R: No, el formulario requiere JavaScript habilitado en el navegador.

---

¿Listo para configurar? **Sigue las instrucciones en `QUOTE_FORM_SETUP.md`** y en 15 minutos tendrás todo funcionando! 🎯
