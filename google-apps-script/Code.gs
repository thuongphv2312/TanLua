/**
 * ============================================================
 * TanLua KiotViet Integration - Google Apps Script
 * ============================================================
 * 
 * HƯỚNG DẪN TRIỂN KHAI:
 * 1. Tạo một Google Sheet mới, đặt tên: "TanLua_KiotViet_Data"
 * 2. Vào Extensions > Apps Script
 * 3. Xóa code mặc định, paste toàn bộ code này vào
 * 4. Chạy hàm initializeSheets() một lần để tạo cấu trúc Sheet
 * 5. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy URL của Web App để dùng trong Frontend
 * 7. Cấu hình URL này làm Webhook URL trong KiotViet
 * 
 * ============================================================
 */

// ==================== CONSTANTS ====================
const SHEET_NAMES = {
  CONFIG: 'Config',
  CUSTOMERS: 'Customers',
  ORDERS: 'Orders',
  DEBTS: 'Debts'
};

const KIOTVIET_TOKEN_URL = 'https://id.kiotviet.vn/connect/token';
const KIOTVIET_API_BASE = 'https://public.kiotapi.com';

// ==================== INITIALIZATION ====================

/**
 * Chạy hàm này MỘT LẦN để tạo cấu trúc Google Sheet
 */
function initializeSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Config sheet
  let configSheet = ss.getSheetByName(SHEET_NAMES.CONFIG);
  if (!configSheet) {
    configSheet = ss.insertSheet(SHEET_NAMES.CONFIG);
  }
  configSheet.clear();
  configSheet.appendRow(['key', 'value']);
  configSheet.appendRow(['adminPassword', 'tanlua2024']); // Mật khẩu mặc định, nên đổi
  configSheet.appendRow(['lastSyncTime', '']);
  configSheet.appendRow(['retailerName', '']);
  configSheet.appendRow(['totalCustomers', '0']);
  configSheet.appendRow(['newEventsCount', '0']);
  configSheet.appendRow(['isConfigured', 'false']);

  // Customers sheet
  let custSheet = ss.getSheetByName(SHEET_NAMES.CUSTOMERS);
  if (!custSheet) {
    custSheet = ss.insertSheet(SHEET_NAMES.CUSTOMERS);
  }
  custSheet.clear();
  custSheet.appendRow([
    'id', 'code', 'name', 'contactNumber', 'email', 'address',
    'ward', 'district', 'city', 'organization', 'group',
    'debt', 'totalRevenue', 'totalPoint', 'createdDate', 'modifiedDate', 'isNew'
  ]);

  // Orders sheet
  let orderSheet = ss.getSheetByName(SHEET_NAMES.ORDERS);
  if (!orderSheet) {
    orderSheet = ss.insertSheet(SHEET_NAMES.ORDERS);
  }
  orderSheet.clear();
  orderSheet.appendRow([
    'orderId', 'code', 'customerId', 'customerName', 'phone',
    'products', 'totalAmount', 'discount', 'status', 'statusValue',
    'purchaseDate', 'modifiedDate'
  ]);

  // Debts sheet
  let debtSheet = ss.getSheetByName(SHEET_NAMES.DEBTS);
  if (!debtSheet) {
    debtSheet = ss.insertSheet(SHEET_NAMES.DEBTS);
  }
  debtSheet.clear();
  debtSheet.appendRow([
    'customerId', 'customerName', 'phone', 'totalDebt',
    'totalPaid', 'remaining', 'lastTransactionDate', 'note'
  ]);

  // Xóa sheet mặc định nếu có
  const defaultSheet = ss.getSheetByName('Sheet1');
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }

  // Logs sheet
  let logSheet = ss.getSheetByName('Logs');
  if (!logSheet) {
    logSheet = ss.insertSheet('Logs');
    logSheet.appendRow(['Timestamp', 'Context', 'Message']);
  }

  Logger.log('✅ Khởi tạo Sheets thành công!');
}

// ==================== WEB APP HANDLERS ====================

/**
 * Handle GET requests (from Frontend)
 */
