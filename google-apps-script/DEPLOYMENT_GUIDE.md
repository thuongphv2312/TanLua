# 📚 Hướng dẫn Triển khai KiotViet Admin Dashboard

## 🎯 Tổng quan

Hệ thống KiotViet Admin Dashboard cho phép bạn:
- ✅ Đăng nhập an toàn với mật khẩu quản trị
- ✅ Kết nối với KiotViet API để kéo thông tin khách hàng, đơn hàng, công nợ
- ✅ Lưu trữ dữ liệu trong Google Sheets (miễn phí, không cần database)
- ✅ Đồng bộ Full hoặc Incremental (chỉ kéo data mới)
- ✅ Nhận thông báo real-time qua Webhook từ KiotViet
- ✅ Tìm kiếm, phân trang, quản lý khách hàng dễ dàng

---

## 📋 BƯỚC 1: Tạo Google Sheet + Apps Script

### 1.1. Tạo Google Sheet mới

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Click **Blank** để tạo sheet mới
3. Đặt tên: `TanLua_KiotViet_Data`

### 1.2. Mở Google Apps Script Editor

1. Trong Google Sheet vừa tạo, vào menu **Extensions** → **Apps Script**
2. Xóa toàn bộ code mặc định trong file `Code.gs`
3. Copy toàn bộ nội dung từ file `Code.gs` trong thư mục này
4. Paste vào Apps Script Editor
5. Click **Save** (Ctrl+S)

### 1.3. Khởi tạo cấu trúc Sheet

1. Trong Apps Script Editor, tìm hàm `initializeSheets()`
2. Click vào dropdown bên cạnh nút **Run** → Chọn `initializeSheets`
3. Click **Run** (nút Play ▶)
4. **Quan trọng:** Lần đầu chạy, bạn sẽ cần cấp quyền:
   - Click **Review permissions**
   - Chọn tài khoản Google của bạn
   - Click **Advanced** → **Go to TanLua_KiotViet_Data (unsafe)**
   - Click **Allow**
5. Chờ chạy xong, kiểm tra Google Sheet đã có 4 tabs:
   - ✅ Config
   - ✅ Customers
   - ✅ Orders
   - ✅ Debts

### 1.4. Deploy Web App

1. Trong Apps Script Editor, click **Deploy** → **New deployment**
2. Click **⚙️ Select type** → Chọn **Web app**
3. Cấu hình:
   - **Description:** `KiotViet API v1` (hoặc tùy ý)
   - **Execute as:** `Me (your_email@gmail.com)`
   - **Who has access:** `Anyone` ⚠️ Quan trọng!
4. Click **Deploy**
5. **COPY URL WEB APP** - Bạn sẽ cần URL này cho Frontend!
   - URL dạng: `https://script.google.com/macros/s/AKfycby.../exec`
   - Lưu URL này vào notepad hoặc email cho bản thân

### 1.5. Đổi mật khẩu Admin (Khuyên dùng)

1. Quay lại Google Sheet `TanLua_KiotViet_Data`
2. Vào tab **Config**
3. Tìm dòng có key = `adminPassword`, value mặc định là `tanlua2024`
4. Đổi value thành mật khẩu mạnh của bạn (ví dụ: `MyStr0ngP@ss2024`)
5. Lưu lại (Ctrl+S)

---

## 📋 BƯỚC 2: Cấu hình KiotViet Webhook (Tùy chọn nhưng khuyên dùng)

Webhook giúp bạn nhận thông báo real-time khi có khách hàng mới/thay đổi trên KiotViet.

### 2.1. Đăng nhập KiotViet

1. Truy cập [KiotViet.vn](https://www.kiotviet.vn)
2. Đăng nhập bằng tài khoản Quản trị

### 2.2. Cấu hình Webhook

1. Vào **Cài đặt** (Settings) → **Cài đặt cửa hàng** (Store Settings)
2. Tìm mục **Webhook Settings** hoặc **Thiết lập kết nối API**
3. Click **Bật Webhook** (Enable Webhook)
4. Nhập **Webhook URL** = URL Web App bạn đã copy ở Bước 1.4
   - Ví dụ: `https://script.google.com/macros/s/AKfycby.../exec`
5. Chọn các sự kiện (Events) muốn nhận:
   - ✅ **Customer Created** (Khách hàng mới)
   - ✅ **Customer Updated** (Cập nhật khách hàng)
   - ✅ **Order Created** (Đơn hàng mới) - Tùy chọn
   - ✅ **Invoice Created** (Hóa đơn mới) - Tùy chọn
6. Click **Lưu** (Save)

### 2.3. Lấy ClientId & ClientSecret

1. Trong KiotViet, vào **Cài đặt** → **Cài đặt cửa hàng**
2. Tìm mục **Thiết lập kết nối API** hoặc **API Connection**
3. Bạn sẽ thấy:
   - **ClientId**: Một chuỗi dạng UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)
   - **Client Secret**: Một mã bảo mật dài
   - **Retailer**: Tên cửa hàng của bạn (ví dụ: `tanluastore`)
