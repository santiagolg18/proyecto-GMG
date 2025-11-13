# Configuración del Formulario de Cotizaciones

## 📋 Resumen

El formulario de cotizaciones es un wizard interactivo de 5 pasos ubicado en el Hero de tu landing page. Captura información detallada para generar cotizaciones personalizadas y envía los datos automáticamente a Google Sheets.

## 🎯 Datos que Captura el Formulario

### **Paso 1: Tipo de Servicio**
- Limpieza Residencial
- Limpieza Comercial
- Limpieza Profunda

### **Paso 2: Tamaño del Espacio**
- Pequeño (< 50m²)
- Mediano (50-100m²)
- Grande (100-200m²)
- Muy Grande (> 200m²)

### **Paso 3: Frecuencia del Servicio**
- Única vez
- Semanal
- Quincenal
- Mensual

### **Paso 4: Información Adicional**
- Número de mascotas (0-5+)
- Número de niños (0-5+)

### **Paso 5: Datos de Contacto**
- Nombre completo
- Teléfono
- Correo electrónico

---

## 🚀 Guía de Configuración Paso a Paso

### **PASO 1: Crear la Hoja de Google Sheets para Cotizaciones**

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja llamada **"GMG Cotizaciones"**
3. En la pestaña principal (Sheet1), crea estos encabezados en la **fila 1**:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| **timestamp** | **serviceType** | **spaceSize** | **frequency** | **pets** | **kids** | **name** | **phone** | **email** | **source** | **status** |

**Descripción de las columnas:**
- **timestamp**: Fecha y hora de envío
- **serviceType**: Tipo de servicio (residencial, comercial, profunda)
- **spaceSize**: Tamaño del espacio (pequeno, mediano, grande, muy-grande)
- **frequency**: Frecuencia del servicio (unica, semanal, quincenal, mensual)
- **pets**: Número de mascotas (0-5)
- **kids**: Número de niños (0-5)
- **name**: Nombre completo del cliente
- **phone**: Teléfono del cliente
- **email**: Email del cliente
- **source**: Origen del formulario (hero_wizard)
- **status**: Estado de la cotización (nuevo, contactado, cotizado, cerrado)

---

### **PASO 2: Crear el Google Apps Script**

1. En tu hoja "GMG Cotizaciones", ve a **Extensiones > Apps Script**
2. Borra el código existente
3. Copia y pega el siguiente código:

```javascript
/**
 * GMG Quote Form Handler
 * Recibe cotizaciones del formulario wizard y las guarda en Google Sheets
 */

function doPost(e) {
  try {
    // Obtener la hoja activa
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Sheet1') || ss.getActiveSheet();

    // Parsear los datos JSON
    const data = JSON.parse(e.postData.contents);

    // Validar datos requeridos
    if (!data.name || !data.email || !data.phone) {
      return createResponse(false, 'Faltan datos requeridos');
    }

    // Preparar la fila de datos
    const timestamp = data.timestamp || new Date().toISOString();
    const rowData = [
      timestamp,
      translateServiceType(data.serviceType),
      translateSpaceSize(data.spaceSize),
      translateFrequency(data.frequency),
      data.pets || '0',
      data.kids || '0',
      data.name,
      data.phone,
      data.email,
      data.source || 'hero_wizard',
      'nuevo' // Estado inicial
    ];

    // Agregar la fila al final de la hoja
    sheet.appendRow(rowData);

    // Log exitoso
    Logger.log('Cotización recibida: ' + data.email);

    // Enviar notificación por email (opcional)
    sendEmailNotification(data);

    return createResponse(true, 'Cotización recibida exitosamente');

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse(false, 'Error al procesar la cotización: ' + error.toString());
  }
}

/**
 * Función de prueba para verificar que el script funciona
 */
function testDoPost() {
  const testData = {
    serviceType: 'residencial',
    spaceSize: 'mediano',
    frequency: 'semanal',
    pets: '2',
    kids: '1',
    name: 'Test User',
    phone: '+57 300 123 4567',
    email: 'test@example.com',
    timestamp: new Date().toISOString(),
    source: 'test'
  };

  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

/**
 * Crear respuesta JSON
 */
function createResponse(success, message) {
  const output = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Traducir tipo de servicio a español
 */
function translateServiceType(type) {
  const translations = {
    'residencial': 'Limpieza Residencial',
    'comercial': 'Limpieza Comercial',
    'profunda': 'Limpieza Profunda'
  };
  return translations[type] || type;
}

/**
 * Traducir tamaño de espacio a español
 */
function translateSpaceSize(size) {
  const translations = {
    'pequeno': 'Pequeño (< 50m²)',
    'mediano': 'Mediano (50-100m²)',
    'grande': 'Grande (100-200m²)',
    'muy-grande': 'Muy Grande (> 200m²)'
  };
  return translations[size] || size;
}

/**
 * Traducir frecuencia a español
 */
function translateFrequency(freq) {
  const translations = {
    'unica': 'Única vez',
    'semanal': 'Semanal',
    'quincenal': 'Quincenal',
    'mensual': 'Mensual'
  };
  return translations[freq] || freq;
}

/**
 * Enviar notificación por email (opcional)
 * Descomenta y configura tu email para recibir notificaciones
 */
function sendEmailNotification(data) {
  // Configura tu email aquí
  const emailTo = 'tu-email@example.com';

  // Descomenta las siguientes líneas para activar las notificaciones
  /*
  const subject = '🧹 Nueva Cotización - ' + data.name;
  const body = `
    Nueva cotización recibida:

    👤 Cliente: ${data.name}
    📱 Teléfono: ${data.phone}
    📧 Email: ${data.email}

    📋 Detalles del Servicio:
    - Tipo: ${translateServiceType(data.serviceType)}
    - Tamaño: ${translateSpaceSize(data.spaceSize)}
    - Frecuencia: ${translateFrequency(data.frequency)}
    - Mascotas: ${data.pets}
    - Niños: ${data.kids}

    ⏰ Fecha: ${new Date(data.timestamp).toLocaleString('es-CO')}

    ¡Contacta al cliente pronto!
  `;

  MailApp.sendEmail(emailTo, subject, body);
  */
}
```