function doGet(e) {
  const action = e.parameter.action;
  let result;

  try {
    switch (action) {
      case 'login':
        result = handleLogin(e.parameter.password);
        break;
      case 'check_setup':
        result = handleCheckSetup();
        break;
      case 'get_customers':
        result = handleGetCustomers(e.parameter);
        break;
      case 'get_orders':
        result = handleGetOrders(e.parameter);
        break;
      case 'get_debts':
        result = handleGetDebts(e.parameter);
        break;
      case 'search_customer':
        result = handleSearchCustomer(e.parameter.query);
        break;
      case 'check_new_events':
        result = handleCheckNewEvents();
        break;
      case 'get_stats':
        result = handleGetStats();
        break;
      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }
  } catch (error) {
    result = { success: false, error: error.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests (from Frontend & KiotViet Webhook)
 */
function doPost(e) {
  let result;

  try {
    const body = JSON.parse(e.postData.contents);

    // Check if this is a KiotViet Webhook
    const signature = e.parameter['x-kiotviet-signature'] ||
      (e.headers && e.headers['x-kiotviet-signature']);

    if (body.Notifications || body.eventName || signature) {
      result = handleWebhook(body, e);
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Otherwise it's from Frontend
    const action = body.action;

    switch (action) {
      case 'setup':
        result = handleSetup(body);
        break;
      case 'full_sync':
        result = handleFullSync();
        break;
      case 'incremental_sync':
        result = handleIncrementalSync();
        break;
      case 'update_password':
        result = handleUpdatePassword(body.oldPassword, body.newPassword);
        break;
      case 'reset_config':
        result = handleResetConfig(body.password);
        break;
      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }
  } catch (error) {
    result = { success: false, error: error.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==================== AUTH & SETUP ====================

function handleLogin(password) {
  const adminPwd = getConfigValue('adminPassword');
  if (password === adminPwd) {
    return { success: true, message: 'Đăng nhập thành công' };
  }
  return { success: false, error: 'Mật khẩu không đúng' };
}

function handleCheckSetup() {
  const isConfigured = getConfigValue('isConfigured');
  const retailerName = getConfigValue('retailerName');
  return {
    success: true,
    isConfigured: isConfigured === 'true',
    retailerName: retailerName || ''
  };
}

function handleSetup(body) {
  const { clientId, clientSecret, retailerName } = body;

  if (!clientId || !clientSecret || !retailerName) {
    return { success: false, error: 'Thiếu thông tin cấu hình' };
  }

  // Test connection trước khi lưu
  try {
    const token = getKiotVietToken(clientId, clientSecret);
    if (!token) {
      return { success: false, error: 'Không thể kết nối KiotViet. Kiểm tra lại ClientId/Secret.' };
    }
  } catch (err) {
    return { success: false, error: 'Lỗi kết nối KiotViet: ' + err.toString() };
  }

  // Lưu vào Script Properties (an toàn)
  const props = PropertiesService.getScriptProperties();
  props.setProperty('kv_clientId', clientId);
  props.setProperty('kv_clientSecret', clientSecret);
  props.setProperty('kv_retailer', retailerName);

  // Cập nhật Config sheet
  setConfigValue('retailerName', retailerName);
  setConfigValue('isConfigured', 'true');

  return { success: true, message: 'Cấu hình KiotViet thành công!' };
}

function handleUpdatePassword(oldPwd, newPwd) {
  const currentPwd = getConfigValue('adminPassword');
  if (oldPwd !== currentPwd) {
    return { success: false, error: 'Mật khẩu cũ không đúng' };
  }
  setConfigValue('adminPassword', newPwd);
  return { success: true, message: 'Đổi mật khẩu thành công' };
}

function handleResetConfig(password) {
  const adminPwd = getConfigValue('adminPassword');
  if (String(password) !== String(adminPwd)) {
    return { success: false, error: 'Mật khẩu quản trị không đúng' };
  }
  setConfigValue('isConfigured', 'false');
  setConfigValue('retailerName', '');
  // Optional: clear script properties? 
  // No, just overwrite next time.
  return { success: true, message: 'Đã xóa cấu hình. Vui lòng thiết lập lại.' };
}

// ==================== KIOTVIET API ====================

function getKiotVietToken(clientId, clientSecret) {
  // Nếu không truyền params, lấy từ Properties
  if (!clientId) {
    const props = PropertiesService.getScriptProperties();
    clientId = props.getProperty('kv_clientId');
    clientSecret = props.getProperty('kv_clientSecret');
  }

  const payload = {
    'scopes': 'PublicApi.Access',
    'grant_type': 'client_credentials',
    'client_id': clientId,
    'client_secret': clientSecret
  };

  const options = {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: payload,
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(KIOTVIET_TOKEN_URL, options);
  const data = JSON.parse(response.getContentText());

  if (data.access_token) {
    // Cache token
    const props = PropertiesService.getScriptProperties();
    props.setProperty('kv_token', data.access_token);
    props.setProperty('kv_token_expires', String(Date.now() + (data.expires_in * 1000)));
    return data.access_token;
  }

  throw new Error('Không lấy được token: ' + JSON.stringify(data));
}

function getValidToken() {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('kv_token');
  const expires = Number(props.getProperty('kv_token_expires') || 0);

  if (token && Date.now() < expires - 60000) { // 1 phút buffer
    return token;
  }

  return getKiotVietToken();
}

function callKiotVietAPI(endpoint, params) {
  const token = getValidToken();
  const props = PropertiesService.getScriptProperties();
  const retailer = props.getProperty('kv_retailer');
  
  // Log request for debugging
  // logError('API Request', endpoint + ' ' + JSON.stringify(params));

  let url = KIOTVIET_API_BASE + endpoint;
  if (params) {
    const queryString = Object.entries(params)
      .map(([key, value]) => key + '=' + encodeURIComponent(value))
      .join('&');
    url += '?' + queryString;
  }

  const options = {
    method: 'get',
    headers: {
      'Retailer': retailer,
      'Authorization': 'Bearer ' + token
    },
    muteHttpExceptions: true
  };

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const response = UrlFetchApp.fetch(url, options);
      const responseCode = response.getResponseCode();
      const content = response.getContentText();
      
      if (responseCode !== 200) {
        logError('API Error ' + endpoint, 'Code: ' + responseCode + ', Body: ' + content);
        throw new Error('KiotViet API Error (' + responseCode + '). Xem tab Logs để biết chi tiết.');
      }

      return JSON.parse(content);
    } catch (err) {
      retries++;
      const isNetworkError = err.toString().includes('Address unavailable') || 
                             err.toString().includes('Địa chỉ không khả dụng') ||
                             err.toString().includes('DNS') || 
                             err.toString().includes('socket') ||
                             err.toString().includes('Service invoked too many times') ||
                             err.toString().includes('timeout') ||
                             err.toString().includes('Exceeded maximum execution time');
      
      if (isNetworkError && retries < maxRetries) {
        logError('API Retry ' + retries, endpoint + ': ' + err.toString() + ' -> Waiting ' + (retries * 2) + 's');
        Utilities.sleep(retries * 2000); 
        continue;
      }
      
      logError('API Exception ' + endpoint, err.toString());
      throw err;
    }
  }
}

// ==================== SYNC OPERATIONS ====================

function handleFullSync() {
  try {
    logError('Full Sync', 'Started');
    
    // 1. Sync Customers
    const customerResult = syncAllCustomers();
    logError('Full Sync', 'Customers synced: ' + customerResult.total);

    // 2. Sync Orders
    let orderResult = { total: 0 };
    try {
        orderResult = syncAllOrders();
        logError('Full Sync', 'Orders synced: ' + orderResult.total);
    } catch (e) {
        logError('Full Sync Warning', 'Orders sync failed: ' + e.toString());
    }

    // 3. Update Debts from customers
    try {
        updateDebtsFromCustomers();
        logError('Full Sync', 'Debts updated');
    } catch (e) {
        logError('Full Sync Warning', 'Debts update failed: ' + e.toString());
    }

    // 4. Update config
    const now = new Date().toISOString();
    setConfigValue('lastSyncTime', now);
    setConfigValue('totalCustomers', String(customerResult.total));
    setConfigValue('newEventsCount', '0');

    logError('Full Sync', 'Completed Successfully');

    return {
      success: true,
      message: 'Full sync hoàn tất!',
      customers: customerResult.total,
      orders: orderResult.total,
      syncTime: now
    };
  } catch (error) {
    logError('Full Sync Error', error.toString());
    return { success: false, error: 'Lỗi Full Sync: ' + error.toString() };
  }
}

function handleIncrementalSync() {
  try {
    const lastSync = getConfigValue('lastSyncTime');
    if (!lastSync) {
      return handleFullSync(); // Chưa sync lần nào thì full sync
    }

    // 1. Sync new/updated customers
    const customerResult = syncCustomersFrom(lastSync);

    // 2. Sync new orders  
    const orderResult = syncOrdersFrom(lastSync);

    // 3. Update debts
    updateDebtsFromCustomers();

    // 4. Update config
    const now = new Date().toISOString();
    setConfigValue('lastSyncTime', now);
    setConfigValue('newEventsCount', '0');

    // Recalculate total
    const custSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CUSTOMERS);
    const totalRows = Math.max(0, custSheet.getLastRow() - 1);
    setConfigValue('totalCustomers', String(totalRows));

    return {
      success: true,
      message: 'Incremental sync hoàn tất!',
      newCustomers: customerResult.newCount,
      updatedCustomers: customerResult.updatedCount,
      newOrders: orderResult.total,
      syncTime: now
    };
  } catch (error) {
    return { success: false, error: 'Lỗi Incremental Sync: ' + error.toString() };
  }
}


// ==================== SAFER SYNC HELPERS ====================

function syncSafeInternal(sheetName, endpoint, mapper, pageSize, orderBy, stopTimestamp) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const targetSheet = ss.getSheetByName(sheetName);
  const tempName = sheetName + '_Temp';
  
  // Cleanup old temp
  const oldTemp = ss.getSheetByName(tempName);
  if (oldTemp) ss.deleteSheet(oldTemp);
  
  const tempSheet = ss.insertSheet(tempName);
  
  try {
    // Copy Header
    const headers = targetSheet.getRange(1, 1, 1, targetSheet.getLastColumn()).getValues();
    tempSheet.getRange(1, 1, 1, headers[0].length).setValues(headers);
    
    let currentItem = 0;
    let total = 0;
    let allRows = [];

    while (true) {
       const params = {
          pageSize: pageSize,
          currentItem: currentItem
       };
       if (orderBy) {
          params.orderBy = orderBy;
          params.orderDirection = 'Desc';
       }

       const data = callKiotVietAPI(endpoint, params);
       if (!data.data || data.data.length === 0) break;
       
       const rows = data.data.map(item => mapper(item));
       allRows = allRows.concat(rows);
       total += data.data.length;

       // Check Stop Timestamp (Stop if older than limit)
       if (stopTimestamp && data.data.length > 0) {
          const lastItem = data.data[data.data.length - 1];
          const itemDate = new Date(lastItem.createdDate || lastItem.purchaseDate || lastItem.modifiedDate); // Fallback
          // If itemDate < stopTimestamp, we stop fetching further pages
          if (itemDate < stopTimestamp) break;
       }

       // Batch write every 500 rows to save memory
       if (allRows.length >= 500) {
          tempSheet.getRange(tempSheet.getLastRow() + 1, 1, allRows.length, allRows[0].length).setValues(allRows);
          allRows = [];
       }

       currentItem += pageSize;
       if (data.data.length < pageSize) break;
       if (total > 50000) break; // Safety limit
    }

    // Write remaining
    if (allRows.length > 0) {
      tempSheet.getRange(tempSheet.getLastRow() + 1, 1, allRows.length, allRows[0].length).setValues(allRows);
    }
    
    // SUCCESS: Swap data
    if (tempSheet.getLastRow() > 1) {
       // Only clear contents to preserve formatting
       targetSheet.clearContents(); 
       
       // Use getValues/setValues for robust data transfer
       const dataValues = tempSheet.getDataRange().getValues();
       targetSheet.getRange(1, 1, dataValues.length, dataValues[0].length).setValues(dataValues);
       
       // Update config timestamp for this successful sync? No, done in handleFullSync.
    }
    
    ss.deleteSheet(tempSheet);
    return { total: total };

  } catch (e) {
    try { ss.deleteSheet(tempSheet); } catch (ex) {}
    throw new Error('Sync Failed: ' + e.toString() + '. Dữ liệu cũ vẫn an toàn.');
  }
}

// ... syncAllCustomers / syncAllOrders ... (unchanged)

// ...

function handleGetOrders(params) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.ORDERS);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return { success: true, data: [], total: 0 };
  }

  const headers = data[0];
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);
  const customerId = params.customerId;
  const fromDate = params.fromDate ? new Date(params.fromDate) : null;
  const toDate = params.toDate ? new Date(params.toDate) : null;

  let filteredData = data.slice(1);

  // Filter by customerId
  if (customerId) {
    const custIdCol = headers.indexOf('customerId');
    filteredData = filteredData.filter(row => String(row[custIdCol]) === String(customerId));
  }

  // Filter by Date (PurchaseDate is col 10 in orderToRow - index 10)
  // Or find index dynamically? 'purchaseDate'
  if (fromDate || toDate) {
      const dateIndex = 10; // purchaseDate based on orderToRow structure
      filteredData = filteredData.filter(row => {
          const rowDateStr = row[dateIndex];
          if (!rowDateStr) return false;
          const rowDate = new Date(rowDateStr);
          if (isNaN(rowDate.getTime())) return false; // Invalid date
          
          if (fromDate && rowDate < fromDate) return false;
          if (toDate) {
             // Set toDate to end of day?
             const toDateEnd = new Date(toDate);
             toDateEnd.setHours(23, 59, 59, 999);
             if (rowDate > toDateEnd) return false;
          }
          return true;
      });
  }

  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, filteredData.length);
  const pageData = filteredData.slice(start, end);

  const orders = pageData.map(row => {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = row[idx]; });
    return obj;
  });

  return {
    success: true,
    data: orders,
    total: filteredData.length,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(filteredData.length / pageSize)
  };
}