4. **COPY CẢ 3 THÔNG TIN NÀY** - Bạn sẽ cần khi đăng nhập lần đầu

⚠️ **LƯU Ý BẢO MẬT:** Không chia sẻ ClientSecret cho bất kỳ ai!

---

## 📋 BƯỚC 3: Sử dụng Dashboard

### 3.1. Truy cập trang Admin

1. Mở website của bạn: `http://localhost:5173` (dev) hoặc `https://tanlua.vn` (production)
2. Click vào nút **"Tài khoản / Đăng nhập"** ở header (góc trên bên phải)
3. Bạn sẽ được chuyển đến `/kiot-admin`

### 3.2. Đăng nhập lần đầu (3 bước)

**Bước 1: Nhập URL Google Apps Script**
- Paste URL Web App đã copy ở Bước 1.4
- Click **Tiếp tục**

**Bước 2: Nhập mật khẩu quản trị**
- Nhập mật khẩu bạn đã đặt ở Bước 1.5 (hoặc `tanlua2024` nếu chưa đổi)
- Click **Đăng nhập**

**Bước 3: Cấu hình KiotViet (chỉ lần đầu)**
- Nhập **Retailer** (tên cửa hàng)
- Nhập **ClientId**
- Nhập **ClientSecret**
- Click **Kết nối KiotViet**

✅ Hệ thống sẽ test kết nối. Nếu thành công, bạn sẽ vào Dashboard!

### 3.3. Đồng bộ dữ liệu lần đầu

1. Trong Dashboard, click nút **Full Sync** (màu tím)
2. Xác nhận trong popup
3. Chờ 30s - 3 phút (tùy số lượng khách hàng)
4. Khi xong, bạn sẽ thấy:
   - ✅ Bảng khách hàng hiển thị đầy đủ
   - ✅ Stats cards cập nhật số liệu
   - ✅ Tabs "Đơn hàng" và "Công nợ" có dữ liệu

### 3.4. Các lần sau

Mỗi khi truy cập `/kiot-admin`:
1. Chỉ cần nhập **mật khẩu quản trị**
2. Vào Dashboard ngay lập tức
3. Click **Đồng bộ mới** để cập nhật data (chỉ kéo thay đổi mới, nhanh hơn)

---

## 🎨 Các tính năng Dashboard

### 📊 Stats Cards (Thẻ thống kê)
- **Tổng khách hàng**: Số lượng KH hiện có
- **Tổng đơn hàng**: Số đơn đã tạo
- **Tổng doanh thu**: Tổng giá trị đơn hàng (triệu đồng)
- **Khách còn nợ**: Số KH có công nợ > 0
- **Đồng bộ lần cuối**: Thời gian sync gần nhất

### 📑 Tab Khách hàng
- Hiển thị: Mã KH, Tên, SĐT, Email, Địa chỉ, Nhóm, Công nợ, Doanh thu
- Badge **MỚI**: Khách hàng vừa sync từ webhook
- Tìm kiếm: Theo tên, SĐT, mã KH, email
- Phân trang: 20 khách/trang
- Sắp xếp: Click vào header cột

### 📦 Tab Đơn hàng
- Hiển thị: Mã đơn, Khách hàng, Sản phẩm, Tổng tiền, Giảm giá, Trạng thái, Ngày đặt
- Tag màu cho trạng thái: Hoàn thành (xanh), Đang xử lý (xanh dương), Đã hủy (đỏ)

### 💰 Tab Công nợ
- Hiển thị: Mã KH, Tên, SĐT, Tổng nợ, Đã thanh toán, Còn lại
- Chỉ hiển thị khách có nợ > 0
- Sắp xếp theo số tiền nợ

### 🔁 Đồng bộ
- **Full Sync**: Kéo toàn bộ data, ghi đè cũ (dùng lần đầu hoặc khi cần reset)
- **Đồng bộ mới**: Chỉ kéo data thay đổi từ lần sync cuối (nhanh, dùng thường xuyên)

### 🔔 Thông báo Real-time
- Polling mỗi 30 giây kiểm tra webhook mới
- Hiển thị badge số sự kiện mới
- Toast notification khi có KH mới/cập nhật
- Click "Cập nhật ngay" để sync ngay lập tức

---

## �️ CẬP NHẬT CODE MỚI (QUAN TRỌNG)
Nếu bạn vừa cập nhật file `Code.gs`, bạn CẦN làm các bước sau để code có hiệu lực:

