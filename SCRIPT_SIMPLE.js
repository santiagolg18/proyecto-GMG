/**
 * GMG Quote Form - VERSIÓN SIMPLE Y PROBADA
 * Copia este código COMPLETO en tu Google Apps Script
 */

// Función para GET requests (verificar que el script funciona)
function doGet(e) {
  const output = {
    success: true,
    message: "GMG Quote Form API funcionando correctamente",
    version: "3.0-simple",
    timestamp: new Date().toISOString()
  };

  return ContentService
    .createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

// Función para POST requests (recibir cotizaciones)
function doPost(e) {
  try {
    // Log para debugging
    Logger.log('=== POST RECIBIDO ===');
    Logger.log('Tipo: ' + (e.postData ? e.postData.type : 'sin postData'));
    Logger.log('Contenido: ' + (e.postData ? e.postData.contents : 'sin contenido'));

    // Parsear datos
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error('No se recibieron datos');
    }

    Logger.log('Datos parseados: ' + JSON.stringify(data));

    // Validar datos mínimos
    if (!data.name || !data.email || !data.phone) {
      throw new Error('Faltan datos: name, email o phone');
    }

    // Obtener la hoja de Google Sheets
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getActiveSheet(); // Usa la primera hoja

    // Preparar los datos para la fila
    const timestamp = new Date().toISOString();
    const rowData = [
      timestamp,
      data.serviceType || 'No especificado',
      data.spaceSize || 'No especificado',
      data.frequency || 'No especificado',
      data.pets || '0',
      data.kids || '0',
      data.name,
      data.phone,
      data.email,
      data.source || 'web',
      'nuevo'
    ];

    // Agregar la fila a la hoja
    sheet.appendRow(rowData);

    Logger.log('✅ Cotización guardada para: ' + data.email);

    // Responder con éxito
    const output = {
      success: true,
      message: "Cotización recibida exitosamente",
      email: data.email,
      timestamp: timestamp
    };

    return ContentService
      .createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('❌ ERROR: ' + error.toString());

    // Responder con error
    const output = {
      success: false,
      message: "Error: " + error.toString(),
      timestamp: new Date().toISOString()
    };

    return ContentService
      .createTextOutput(JSON.stringify(output))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Función de prueba manual
function testManual() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();

  const testRow = [
    new Date().toISOString(),
    'Test Manual',
    'Test',
    'Test',
    '0',
    '0',
    'Usuario Test',
    '+57 300 000 0000',
    'test@manual.com',
    'test',
    'nuevo'
  ];

  sheet.appendRow(testRow);
  Logger.log('✅ Fila de prueba agregada');
}

// Función de prueba con doPost
function testDoPost() {
  const mockData = {
    serviceType: 'residencial',
    spaceSize: 'mediano',
    frequency: 'semanal',
    pets: '2',
    kids: '1',
    name: 'Test Usuario',
    phone: '+57 300 111 2222',
    email: 'test@dopost.com',
    source: 'test'
  };

  const mockEvent = {
    postData: {
      type: 'application/json',
      contents: JSON.stringify(mockData)
    }
  };

  const result = doPost(mockEvent);
  Logger.log('Resultado: ' + result.getContent());
}