function syncAllCustomers() {
  return syncSafeInternal(SHEET_NAMES.CUSTOMERS, '/customers', (c) => customerToRow(c, false), 50, 'createdDate');
}

function syncCustomersFrom(fromDate) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CUSTOMERS);

  let currentItem = 0;
  const pageSize = 50;
  let newCount = 0;
  let updatedCount = 0;

  while (true) {
    const data = callKiotVietAPI('/customers', {
      pageSize: pageSize,
      currentItem: currentItem,
      lastModifiedFrom: fromDate
    });

    if (!data.data || data.data.length === 0) break;

    data.data.forEach(customer => {
      const result = upsertCustomer(sheet, customer);
      if (result === 'new') newCount++;
      else if (result === 'updated') updatedCount++;
    });

    currentItem += pageSize;
    if (data.data.length < pageSize) break;
  }

  return { newCount, updatedCount };
}

function syncAllOrders() {
  // Limit Full Sync to last 90 days to prevent timeout
  const limitDate = new Date();
  limitDate.setDate(limitDate.getDate() - 90);
  return syncSafeInternal(SHEET_NAMES.ORDERS, '/orders', (o) => orderToRow(o), 20, 'createdDate', limitDate);
}

function syncOrdersFrom(fromDate) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.ORDERS);
  let currentItem = 0;
  const pageSize = 100;
  let total = 0;

  while (true) {
    const data = callKiotVietAPI('/orders', {
      pageSize: pageSize,
      currentItem: currentItem,
      lastModifiedFrom: fromDate
    });

    if (!data.data || data.data.length === 0) break;

    data.data.forEach(order => {
      const row = orderToRow(order);
      sheet.appendRow(row);
      total++;
    });

    currentItem += pageSize;
    if (data.data.length < pageSize) break;
  }

  return { total };
}