1. Copy toàn bộ nội dung mới trong `Code.gs`.
2. Paste vào Google Apps Script Editor (đè lên code cũ).
3. Lưu lại (Ctrl+S).
4. Click **Deploy** → **Manage deployments**.
5. Click biểu tượng **Edit** (cây bút chì) ở góc trên.
6. Trong phần **Version**, chọn **New version**.
7. Click **Deploy**.

⚠️ **LƯU Ý:** Nếu bạn không chọn "New version", code mới sẽ KHÔNG chạy!

---

## �🔧 Xử lý sự cố (Troubleshooting)

### ❌ Lỗi "Full Sync" không kéo được dữ liệu
**Nguyên nhân:**
- Token hết hạn hoặc sai quyền.
- Dữ liệu quá lớn gây timeout (Google giới hạn 6 phút).
- Lỗi API từ phía KiotViet.

**Giải pháp:**
1. Vào Google Sheet, kiểm tra tab **Logs** (vừa được thêm mới).
2. Xem cột **Message** để biết lỗi cụ thể (ví dụ: `401 Unauthorized`, `timeout`, v.v.).
3. Nếu lỗi `401`, thử đăng nhập lại và nhập lại ClientId/Secret.
4. Nếu lỗi timeout, thử chạy **Incremental Sync** (Đồng bộ mới) thay vì Full Sync.
5. Kiểm tra lại tên **Retailer** có đúng không.

### ❌ Lỗi "Không thể kết nối KiotViet"
**Nguyên nhân:**
- ClientId/Secret sai hoặc đã hết hạn
- Retailer name không đúng
- KiotViet API tạm thời offline

**Giải pháp:**
1. Kiểm tra lại ClientId/Secret trên KiotViet
2. Đảm bảo Retailer name chính xác (không dấu, viết thường)
3. Thử lại sau 5 phút

### ❌ Webhook không hoạt động
**Kiểm tra:**
1. URL Webhook trên KiotViet có đúng không?
2. URL có kết thúc bằng `/exec` không?
3. Apps Script đã deploy với "Who has access = Anyone" chưa?

**Test Webhook:**
1. Tạo 1 khách hàng mới trên KiotViet
2. Chờ 30 giây, vào Dashboard kiểm tra badge "X mới"
3. Nếu không có → Webhook chưa hoạt động, dùng "Full Sync" thủ công

### ❌ Lỗi "Chưa cấu hình URL Google Apps Script"
**Giải pháp:**
1. Kiểm tra đã Deploy Apps Script chưa (Bước 1.4)
2. Nhấn F12 → Console, kiểm tra URL có lưu trong localStorage chưa:
   ```javascript
   localStorage.getItem('kiot_apps_script_url')
   ```
3. Nếu null → Nhập lại URL ở bước đầu

### ❌ Dữ liệu không cập nhật sau sync
**Giải pháp:**
1. Hard refresh trang: `Ctrl + F5`
2. Kiểm tra tab Config trong Google Sheet, xem `lastSyncTime` có cập nhật không
3. Vào tab Customers/Orders/Debts xem data có tăng không
4. Nếu vẫn lỗi → Chạy lại `initializeSheets()` trong Apps Script

---

## 🔒 Bảo mật

### ✅ Những gì AN TOÀN:
- ClientId/Secret được lưu trong **Google Apps Script Properties** (server-side)
- Mật khẩu admin được lưu trong **Google Sheet chỉ bạn truy cập**
- Frontend chỉ gọi API qua Apps Script, không trực tiếp gọi KiotViet

### ⚠️ Những gì CẦN LƯU Ý:
- Không share URL Apps Script cho người lạ
- Đặt mật khẩu admin mạnh
- Nếu nghi ngờ bị lộ, vào KiotViet tạo lại ClientSecret mới

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. **Google Sheet logs**: Vào Apps Script → Execution log xem lỗi
2. **Browser Console**: F12 → Console tab, xem API errors
3. **Network Tab**: F12 → Network, kiểm tra request/response

---

## 🎉 Hoàn tất!

Bạn đã có một hệ thống quản lý khách hàng KiotViet hoàn chỉnh:
- ✅ Đăng nhập bảo mật
- ✅ Đồng bộ tự động/thủ công
- ✅ Webhook real-time
- ✅ Tìm kiếm nhanh
- ✅ Dashboard đẹp mắt

**Bước tiếp theo:**
- Test thử tạo khách hàng mới trên KiotViet, xem webhook có bắn về không
- Backup Google Sheet thường xuyên: File → Make a copy
- Cân nhắc thêm tính năng export Excel nếu cần

Chúc bạn sử dụng hiệu quả! 🚀
