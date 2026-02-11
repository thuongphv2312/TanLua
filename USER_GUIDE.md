# 📘 HƯỚNG DẪN SỬ DỤNG HỆ THỐNG KIOTVIET DASHBOARD

Chào mừng bạn đến với hệ thống quản lý dữ liệu KiotViet tích hợp Google Sheets. Dưới đây là hướng dẫn chi tiết về cách vận hành và các tính năng đặc biệt của hệ thống.

---

## 1. 🔄 Tính năng Đồng bộ (Sync)

Hệ thống có 2 chế độ đồng bộ dữ liệu:

### A. Full Sync (Đồng bộ toàn bộ)
- **Khi nào dùng:** Lần đầu tiên sử dụng, hoặc khi cảm thấy dữ liệu bị lệch/thiếu nghiêm trọng.
- **Cơ chế hoạt động:**
  - **Khách hàng:** Tải về TOÀN BỘ danh sách khách hàng từ trước đến nay (Trọn đời).
  - **Công nợ & Doanh thu:** Tự động tính toán dựa trên dữ liệu trọn đời của khách hàng (Chính xác 100%).
  - **Đơn hàng:** Tải về danh sách đơn hàng trong **90 ngày gần nhất**.
    - *Tại sao chỉ 90 ngày?* Để tránh việc tải quá lâu gây lỗi (Timeout) trên Google, đồng thời giúp Dashboard chạy nhanh và mượt mà hơn.
- **An toàn:** Hệ thống sử dụng "Cơ chế Sheet Tạm" - dữ liệu chỉ được thay thế khi quá trình tải hoàn tất 100%, đảm bảo không bao giờ bị mất dữ liệu cũ dù mạng có rớt giữa chừng.

### B. New Sync (Đồng bộ mới)
- **Khi nào dùng:** Hàng ngày, hàng giờ để cập nhật đơn mới.
- **Cơ chế:** Chỉ tải những khách hàng/đơn hàng có thay đổi kể từ lần đồng bộ trước.
- **Tốc độ:** Rất nhanh (vài giây).

---

## 2. 📊 Báo cáo & Thống kê

### Thẻ Thống Kê (Trên cùng)
Các con số này được tính toán tự động sau mỗi lần Sync:
- **Tổng Doanh thu:** Lấy số lớn nhất giữa (Tổng doanh thu khách hàng) và (Tổng đơn hàng). Đảm bảo luôn hiển thị con số chính xác nhất, ngay cả khi danh sách đơn hàng bị cắt bớt 90 ngày.
- **Tổng Nợ:** Tổng số tiền khách hàng đang nợ (Lấy trực tiếp từ KiotViet).

### Các Tab dữ liệu
1.  **Khách hàng (Customers):**
    -   Hiển thị tất cả khách hàng.
    -   Tìm kiếm nhanh bằng: Tên, Số điện thoại, Mã KH.
    -   Cột "Doanh thu" và "Công nợ" hiển thị chính xác theo dữ liệu tổng của KiotViet.

2.  **Đơn hàng (Orders):**
    -   Hiển thị lịch sử đơn hàng (mặc định 90 ngày gần nhất).
    -   **Bộ lọc ngày:** Bạn có thể chọn khoảng thời gian (Từ ngày - Đến ngày) để xem đơn hàng cụ thể.
    -   *Lưu ý:* Nếu bạn cần xem đơn hàng cũ hơn 90 ngày, hãy xem trực tiếp trên KiotViet hoặc yêu cầu kỹ thuật mở rộng giới hạn (nhưng sẽ làm chậm hệ thống).

3.  **Công nợ (Debts):**
    -   Danh sách khách hàng đang có nợ > 0.
    -   Sắp xếp theo số tiền nợ giảm dần để dễ đòi nợ.

---

## 3. 🛠 Xử lý sự cố thường gặp (Troubleshooting)

### Q: Tại sao tôi bấm "Full Sync" mà không thấy đơn hàng cũ từ năm ngoái?
**A:** Như đã giải thích ở mục 1, hệ thống giới hạn 90 ngày để đảm bảo tốc độ và độ ổn định. Tuy nhiên, **Tổng Doanh thu** và **Công nợ** vẫn được tính toán ĐÚNG cho cả năm ngoái.

### Q: Tôi gặp lỗi "Address unavailable" hoặc "Timeout"?
**A:** Đây là lỗi mạng tạm thời giữa Google và KiotViet.
-   Hệ thống đã có cơ chế tự động thử lại (Retry).
-   Nếu vẫn lỗi, hãy đợi 5 phút và thử lại.
-   Nếu dữ liệu quá lớn, hãy ưu tiên dùng **New Sync** thay vì Full Sync liên tục.

### Q: Tại sao Tab Đơn hàng cần click vào mới hiện số liệu?
**A:** Đây là tính năng "Tải chậm" (Lazy Loading) giúp trang web mở lên nhanh chóng. Dữ liệu chi tiết chỉ được tải khi bạn thực sự cần xem nó.

### Q: Tổng doanh thu hiển thị bằng 0?
**A:** Hãy chắc chắn bạn đã **Deploy (Triển khai)** phiên bản code mới nhất và chạy **Full Sync** lại một lần. Phiên bản mới đã khắc phục lỗi định dạng dữ liệu từ KiotViet.

---

## 4. 🚀 Hướng dẫn Cập nhật (Deploy)
Mỗi khi có code mới, bạn cần làm thao tác này để áp dụng:

1.  Mở file `google-apps-script/Code.gs`.
2.  Bấm nút **Deploy (Triển khai)** (màu xanh góc trên bên phải) -> **Manage Deployments (Quản lý triển khai)**.
3.  Bấm biểu tượng ✏️ (Edit) -> Ở mục Version chọn **New version (Phiên bản mới)**.
4.  Bấm **Deploy**.
5.  Xong! Quay lại Dashboard và bấm **F5** để tận hưởng tính năng mới.

---
*Tài liệu được cập nhật ngày 11/02/2026 bởi Đội ngũ Kỹ thuật TanLua.*