// ==================== DATA HELPERS ====================

function customerToRow(c, isNew) {
  const groups = c.groups || c.Groups || [];
  return [
    c.id || c.Id || '',
    c.code || c.Code || '',
    c.name || c.Name || '',
    c.contactNumber || c.ContactNumber || '',
    c.email || c.Email || '',
    c.address || c.Address || '',
    c.wardName || c.WardName || '',
    c.locationName || c.LocationName || '',  // district
    c.cityName || c.CityName || '',      // city  
    c.organization || c.Organization || '',
    Array.isArray(groups) ? groups.map(g => g.name || g.Name).join(', ') : '',
    c.debt || c.Debt || 0,
    c.totalRevenue || c.TotalRevenue || 0,
    c.totalPoint || c.TotalPoint || 0,
    c.createdDate || c.CreatedDate || '',
    c.modifiedDate || c.ModifiedDate || '',
    isNew ? 'true' : 'false'
  ];
}

function orderToRow(o) {
  const details = o.orderDetails || o.OrderDetails || [];
  const products = details.map(d =>
    (d.productName || d.ProductName || '') + ' (SL: ' + (d.quantity || d.Quantity || 0) + ')'
  ).join(', ');

  return [
    o.id || o.Id || '',
    o.code || o.Code || '',
    o.customerId || o.CustomerId || '',
    o.customerName || o.CustomerName || '',
    o.customerPhone || o.CustomerPhone || '',
    products,
    o.total || o.Total || 0,
    o.discount || o.Discount || 0,
    o.statusValue || o.StatusValue || '',
    o.status || o.Status || '',
    o.purchaseDate || o.createdDate || o.PurchaseDate || o.CreatedDate || '',
    o.modifiedDate || o.ModifiedDate || ''
  ];
}