4. Cambia el nombre del proyecto a **"GMG Quote Form Handler"**
5. Guarda el proyecto (Ctrl+S o Cmd+S)

---

### **PASO 3: Probar el Script**

1. En el editor de Apps Script, selecciona la función **`testDoPost`** del menú desplegable
2. Haz clic en el botón **"Ejecutar"** (▶️)
3. Autoriza el script (igual que antes)
4. Ve a tu hoja de Google Sheets
5. **Deberías ver una nueva fila con datos de prueba**

Si ves la fila, ¡el script funciona! ✅

---

### **PASO 4: Desplegar como Web App**

1. En el editor de Apps Script, haz clic en **"Implementar"** → **"Nueva implementación"**
2. Selecciona tipo: **"Aplicación web"**
3. Configura:
   - **Description**: "GMG Quote Form v1"
   - **Execute as**: **Me** (tu cuenta)
   - **Who has access**: **Anyone** (cualquiera)
4. Haz clic en **"Implementar"**
5. **Copia la URL** que te aparece. Se verá así:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXX/exec
   ```

---

### **PASO 5: Configurar en tu Sitio Web**

1. Abre el archivo `.env.local` en tu proyecto
2. Pega la URL que copiaste:

```env
VITE_QUOTE_FORM_URL=https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec
```

3. Guarda el archivo
4. **Reinicia tu servidor de desarrollo:**

```bash
# Detener el servidor (Ctrl+C)
# Luego ejecutar de nuevo:
npm run dev
```

---

### **PASO 6: ¡Probar el Formulario!**

1. Abre tu sitio web: `http://localhost:8081`
2. Verás el formulario wizard en el Hero
3. Completa los 5 pasos
4. Haz clic en **"Enviar cotización"**
5. Deberías ver el mensaje: **"¡Cotización enviada!"**
6. Ve a tu Google Sheet → **¡Debería aparecer una nueva fila con tus datos!** 🎉

---

## 🎨 Características del Formulario

### **✨ Interactividad**
- **Wizard de 5 pasos** con navegación suave
- **Barra de progreso** visual
- **Animaciones** entre pasos
- **Auto-avance** al seleccionar opciones (pasos 1-3)
- **Validación** en tiempo real

### **📱 Responsive Design**
- **Mobile-first**: Optimizado para móviles
- **Adaptativo**: Se ajusta a tablets y desktop
- **Touch-friendly**: Botones grandes para tocar fácilmente

### **🎨 Swiss Design**
- **Colores consistentes** con la marca
- **Tipografía limpia** y legible
- **Espaciado uniforme** y grid system
- **Backdrop blur** en el formulario para destacarlo

### **♿ Accesibilidad**
- **Labels** semánticos
- **Navegación por teclado**
- **Estados de loading** y error claros
- **Mensajes descriptivos**

