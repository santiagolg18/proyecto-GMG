# 🔧 Script de Google Apps Mejorado (Versión 2)

## ⚠️ Importante

Si el test funciona pero los datos no llegan desde la web, usa este script mejorado que maneja mejor CORS y diferentes tipos de requests.

---

## 📝 Script Completo (Copia y Pega)

```javascript
/**
 * GMG Quote Form Handler - VERSIÓN MEJORADA
 * Maneja CORS y diferentes tipos de requests
 */

// Función principal para GET requests (retorna info)
function doGet(e) {
  return createResponse(true, 'GMG Quote Form API está activa', {
    version: '2.0',
    methods: ['POST'],
    status: 'online'
  });
}

// Función principal para POST requests (recibe cotizaciones)
function doPost(e) {
  try {
    // Log para debugging
    Logger.log('POST recibido');
    Logger.log('Content Type: ' + e.postData?.type);
    Logger.log('Contents: ' + e.postData?.contents);

    // Parsear los datos
    let data;

    if (e.postData && e.postData.contents) {
      // Datos vienen en JSON
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      // Datos vienen como parámetros de URL
      data = e.parameter;
    } else {
      throw new Error('No se recibieron datos');
    }

    Logger.log('Datos parseados: ' + JSON.stringify(data));

    // Validar datos requeridos
    if (!data.name || !data.email || !data.phone) {
      Logger.log('Faltan datos requeridos');
      return createResponse(false, 'Faltan datos requeridos: name, email, phone');
    }

    // Obtener la hoja
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Sheet1') || ss.getActiveSheet();

    // Preparar la fila de datos
    const timestamp = data.timestamp || new Date().toISOString();
    const rowData = [
      timestamp,
      translateServiceType(data.serviceType || ''),
      translateSpaceSize(data.spaceSize || ''),
      translateFrequency(data.frequency || ''),
      data.pets || '0',
      data.kids || '0',
      data.name || '',
      data.phone || '',
      data.email || '',
      data.source || 'hero_wizard',
      'nuevo'
    ];

    // Agregar la fila
    sheet.appendRow(rowData);

    Logger.log('Cotización guardada exitosamente para: ' + data.email);

    // Enviar notificación por email (opcional)
    try {
      sendEmailNotification(data);
    } catch (emailError) {
      Logger.log('Error al enviar email: ' + emailError.toString());
    }

    return createResponse(true, 'Cotización recibida exitosamente', {
      email: data.email,
      timestamp: timestamp
    });

  } catch (error) {
    Logger.log('❌ ERROR: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    return createResponse(false, 'Error al procesar: ' + error.toString());
  }
}

/**
 * Función para pruebas
 */
function testDoPost() {
  const testData = {
    serviceType: 'residencial',
    spaceSize: 'mediano',
    frequency: 'semanal',
    pets: '2',
    kids: '1',
    name: 'Test Usuario',
    phone: '+57 300 123 4567',
    email: 'test@example.com',
    timestamp: new Date().toISOString(),
    source: 'test'
  };

  const mockEvent = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log('Resultado del test:');
  Logger.log(result.getContent());
}

/**
 * Crear respuesta JSON con CORS headers
 */
function createResponse(success, message, data = null) {
  const output = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };

  if (data) {
    output.data = data;
  }

  const jsonOutput = ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);

  return jsonOutput;
}

/**
 * Traducir tipo de servicio
 */
function translateServiceType(type) {
  const translations = {
    'residencial': 'Limpieza Residencial',
    'comercial': 'Limpieza Comercial',
    'profunda': 'Limpieza Profunda'
  };
  return translations[type] || type || 'No especificado';
}

/**
 * Traducir tamaño de espacio
 */
function translateSpaceSize(size) {
  const translations = {
    'pequeno': 'Pequeño (< 50m²)',
    'mediano': 'Mediano (50-100m²)',
    'grande': 'Grande (100-200m²)',
    'muy-grande': 'Muy Grande (> 200m²)'
  };
  return translations[size] || size || 'No especificado';
}

/**
 * Traducir frecuencia
 */
function translateFrequency(freq) {
  const translations = {
    'unica': 'Única vez',
    'semanal': 'Semanal',
    'quincenal': 'Quincenal',
    'mensual': 'Mensual'
  };
  return translations[freq] || freq || 'No especificado';
}

/**
 * Enviar notificación por email
 * CONFIGURA TU EMAIL AQUÍ
 */
function sendEmailNotification(data) {
  // 🔴 CAMBIA ESTO POR TU EMAIL REAL
  const emailTo = 'tu-email@example.com';

  // Descomenta para activar notificaciones
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

/**
 * Test manual - ejecuta esto para verificar que funciona
 */
function testManual() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  sheet.appendRow([
    new Date().toISOString(),
    'Test Manual',
    'Test',
    'Test',
    '0',
    '0',
    'Test Usuario',
    '+57 300 000 0000',
    'test@test.com',
    'test_manual',
    'nuevo'
  ]);

  Logger.log('Fila de prueba agregada correctamente');
}
```