function upsertCustomer(sheet, customer) {
  const data = sheet.getDataRange().getValues();
  const idCol = 0; // Column A = id

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][idCol]) === String(customer.id)) {
      // Update existing
      const row = customerToRow(customer, false);
      sheet.getRange(i + 1, 1, 1, row.length).setValues([row]);
      return 'updated';
    }
  }

  // Insert new
  const row = customerToRow(customer, true);
  sheet.appendRow(row);
  return 'new';
}

function updateDebtsFromCustomers() {
  const custSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CUSTOMERS);
  const debtSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.DEBTS);

  // Clear debts
  if (debtSheet.getLastRow() > 1) {
    debtSheet.getRange(2, 1, debtSheet.getLastRow() - 1, debtSheet.getLastColumn()).clear();
  }

  const custData = custSheet.getDataRange().getValues();
  const debtRows = [];

  for (let i = 1; i < custData.length; i++) {
    const debt = Number(custData[i][11]) || 0; // debt column
    if (debt !== 0) {
      debtRows.push([
        custData[i][0],  // customerId
        custData[i][2],  // customerName
        custData[i][3],  // phone
        debt,            // totalDebt
        0,               // totalPaid (from KiotViet if available)
        debt,            // remaining
        custData[i][15], // lastTransactionDate = modifiedDate
        ''               // note
      ]);
    }
  }

  if (debtRows.length > 0) {
    debtSheet.getRange(2, 1, debtRows.length, debtRows[0].length).setValues(debtRows);
  }
}