---

## 🔧 Personalización

### **Cambiar los Servicios Disponibles**

Edita en `/src/components/QuoteWizard.tsx`:

```typescript
const serviceTypes = [
  { id: "mi-servicio", label: "Mi Servicio", icon: Home, desc: "Descripción" },
  // Agregar más servicios aquí
];
```

### **Cambiar los Tamaños de Espacio**

```typescript
const spaceSizes = [
  { id: "mi-tamano", label: "Mi Tamaño", range: "X-Y m²" },
  // Agregar más tamaños aquí
];
```

### **Activar Notificaciones por Email**

En el Google Apps Script, en la función `sendEmailNotification`:

1. Cambia `'tu-email@example.com'` por tu email real
2. Descomenta las líneas del código (quita los `/*` y `*/`)
3. Guarda y despliega una nueva versión

---

## 📊 Gestión de Cotizaciones

### **Columna "status"**

Usa esta columna para gestionar el estado de cada cotización:

- **nuevo**: Recién recibida, sin procesar
- **contactado**: Ya contactaste al cliente
- **cotizado**: Enviaste la cotización
- **cerrado**: Servicio confirmado o rechazado

### **Filtrar y Ordenar**

En Google Sheets:
1. Selecciona la fila 1 (encabezados)
2. Haz clic en **Datos > Crear filtro**
3. Ahora puedes filtrar por tipo de servicio, estado, fecha, etc.

### **Crear Informes**

Puedes usar fórmulas de Google Sheets para analizar tus cotizaciones:

```
// Contar cotizaciones por tipo de servicio
=COUNTIF(B:B, "Limpieza Residencial")

// Promedio de mascotas por cotización
=AVERAGE(E:E)

// Cotizaciones del mes actual
=COUNTIFS(A:A, ">="&DATE(YEAR(TODAY()), MONTH(TODAY()), 1))
```

---

## 🐛 Solución de Problemas

### **Error: "El formulario no está configurado correctamente"**

**Causa**: `VITE_QUOTE_FORM_URL` no está definida en `.env.local`

**Solución**:
1. Verifica que el archivo `.env.local` existe
2. Verifica que la URL es correcta
3. Reinicia el servidor (`npm run dev`)

### **El formulario se envía pero no aparece en Sheets**

**Causa**: Error en el Google Apps Script

**Solución**:
1. Ve al editor de Apps Script
2. Haz clic en **"Ejecuciones"** en el menú lateral
3. Busca errores en las ejecuciones recientes
4. Revisa que los encabezados de tu hoja coincidan exactamente

### **Error: "Failed to fetch"**

**Causa**: CORS o URL incorrecta

**Solución**:
1. Verifica que desplegaste el script como "Anyone can access"
2. Verifica que la URL termina en `/exec`
3. Intenta acceder a la URL desde el navegador

---

## 🚀 Mejoras Futuras

### **Validación Avanzada**

Agregar validación de formato para:
- Teléfonos (formato colombiano)
- Emails (regex más estricto)
- Nombres (sin números)

### **Auto-respuesta Email**

Enviar un email automático al cliente confirmando que recibiste su solicitud.

### **Integración con CRM**

Conectar con Zapier, Make.com, o tu CRM favorito para automatizar el seguimiento.

### **Analytics**

Agregar Google Analytics para trackear:
- Abandono en cada paso del wizard
- Conversión de formularios
- Servicios más solicitados

---

## 📚 Recursos Adicionales

- **Documentación de Google Apps Script**: https://developers.google.com/apps-script
- **Iconos Lucide React**: https://lucide.dev
- **Shadcn/ui**: https://ui.shadcn.com

---

## ✅ Checklist de Implementación

- [ ] Crear hoja de Google Sheets "GMG Cotizaciones"
- [ ] Agregar encabezados en fila 1
- [ ] Crear Google Apps Script
- [ ] Probar el script con `testDoPost()`
- [ ] Desplegar script como Web App
- [ ] Copiar URL del script
- [ ] Agregar URL a `.env.local`
- [ ] Reiniciar servidor de desarrollo
- [ ] Probar formulario en el sitio web
- [ ] Verificar que los datos llegan a Sheets
- [ ] (Opcional) Activar notificaciones por email
- [ ] (Opcional) Personalizar servicios y opciones

---

¡Listo! Ahora tienes un formulario de cotizaciones completamente funcional que captura leads de manera profesional y los organiza automáticamente en Google Sheets. 🎉