---

## 🚀 Instrucciones de Implementación

### **Paso 1: Reemplazar el Script**

1. Abre tu Google Apps Script (Extensiones > Apps Script)
2. **BORRA TODO** el código anterior
3. **COPIA Y PEGA** el script de arriba
4. Guarda (Ctrl+S / Cmd+S)

### **Paso 2: Probar el Script**

1. Selecciona la función **`testManual`** del menú desplegable
2. Click en **Ejecutar** (▶️)
3. Ve a tu hoja de Google Sheets
4. **Deberías ver una nueva fila con "Test Manual"**

Si funciona, continúa:

### **Paso 3: Probar con testDoPost**

1. Selecciona la función **`testDoPost`**
2. Click en **Ejecutar** (▶️)
3. Ve a **Ver > Registros** (o Ctrl+Enter)
4. Deberías ver:
   ```
   POST recibido
   Datos parseados: {...}
   Cotización guardada exitosamente para: test@example.com
   Resultado del test:
   {"success":true,"message":"Cotización recibida exitosamente",...}
   ```
5. Verifica tu hoja de Sheets → **Debería haber una nueva fila**

### **Paso 4: Re-desplegar**

**IMPORTANTE:** Necesitas crear una NUEVA implementación:

1. Click en **Implementar > Nueva implementación**
2. Tipo: **Aplicación web**
3. **Nueva descripción**: "GMG Quote Form v2"
4. Ejecutar como: **Me**
5. Acceso: **Anyone**
6. Click en **Implementar**
7. **COPIA LA NUEVA URL**

### **Paso 5: Actualizar .env.local**

1. Abre `.env.local`
2. Reemplaza la URL antigua con la nueva:
   ```env
   VITE_QUOTE_FORM_URL=https://script.google.com/macros/s/NUEVA_URL_AQUI/exec
   ```
3. Guarda

El servidor se reiniciará automáticamente.

---

## 🧪 Probar desde la Web

1. Abre tu sitio: `http://localhost:8081`
2. Completa el formulario
3. Abre la **consola del navegador** (F12 → Console)
4. Deberías ver mensajes como:
   ```
   ✅ CMS data loaded successfully: { services: 1, settings: 9 }
   ```
5. Envía el formulario
6. **Verifica tu Google Sheet** → Debería aparecer la nueva fila

---

## 🔍 Debugging

### **Si aún no funciona, revisa:**

#### **1. En la Consola del Navegador (F12)**

Busca mensajes de error como:
- `Failed to fetch`
- `CORS error`
- `Network error`

#### **2. En Google Apps Script (Ver > Registros)**

Después de enviar el formulario, verifica los logs:
- ¿Aparece "POST recibido"?
- ¿Los datos se parsearon correctamente?
- ¿Hay algún error?

#### **3. Verifica el Deployment**

- Ve a **Implementar > Gestionar implementaciones**
- Verifica que el acceso sea "Anyone"
- Verifica que la versión sea la más reciente

#### **4. Prueba la URL Directamente**

Abre esta URL en tu navegador:
```
https://script.google.com/macros/s/TU_NUEVA_URL/exec
```

Deberías ver:
```json
{
  "success": true,
  "message": "GMG Quote Form API está activa",
  "timestamp": "2025-11-03T...",
  "data": {
    "version": "2.0",
    "methods": ["POST"],
    "status": "online"
  }
}
```

Si ves esto, ¡el script está funcionando!

---

## 📧 Activar Notificaciones por Email

Una vez que todo funcione:

1. En el script, busca la función `sendEmailNotification`
2. Cambia `'tu-email@example.com'` por tu email real
3. Descomenta el código (quita `/*` y `*/`)
4. Guarda y re-despliega

---

## ❓ Diferencias de esta Versión

**Mejoras:**

1. ✅ Manejo mejorado de CORS
2. ✅ Mejor logging para debugging
3. ✅ Valida datos antes de guardar
4. ✅ Maneja diferentes formatos de datos
5. ✅ Función `doGet` para verificar que el script está activo
6. ✅ Mejor manejo de errores
7. ✅ Funciones de test más completas

---

## 🎯 Checklist

- [ ] Reemplazar el script en Apps Script
- [ ] Ejecutar `testManual()` - debe agregar una fila
- [ ] Ejecutar `testDoPost()` - debe agregar otra fila
- [ ] Ver los logs - deben mostrar "Cotización guardada"
- [ ] Crear nueva implementación (v2)
- [ ] Copiar la nueva URL
- [ ] Actualizar `.env.local` con la nueva URL
- [ ] Probar el formulario en la web
- [ ] Verificar que los datos lleguen a Sheets
- [ ] ✅ ¡LISTO!

---

Si después de esto sigue sin funcionar, comparte:
1. Los logs de Google Apps Script (Ver > Registros)
2. Los errores de la consola del navegador (F12)
3. Una captura de tu implementación

¡Y lo arreglaremos! 🚀