// ==================== WEBHOOK HANDLER ====================

function handleWebhook(body, e) {
  try {
    const notifications = body.Notifications || [body];

    notifications.forEach(notification => {
      const eventName = notification.Type || notification.eventName || body.eventName || '';
      const eventData = notification.Data || notification.data || body.data || [];

      if (eventName.toLowerCase().includes('customer')) {
        handleCustomerWebhook(eventData, eventName);
      } else if (eventName.toLowerCase().includes('order') || eventName.toLowerCase().includes('invoice')) {
        handleOrderWebhook(eventData, eventName);
      }
    });

    return { success: true };
  } catch (error) {
    Logger.log('Webhook error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

function handleCustomerWebhook(data, eventName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CUSTOMERS);

  const customers = Array.isArray(data) ? data : [data];

  customers.forEach(customer => {
    if (customer.Id || customer.id) {
      // Normalize field names (webhook may use PascalCase)
      const normalized = {
        id: customer.Id || customer.id,
        code: customer.Code || customer.code || '',
        name: customer.Name || customer.name || '',
        contactNumber: customer.ContactNumber || customer.contactNumber || '',
        email: customer.Email || customer.email || '',
        address: customer.Address || customer.address || '',
        wardName: customer.WardName || customer.wardName || '',
        locationName: customer.LocationName || customer.locationName || '',
        cityName: customer.CityName || customer.cityName || '',
        organization: customer.Organization || customer.organization || '',
        groups: customer.Groups || customer.groups || [],
        debt: customer.Debt || customer.debt || 0,
        totalRevenue: customer.TotalRevenue || customer.totalRevenue || 0,
        totalPoint: customer.TotalPoint || customer.totalPoint || 0,
        createdDate: customer.CreatedDate || customer.createdDate || '',
        modifiedDate: customer.ModifiedDate || customer.modifiedDate || new Date().toISOString()
      };

      upsertCustomer(sheet, normalized);
    }
  });

  // Increment new events count
  const currentCount = Number(getConfigValue('newEventsCount') || 0);
  setConfigValue('newEventsCount', String(currentCount + customers.length));

  // Update total
  const totalRows = Math.max(0, sheet.getLastRow() - 1);
  setConfigValue('totalCustomers', String(totalRows));
}

function handleOrderWebhook(data, eventName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.ORDERS);
  const orders = Array.isArray(data) ? data : [data];

  orders.forEach(order => {
    const normalized = {
      id: order.Id || order.id || '',
      code: order.Code || order.code || '',
      customerId: order.CustomerId || order.customerId || '',
      customerName: order.CustomerName || order.customerName || '',
      customerPhone: order.CustomerPhone || order.customerPhone || '',
      orderDetails: order.OrderDetails || order.orderDetails || [],
      total: order.Total || order.total || 0,
      discount: order.Discount || order.discount || 0,
      statusValue: order.StatusValue || order.statusValue || '',
      status: order.Status || order.status || '',
      purchaseDate: order.PurchaseDate || order.purchaseDate || order.CreatedDate || '',
      modifiedDate: order.ModifiedDate || order.modifiedDate || new Date().toISOString()
    };

    const row = orderToRow(normalized);
    sheet.appendRow(row);
  });

  // Increment events
  const currentCount = Number(getConfigValue('newEventsCount') || 0);
  setConfigValue('newEventsCount', String(currentCount + orders.length));
}

// ==================== DATA RETRIEVAL ====================

function handleGetCustomers(params) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CUSTOMERS);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return { success: true, data: [], total: 0 };
  }

  const headers = data[0];
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(start + pageSize, data.length);

  const customers = [];
  for (let i = start; i < end; i++) {
    const obj = {};
    headers.forEach((h, idx) => { obj[h] = data[i][idx]; });
    customers.push(obj);
  }

  return {
    success: true,
    data: customers,
    total: data.length - 1,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil((data.length - 1) / pageSize)
  };
}



