let arrNhanVien = getLocalStorage();
renderArrNhanVien();

function getValueNhanVien() {
  let arrField = document.querySelectorAll("#formQLNV input,#formQLNV select");

  // khởi tạo một đối tượng từ lớp đối tượng SinhVien
  let nhanVien = new NhanVien();

  for (let field of arrField) {
    // console.log(field.value);

    //destructuring
    let { value, id } = field;
    nhanVien[id] = value;

    //thuc hien validations
    // Thực hiện từ lệnh DOM đang có tới các input và select, sẽ sử dụng phương thức parentElement để DOM tới thẻ cha gần nhất

    
    let theSpanThongBao = document.querySelectorAll(".sp-thongbao").forEach(element => {
      element.style.display = "block";
      element.querySelector("#")
      element.innerHTML = "Loi";
    });;
    

    let isEmpty = checkEmptyValue(value, theSpanThongBao); // true false
    console.log(isEmpty);
    isValid &= isEmpty;
    // xử lí nếu dữ liệu rỗng thì sẽ không xử lí bất kỳ hành động nào bên dưới
    if (!isEmpty) {
      continue;
    }
  }
  return nhanVien;
}

//Them nhan vien (buoc1)
let formQLNV = document.getElementById("formQLNV");
formQLNV.onsubmit = function (event) {
  event.preventDefault();
  
  
  console.log("Toi la on submit");

  //Thuc hien chay getValueNhanVien de lay du lieu tu form
  let nhanVien = getValueNhanVien();
  if (!nhanVien) {
    return;
  }

  arrNhanVien.push(nhanVien);
  //  console.log(arrNhanVien);
  //luu tru mang da duoc them 1 phan tu moi vao localStorage
  saveLocalStorage();

  renderArrNhanVien(arrNhanVien);

  hienThiThongBao("Them nhan vien thanh cong", 3000, "bg-success");

  //Phuong thuc reset
  formQLNV.reset();
};

//Hien thi du lieu trong mang len giao dien
function renderArrNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    // nhanVien là object đang có dữ liệu và không có phương thức tính điểm trung bình (được cho)
    // newNhanVien được khởi tạo từ lớp đối tượng sinhvien có phương thức nhưng không có dữ liệu (được nhận)
    let newNhanVien = new NhanVien();
    Object.assign(newNhanVien, nhanVien);

    //destructuring
    let { tknv, name, email, datepicker, chucvu } = newNhanVien;

    let tongLuong = newNhanVien.tinhTongLuong();

    let xepLoaiNhanVien = newNhanVien.xepLoaiNhanVien();
    let dinhDangVn = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    content += `
            <tr>
                <td>${tknv}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${datepicker}</td>
                <td>${chucvu}</td>
                <td>${dinhDangVn.format(tongLuong)}</td>
                <td>${xepLoaiNhanVien}</td>
                <td>
                <button onclick = "deleteNhanVien('${tknv}')" class="btn btn-danger">Xoá</button>
                <button onclick = "getInfoNhanVien('${tknv}')" data-toggle="modal" data-target="#myModal" class="btn btn-warning">Sửa</button>
                </td>
            </tr>


        `;
  }
  document.getElementById("tableDanhSach").innerHTML = content;
}

//Thuc hien luu tru localStorage
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let stringJson = JSON.stringify(value); //chuyen doi du lieu
  localStorage.setItem(key, stringJson);
}
//Thuc hien lay du lieu tu localStorage
function getLocalStorage(key = "arrNhanVien") {
  let dataLocal = localStorage.getItem(key); //lay du lieu tu localStorage len
  let newDataLocal = JSON.parse(dataLocal); // convert tu chuoi JSON ve object

  return newDataLocal ? newDataLocal : []; // nếu datalocal có dữ liệu thì trả về newdata ngược lại trả về mảng rỗng.
}

//Xoa nhan vien
function deleteNhanVien(msnv) {
  console.log(msnv);
  // findIndex ==> index ==> -1, k tim kiem duoc thi se tra ve -1
  // find ==> item ==> undefined

  // tìm kiếm vị trí index của phần tử cần xoá
  let index = arrNhanVien.findIndex((item, index) => {
    // => Object
    return item.tknv == msnv;
  });

  if (index != -1) {
    arrNhanVien.splice(index, 1); // sử dụng hàm splice để xoá phần tử khỏi mảng
    renderArrNhanVien();
    saveLocalStorage();
    hienThiThongBao("Xoa nhan vien thanh cong", 3000, "bg-danger");
  }
  // console.log(arrNhanVien);
}

//Lay thong tin nhan vien
function getInfoNhanVien(msnv) {
  console.log(msnv);
  formQLNV.reset();

  //let nhanVien => find

  let nhanVien = arrNhanVien.find((item, index) => {
    return item.tknv == msnv;
  });
  if (nhanVien) {
    //thao tac dua du lieu len giao dien
    let arrField = document.querySelectorAll(
      "#formQLNV input,#formQLNV select"
    );
    console.log(arrField);
    for (let item of arrField) {
      let { id } = item;
      item.value = nhanVien[id];

      if (id == "tknv") {
        item.readOnly = true; // thực hiện ngăn chặn chỉnh sửa (readOnly) (cach1)
      }
    }

    // dom toi input co id tknv va thuc hien ngan chan chinh sua
    // document.getElementById("tknv").readOnly = true;
  }
}

//Cap nhat nhan vien
function updateNhanVien() {
  let nhanVien = getValueNhanVien();
  if (!nhanVien) {
    return;
  }

  //Tim kiem vi tri cua phan tu
  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == nhanVien.tknv;
  });
  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    console.log(nhanVien);
  }

  saveLocalStorage();
  renderArrNhanVien();
  hienThiThongBao("Cap nhat nhan vien thanh cong", 3000, "bg-warning");
}
document.getElementById("btnCapNhat").onclick = updateNhanVien;

//Xu li thong bao
function hienThiThongBao(text, duration, className) {
  Toastify({
    text,
    className,
    duration,
    // destination: "https://github.com/apvarun/toastify-js",
    // newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    // style: {
    //   // background: "linear-gradient(to right, #00b09b, #96c93d)",
    //   background: "red",
    // },
    backgroundColor: "orange",
  }).showToast();
}
