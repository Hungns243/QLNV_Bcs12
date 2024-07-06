// Kiểm tra xem người dùng đã nhập dữ liệu hay chưa (kiểm tra rỗng)
function checkEmptyValue(value, span) {
    if (value) {
        // xử lí khi dữ liệu được người dùng nhập vào
        // tham số span đại diện cho một câu lệnh DOM tới thẻ span thông báo
        span.innerHTML = "";
        return true;
      } else {
        // xử lí khi dữ liệu là chuỗi rỗng
        span.innerHTML = "Vui long k bo trong truong nay";
        return false;
      }
}

// nhiệm vụ hàm valid:
// - lấy thẻ span với id tương ứng
// - display block 
// - innerHTML = "nội dung lỗi"