function handleGetOrders(params) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.ORDERS);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return { success: true, data: [], total: 0 };
  }

  const headers = data[0];
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);
  
  const fromDate = params.fromDate ? new Date(params.fromDate) : null;
  const toDate = params.toDate ? new Date(params.toDate) : null;
  const customerId = params.customerId ? String(params.customerId) : null;
  const statusFilter = params.status ? String(params.status).trim().toLowerCase() : null;
  const search = params.search ? String(params.search).trim().toLowerCase() : null;

  // Filter
  let filteredRows = [];
  
  // Skip header (i=1)
  for (let i = 1; i < data.length; i++) {
     const row = data[i];
     // 1. Customer Filter
     if (customerId && String(row[2]) !== customerId) continue;

     // 2. Date Filter
     if (fromDate || toDate) {
         const pDateStr = row[10];
         if (pDateStr) {
             const pDate = new Date(pDateStr);
             if (fromDate && pDate < fromDate) continue;
             if (toDate) {
                 const toDateEnd = new Date(toDate);
                 toDateEnd.setHours(23, 59, 59, 999);
                 if (pDate > toDateEnd) continue;
             }
         }
     }

     // 3. Status Filter (StatusValue: Col 8, Status: Col 9)
     if (statusFilter) {
         const sVal = String(row[8] || '').toLowerCase();
         const sNum = String(row[9] || '');
         // If filter is integer, check against sNum. Else check text.
         if (sNum !== statusFilter && !sVal.includes(statusFilter)) continue;
     }

     // 4. Search Filter (Code: 1, Name: 3, Phone: 4)
     if (search) {
         const code = String(row[1] || '').toLowerCase();
         const name = String(row[3] || '').toLowerCase();
         const phone = String(row[4] || '').toLowerCase();
         if (!code.includes(search) && !name.includes(search) && !phone.includes(search)) continue;
     }
     
     const obj = {};
     headers.forEach((h, idx) => { obj[h] = row[idx]; });
     filteredRows.push(obj);
  }
  
  // Sort Newest -> Oldest
  filteredRows.reverse();

  const total = filteredRows.length;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const resultData = filteredRows.slice(start, end);

  return {
    success: true,
    data: resultData,
    total: total,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(total / pageSize)
  };
}


function handleGetDebts(params) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.DEBTS);
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return { success: true, data: [], total: 0 };
  }

  const headers = data[0];
  const page = Number(params.page || 1);
  const pageSize = Number(params.pageSize || 20);
  const search = params.search ? String(params.search).trim().toLowerCase() : null;

  // Filter
  let filteredRows = [];

  for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Search: Name (1), Phone (2), Id (0)
      if (search) {
          const id = String(row[0] || '').toLowerCase();
          const name = String(row[1] || '').toLowerCase();
          const phone = String(row[2] || '').toLowerCase();
          if (!id.includes(search) && !name.includes(search) && !phone.includes(search)) continue;
      }
      
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = row[idx]; });
      filteredRows.push(obj);
  }

  const total = filteredRows.length;
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const resultData = filteredRows.slice(start, end);

  return {
    success: true,
    data: resultData,
    total: total,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(total / pageSize)
  };
}

