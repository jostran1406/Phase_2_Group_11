# STATEMENT OF WORK (SoW)

## 1. Tổng quan

Dự án tập trung vào việc nghiên cứu và xây dựng một Hệ thống giám sát và điều khiển môi trường phòng thí nghiệm sử dụng công nghệ IoT. Hệ thống này được triển khai nhằm giải quyết bài toán giám sát các chỉ số môi trường theo thời gian thực từ nhiều vị trí khác nhau trong phòng thí nghiệm. Qua đó, hệ thống cung cấp công cụ lưu trữ dữ liệu, hiển thị trực quan hóa lên giao diện Dashboard, tự động phát cảnh báo khi các chỉ số vượt ngưỡng an toàn và thực hiện điều khiển các thiết bị ngoại vi (tự động hoặc thủ công) nhằm đảm bảo điều kiện vận hành tối ưu cho phòng thí nghiệm.

## 2. Mục tiêu

Mục tiêu cốt lõi của dự án trong giai đoạn này (Phase 2 - Thực tập doanh nghiệp) bao gồm:

- **Thu thập & Giám sát dữ liệu:** Thu thập chính xác và liên tục theo thời gian thực các thông số: Nhiệt độ, Ánh sáng, và Chỉ số ô nhiễm không khí tương đối tại 03 vị trí chiến lược của phòng thí nghiệm.
- **Quản lý dữ liệu tập trung:** Kết nối các IoT Node qua mạng WiFi để truyền dữ liệu lên Server tập trung và lưu trữ an toàn trong Database.
- **Trực quan hóa (Dashboard):** Xây dựng giao diện Web Dashboard hoàn chỉnh gồm đầy đủ 9 module chức năng để người dùng giám sát, quản lý và cấu hình.
- **Điều khiển thông minh:** Vận hành cơ chế điều khiển tự động dựa trên các ngưỡng tiêu chuẩn hiện hành hoặc cho phép người dùng click điều khiển thủ công các thiết bị ngoại vi qua Relay từ Dashboard.

## 3. Sản phẩm bàn giao

Kết thúc dự án, nhóm cam kết bàn giao đầy đủ các sản phẩm sau cho mentor:

- **Hệ thống phần cứng hoàn chỉnh:** 3 IoT Nodes đã được lắp ráp, tích hợp vỏ hộp và phân bổ đúng vị trí thiết kế.
- **Mã nguồn phần mềm (Firmware):**
  - Mã nguồn Firmware cho vi điều khiển chính STM32 (viết trên STM32CubeIDE).
  - Mã nguồn Firmware cho module truyền thông ESP8266.
- **Mã nguồn hệ thống Web Dashboard & Backend:** Toàn bộ source code giao diện (HTML/CSS/JS) và logic xử lý phía Server (NodeJS/Firebase).
- **Cơ sở dữ liệu (Database):** Cấu trúc lưu trữ dữ liệu hoàn chỉnh trên Firebase hoặc MySQL.
- **Bộ tài liệu kỹ thuật quản lý dự án:**
  - Tài liệu Đặc tả yêu cầu phần mềm (SRS v1.0).
  - Tài liệu Điều khoản công việc (SoW v1.0).
  - File kế hoạch chi tiết (Project Plan).
- **Video Demo:** Video quay lại kịch bản hoạt động thực tế của toàn bộ hệ thống phần cứng và phần mềm.

## 4. Phạm vi công việc

### 4.1. Phạm vi triển khai vật lý

- **Địa điểm:** Một phòng thí nghiệm điện tử có diện tích quy chuẩn khoảng 60m².
- **Số lượng Node giám sát:** Cố định 3 IoT Nodes, được phân tách tại các vị trí:
  - **Node 1:** Đặt tại khu vực Cửa phòng để giám sát môi trường đầu phòng.
  - **Node 2:** Đặt tại khu vực Giữa phòng để giám sát môi trường chung.
  - **Node 3:** Đặt tại Khu vực đặt thiết bị nhằm kiểm soát các chỉ số ảnh hưởng trực tiếp tới linh kiện/thiết bị điện tử.

### 4.2. Phạm vi phần cứng (Mỗi Node)

Tất cả 3 Node bắt buộc phải tuân thủ nghiêm ngặt thiết kế phần cứng gồm:

- **Vi điều khiển chính:** STM32F401RE.
- **Module kết nối:** ESP8266 (giao tiếp UART với vi điều khiển).
- **Cảm biến tích hợp:** BMP280 (Nhiệt độ), BH1750 (Ánh sáng), MQ135 (Chất lượng không khí tương đối).
- **Thiết bị đầu ra trực tiếp:** Relay, LED, Buzzer (Còi).

### 4.3. Phạm vi tính năng phần mềm (Dashboard & Backend)

Xây dựng hệ thống Web Backend điều hướng dữ liệu từ Router tới Database và hiển thị lên giao diện Web Frontend gồm 9 module bắt buộc:

1. **Đăng nhập & Quản lý người dùng:** Bảo mật truy cập hệ thống.
2. **Danh sách Node:** Quản lý và theo dõi trạng thái kết nối trực tuyến của 3 Node.
3. **Realtime Dashboard:** Hiển thị chỉ số nhiệt độ, ánh sáng, không khí tức thời.
4. **Biểu đồ:** Trực quan hóa xu hướng thay đổi của dữ liệu theo thời gian.
5. **Lịch sử:** Truy vấn và xem lại các dữ liệu môi trường đã lưu trong quá khứ.
6. **Cảnh báo:** Hiển thị thông tin cảnh báo trực quan khi có chỉ số vượt ngưỡng.
7. **Điều khiển Relay:** Giao diện nút nhấn bật/tắt thủ công cho: Quạt thông gió, Đèn chiếu sáng, Quạt hút khí, Còi cảnh báo.
8. **Thiết lập ngưỡng:** Cho phép người dùng chỉnh sửa các ngưỡng môi trường an toàn.
9. **Nhật ký hệ thống (System Log):** Ghi lại lịch sử vận hành, lịch sử bật/tắt thiết bị và lịch sử cảnh báo.

### 4.4. Các hạng mục nằm NGOÀI phạm vi (Out of Scope)

- Nhóm không thiết kế, sản xuất mạch in thương mại (PCB) quy mô lớn.
- Hệ thống không hỗ trợ tích hợp thêm Node thứ 4 hoặc thay đổi chủng loại cảm biến trong giai đoạn này (Phase 2).
- Cảm biến MQ135 chỉ dùng để đánh giá mức độ ô nhiễm không khí tương đối (phân loại Bình thường – Cảnh báo – Nguy hiểm), KHÔNG đo đạc chính xác tuyệt đối nồng độ từng loại khí theo chỉ số ppm.

## 5. Timeline

Dự án được thực hiện tiếp nối từ Phase 1 (đã hoàn thành việc đọc cảm biến và WebServer cục bộ trên phần cứng đơn lẻ). Lịch trình Phase 2 (Thực tập doanh nghiệp) dự kiến như sau:

| Thời gian | Nội dung công việc |
|---|---|
| Tuần 1 (Hiện tại) | Thống nhất phương án, hoàn thiện bản nháp tài liệu SRS v0.1, SoW v0.1 và lập Project Plan. |
| Tuần 2 | Thiết kế và xây dựng Cơ sở dữ liệu (Database); Lập trình và cấu hình kết nối WiFi/giao tiếp HTTP hoặc MQTT cho ESP8266. |
| Tuần 3 - Tuần 4 | Phát triển hệ thống Backend (NodeJS/Firebase) và xây dựng giao diện Web Dashboard (9 module). |
| Tuần 5 | Tích hợp hệ thống (Kết nối phần cứng 3 Node về Server), hiện thực hóa logic điều khiển tự động theo ngưỡng và gửi cảnh báo. |
| Tuần 6 | Kiểm thử toàn diện hệ thống (Độ ổn định, độ trễ mạng), hiệu chuẩn mức độ ô nhiễm tương đối cho cảm biến MQ135. Hoàn thiện bộ tài liệu bàn giao (SRS, SoW, Plan bản cuối), quay video demo và chuẩn bị slide nghiệm thu với Mentor. |

## 6. Thành viên

Dự án được vận hành bởi nhóm gồm 4 thành viên, vai trò như sau:

**Đặng Trọng Nghĩa – Firmware & Quản lý dự án**
- Kỹ thuật: Phát triển firmware cho STM32, đọc và xử lý dữ liệu từ các cảm biến, giao tiếp giữa STM32 và ESP8266 (UART).
- Tài liệu: Chủ trì xây dựng SRS, theo dõi tiến độ dự án.

