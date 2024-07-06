class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = "";
  chucvu = "";
  gioLam = "";

  //phuong thuc tinh tong luong
  tinhTongLuong = function () {
    let tongLuong = 0;
    switch (this.chucvu) {
      case "Sếp":
        return this.luongCB * 3;
        
      case "Trưởng phòng":
        return this.luongCB * 2;
        
      case "Nhân viên":
        return this.luongCB;
        
    }
  };
  //Phương thức xếp loại nhân viên
  xepLoaiNhanVien = function () {
    let xepLoai = '';

    if (  this.gioLam*1 >= 192) {
      xepLoai = 'Suất xắc';
    } else if (this.gioLam*1 >= 176) { 
      xepLoai = 'Giỏi';
    } else if (this.gioLam*1 >= 160) {
      xepLoai = 'Khá';
    } else {
      xepLoai = 'Trung bình';
    }
    return xepLoai;
  }
}