function handleSearchCustomer(query) {
  if (!query || query.length < 2) {
    return { success: false, error: 'Từ khóa tìm kiếm quá ngắn' };
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CUSTOMERS);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const queryLower = query.toLowerCase();

  const results = [];
  for (let i = 1; i < data.length; i++) {
    const name = String(data[i][2]).toLowerCase();    // name
    const phone = String(data[i][3]).toLowerCase();   // contactNumber
    const code = String(data[i][1]).toLowerCase();    // code
    const email = String(data[i][4]).toLowerCase();   // email

    if (name.includes(queryLower) || phone.includes(queryLower) ||
      code.includes(queryLower) || email.includes(queryLower)) {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = data[i][idx]; });
      results.push(obj);
    }

    if (results.length >= 50) break; // Limit results
  }

  return { success: true, data: results, total: results.length };
}

function handleCheckNewEvents() {
  const count = Number(getConfigValue('newEventsCount') || 0);
  const lastSync = getConfigValue('lastSyncTime') || '';
  const total = getConfigValue('totalCustomers') || '0';

  return {
    success: true,
    newEvents: count,
    lastSyncTime: lastSync,
    totalCustomers: Number(total)
  };
}

function handleGetStats() {
  const custSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CUSTOMERS);
  const orderSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.ORDERS);
  const debtSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.DEBTS);

  const totalCustomers = Math.max(0, custSheet.getLastRow() - 1);
  const totalOrders = Math.max(0, orderSheet.getLastRow() - 1);
  const totalDebts = Math.max(0, debtSheet.getLastRow() - 1);


  // Calculate total debt amount
  let totalDebtAmount = 0;
  if (debtSheet.getLastRow() > 1) {
    const debtData = debtSheet.getRange(2, 4, debtSheet.getLastRow() - 1, 1).getValues();
    debtData.forEach(row => { totalDebtAmount += Number(row[0]) || 0; });
  }

  // Calculate total revenue
  // Strategy: Try getting from Customers (Lifetime). If 0 (API issue), fallback to Orders (Recent 90 days).
  let custRevenue = 0;
  if (custSheet.getLastRow() > 1) {
    const revenueData = custSheet.getRange(2, 13, custSheet.getLastRow() - 1, 1).getValues();
    revenueData.forEach(row => { custRevenue += Number(row[0]) || 0; });
  }

  let orderRevenue = 0;
  if (orderSheet.getLastRow() > 1) {
    const orderData = orderSheet.getRange(2, 7, orderSheet.getLastRow() - 1, 1).getValues();
    orderData.forEach(row => { orderRevenue += Number(row[0]) || 0; });
  }
  
  // Use whichever is greater (likely Customer Revenue if available, otherwise Order Revenue)
  let totalRevenue = Math.max(custRevenue, orderRevenue);
  
  // Log for debug
  if (custRevenue === 0 && orderRevenue === 0) {
     logError('Stats Warning', 'Revenue is 0. Check Customer Col 13 or Order Col 7.');
  }

  return {
    success: true,
    stats: {
      totalCustomers,
      totalOrders,
      totalDebts,
      totalDebtAmount,
      totalRevenue,
      lastSyncTime: getConfigValue('lastSyncTime') || 'Chưa đồng bộ',
      retailerName: getConfigValue('retailerName') || ''
    }
  };
}

// ==================== CONFIG HELPERS ====================

function getConfigValue(key) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CONFIG);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      return String(data[i][1]);
    }
  }
  return null;
}

function setConfigValue(key, value) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAMES.CONFIG);
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      return;
    }
  }

  // Key doesn't exist, append
  sheet.appendRow([key, value]);
}

function logError(context, message) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Logs');
    if (!sheet) {
      sheet = ss.insertSheet('Logs');
      sheet.appendRow(['Timestamp', 'Context', 'Message']);
    }
    sheet.appendRow([new Date(), context, String(message)]);
    // Keep log file from growing too large (keep last 1000 rows)
    if (sheet.getLastRow() > 1000) {
      sheet.deleteRows(2, sheet.getLastRow() - 1001);
    }
  } catch (e) {
    Logger.log('Logging failed: ' + e);
  }
}