**Mai Gia Khánh – IoT Communication**
- Kỹ thuật: Cấu hình ESP8266, kết nối WiFi, gửi dữ liệu lên Server (HTTP/MQTT), nhận lệnh điều khiển từ Dashboard.
- Tài liệu: Xây dựng SoW, Mô tả kiến trúc truyền thông, viết tài liệu giao tiếp giữa các thành phần.

**Trần Văn Kiên – Backend & Dashboard**
- Kỹ thuật: Thiết kế Database, xây dựng Dashboard Web, hiển thị dữ liệu thời gian thực, quản lý người dùng, lưu lịch sử và cảnh báo.
- Tài liệu: Thiết kế cơ sở dữ liệu, thiết kế giao diện, đóng góp vào SRS phần chức năng Dashboard.

**Nguyễn Văn Nhân – Điều khiển & Kiểm thử**
- Kỹ thuật: Thiết kế mạch Relay, điều khiển quạt, đèn, buzzer, xây dựng thuật toán điều khiển tự động theo ngưỡng, thực hiện kiểm thử tích hợp hệ thống.
- Tài liệu: Xây dựng Project Plan (WBS, Sprint, Gantt), lập kế hoạch kiểm thử.

## 7. Risk Management

| STT | Rủi ro dự kiến | Mức độ | Giải pháp phòng ngừa / Khắc phục |
|---|---|---|---|
| 1 | Mạng WiFi phòng thí nghiệm không ổn định dẫn đến mất gói tin từ các Node lên Server. | Cao | Viết cơ chế lưu tạm dữ liệu vào bộ nhớ đệm (nếu có) hoặc thiết lập thuật toán tự động kết nối lại WiFi (Auto-reconnect) trên ESP8266 khi mất mạng. |
| 2 | Cảm biến MQ135 trả về giá trị nhiễu hoặc sai lệch lớn, khó xác định mức ô nhiễm. | Trung bình | Tuyệt đối không biểu diễn dưới dạng ppm. Cần chạy thử nghiệm thực tế trong phòng thí nghiệm để lấy mẫu dữ liệu nền, từ đó phân loại 3 mức tương đối: Bình thường – Cảnh báo – Nguy hiểm. |
| 3 | Lệch pha thiết kế giữa giao diện Frontend và dữ liệu thực tế từ Backend truyền xuống. | Trung bình | Thiết lập tài liệu đặc tả API (API Documents) rõ ràng giữa thành viên làm Backend và Frontend trước khi tiến hành code độc lập. |
| 4 | Tiến độ hoàn thiện phần cứng bị chậm | Cao | Thành viên làm Backend viết các tập lệnh giả lập dữ liệu (Mock Data) của 03 Node gửi lên Server để Frontend có thể thiết kế biểu đồ và tính năng trước mà không cần đợi phần cứng thật. |

## 8. Tiêu chí chấp nhận

Hệ thống chỉ được coi là hoàn thành và đạt yêu cầu nghiệm thu khi thỏa mãn toàn bộ các điều kiện kỹ thuật dưới đây:

- **Về Phần cứng:** Tất cả 3 Node phần cứng hoạt động ổn định liên tục trong môi trường phòng thí nghiệm tối thiểu 24 giờ không bị treo hoặc tự khởi động lại.
- **Về Luồng dữ liệu (Data Flow):** Dữ liệu môi trường từ các cảm biến (BMP280, BH1750, MQ135) truyền thành công qua WiFi, Router lên Server và cập nhật vào Database với độ trễ tối đa không quá 5 giây.
- **Về Quy chuẩn kỹ thuật:** Mọi ngưỡng cảnh báo (Nhiệt độ, Ánh sáng, Không khí) cấu hình trên hệ thống bắt buộc phải chứng minh được là dựa theo các tiêu chuẩn tham chiếu quy định trong tài liệu (ASHRAE Standard 55, QCVN 26:2016/BYT, TCVN 7114-1:2008, WHO, QCVN 05:2023/BTNMT).
- **Về Tính năng Dashboard:** Người dùng có thể đăng nhập thành công, xem được biểu đồ realtime của cả 3 Node riêng biệt, truy vấn được lịch sử dữ liệu của tuần trước, và hệ thống tự động kích hoạt Relay (bật quạt/còi) ngay khi có một thông số bất kỳ vượt ngưỡng an toàn.
- **Về Tài liệu:** Bộ tài liệu bàn giao (SRS, SoW, Plan) không bị mâu thuẫn thông tin với nhau, thống nhất tuyệt đối về số lượng Node (3 Node), chủng loại linh kiện và kiến trúc tổng thể.
