# 🔧 Solución: "No se encontró la función doGet"

## ❌ El Problema

Este error ocurre cuando el deployment (implementación) está usando una **versión antigua** del script que no tiene la función `doGet()`.

---

## ✅ Solución Rápida (5 minutos)

### **Paso 1: Verificar que el código está guardado**

1. Abre tu Google Apps Script
2. Verifica que el código tenga la función `doGet`:

```javascript
function doGet(e) {
  return createResponse(true, 'GMG Quote Form API está activa', {
    version: '2.0',
    methods: ['POST'],
    status: 'online'
  });
}
```

3. Si no está, **copia el código completo** de `GOOGLE_APPS_SCRIPT_MEJORADO.md`
4. **Guarda** (Ctrl+S / Cmd+S)

---

### **Paso 2: ELIMINAR Deployments Antiguos**

**⚠️ IMPORTANTE:** No actualices, elimina y crea uno nuevo.

1. En el editor de Apps Script, haz click en **"Implementar"** (Deploy)
2. Selecciona **"Gestionar implementaciones"** (Manage deployments)
3. Verás una lista de implementaciones anteriores
4. **Haz click en el icono de papelera** 🗑️ para **ELIMINAR** todas las implementaciones viejas
5. Confirma la eliminación

---

### **Paso 3: Crear NUEVA Implementación**

1. Click en **"Implementar" > "Nueva implementación"**
2. Click en el engranaje ⚙️ junto a "Select type"
3. Selecciona **"Aplicación web"** (Web app)
4. Configura:
   - **Descripción**: `GMG Quote Form v3 - CORREGIDO`
   - **Ejecutar como**: **Me** (tu email)
   - **Acceso**: **Anyone** (Cualquiera)
5. Click en **"Implementar"**
6. **Autoriza** si te pide permisos
7. **COPIA LA URL COMPLETA** (termina en `/exec`)

Ejemplo:
```
https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXX/exec
```

---

### **Paso 4: Actualizar .env.local**

1. Abre el archivo `.env.local` en tu proyecto
2. Reemplaza la URL antigua con la **NUEVA** URL que copiaste:

```env
VITE_CMS_API_URL=https://script.google.com/macros/s/AKfycbx8SePyIzKze1Y9a96g-N6KVglJvNr8j8RSUA1B8WsmGRfCzr9eZ1Qx0Vd8-BROphZsTg/exec

# REEMPLAZA ESTA URL CON LA NUEVA
VITE_QUOTE_FORM_URL=https://script.google.com/macros/s/TU_NUEVA_URL_V3/exec
```

3. **Guarda el archivo**
4. El servidor se reiniciará automáticamente

---

### **Paso 5: Verificar que Funciona**

#### **Test 1: Verificar la API en el navegador**

Abre la URL que copiaste en tu navegador:
```
https://script.google.com/macros/s/TU_NUEVA_URL_V3/exec
```

**✅ CORRECTO:** Deberías ver esto:
```json
{
  "success": true,
  "message": "GMG Quote Form API está activa",
  "timestamp": "2025-11-03T19:XX:XX.XXXZ",
  "data": {
    "version": "2.0",
    "methods": ["POST"],
    "status": "online"
  }
}
```

**❌ ERROR:** Si ves "No se encontró la función doGet":
- Vuelve al Paso 1 y verifica que el código se guardó
- Vuelve al Paso 2 y asegúrate de eliminar TODAS las implementaciones viejas
- Vuelve al Paso 3 y crea una completamente nueva

#### **Test 2: Probar el formulario**

1. Abre tu sitio: `http://localhost:8081`
2. Abre la consola del navegador (F12)
3. Completa el formulario
4. Envía la cotización
5. Ve a tu Google Sheet → **Debería aparecer una nueva fila**

---

## 🔍 Troubleshooting Adicional

### **Si el Test 1 falla (aún sale el error doGet)**

#### **Opción A: Copiar el código línea por línea**

A veces el copy-paste no funciona bien. Intenta esto:

1. En Google Apps Script, **borra TODO el código**
2. Guarda el archivo vacío (Ctrl+S)
3. Copia **SOLO** la función `doGet`:

```javascript
function doGet(e) {
  return createResponse(true, 'GMG Quote Form API está activa', {
    version: '2.0',
    methods: ['POST'],
    status: 'online'
  });
}

function createResponse(success, message, data = null) {
  const output = {
    success: success,
    message: message,
    timestamp: new Date().toISOString()
  };

  if (data) {
    output.data = data;
  }

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Pega solo eso
5. Guarda
6. Crea un deployment nuevo
7. Prueba la URL

¿Funciona? Si sí, ahora agrega el resto del código.

#### **Opción B: Crear un proyecto nuevo**

Si nada funciona, crea un proyecto de Apps Script completamente nuevo:

1. En tu Google Sheet, ve a **Extensiones > Apps Script**
2. Verás el proyecto actual
3. Click en el nombre del proyecto (arriba a la izquierda)
4. Esto abre el Apps Script Dashboard
5. Click en **"Nuevo proyecto"**
6. Dale un nombre: **"GMG Quote Form v3"**
7. Pega el código completo
8. Guarda
9. Despliega
10. Usa la nueva URL

---

## 📝 Código Mínimo para Test

Si quieres probar con código mínimo primero:

```javascript
/**
 * CÓDIGO MÍNIMO PARA TEST
 */

function doGet(e) {
  const output = {
    success: true,
    message: "Script funcionando correctamente",
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet();

    sheet.appendRow([
      new Date().toISOString(),
      data.serviceType || '',
      data.spaceSize || '',
      data.frequency || '',
      data.pets || '0',
      data.kids || '0',
      data.name || '',
      data.phone || '',
      data.email || '',
      'hero_wizard',
      'nuevo'
    ]);

    const output = {
      success: true,
      message: "Cotización recibida"
    };

    return ContentService
      .createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    const output = {
      success: false,
      message: error.toString()
    };

    return ContentService
      .createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Usa este código para probar. Es más simple y debería funcionar sin problemas.

---

## ⚡ Resumen del Proceso

1. ✅ Copiar código correcto (con `doGet` y `doPost`)
2. ✅ Guardar en Apps Script
3. ✅ **ELIMINAR** deployments viejos
4. ✅ **CREAR NUEVO** deployment (no actualizar)
5. ✅ Copiar la NUEVA URL
6. ✅ Actualizar `.env.local`
7. ✅ Probar la URL en el navegador
8. ✅ Probar el formulario en la web

---

## 🎯 Checklist

- [ ] El código tiene las funciones `doGet` y `doPost`
- [ ] El código está guardado (Ctrl+S)
- [ ] Eliminé TODOS los deployments antiguos
- [ ] Creé un deployment COMPLETAMENTE NUEVO
- [ ] La URL del deployment es NUEVA (diferente a la anterior)
- [ ] Actualicé `.env.local` con la NUEVA URL
- [ ] Al abrir la URL en el navegador veo el JSON correcto
- [ ] El formulario envía datos exitosamente
- [ ] Los datos aparecen en Google Sheets

---

## 💡 ¿Por qué pasa esto?

Google Apps Script cachea las versiones de los deployments. Cuando actualizas el código pero usas el mismo deployment, a veces sigue usando la versión vieja.

**Solución:** Siempre crear un deployment NUEVO cuando cambias el código significativamente.

---

¿Sigue sin funcionar? Comparte:
1. Captura de pantalla del código en Apps Script
2. Captura de "Gestionar implementaciones"
3. El mensaje de error exacto
4. Lo que ves al abrir la URL en el navegador

¡Y lo arreglamos! 🚀
