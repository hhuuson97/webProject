function save() {
  const name = $("#name").val();
  const address = $("#address").val();
  const phonenum = $("#phonenum").val();
  const token = getToken();
  $.post("/profile", { name, address, phonenum, token }, data => {
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      swal("Thông báo", "Cập nhật tài khoản thành công");
    }
  });
}

if (!getUser()) goTo("/app");

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  goTo("/app");
}

function changePassword() {
  const token = getToken();
  const oldPassword = $("#oldPassword").val();
  const newPassword = $("#newPassword").val();
  $.post("/changePassword", { token, oldPassword, newPassword }, data => {
    if (!data.error) {
      swal("Thông báo", "Cập nhật tài khoản thành công");
    } else {
      swal("Thông báo", "Mật khẩu không đúng", "error");
    }
  });
}

function load() {
  const user = getUser();
  const name = user.name;
  const address = user.address;
  const email = user.email;
  const phonenum = user.phonenum;
  $("#name").val(name);
  $("#email").val(email);
  $("#address").val(address);
  $("#phonenum").val(phonenum);
}

load();
