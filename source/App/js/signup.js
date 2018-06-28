function signUp() {
  const name = $("#name").val();
  const email = $("#email").val();
  const password = $("#password").val();
  const address = $("#address").val();
  const phonenum = $("#phonenum").val();
  const comfirmpassword = $("#comfirmpassword").val();
  const captcha = $(".g-recaptcha-response").val();
  if (password != comfirmpassword) {
    return swal("Thông báo", "Mật khẩu nhập lại không đúng", "error");
  }
  if (!captcha || !email || !name || !password || !address || !phonenum)
    return swal("Thông báo", "Cần nhập đủ thông tin", "error");
  const body = {
    name,
    email,
    password,
    address,
    phonenum,
    "g-recaptcha-response": captcha
  };
  $.post("/register", body, data => {
    swal("Thông báo", "Đăng ký thành công").then(() => goTo("signin.html"));
  }).fail(err => {
    swal("Thông báo", "Địa chỉ mail đã tồn tại", "error");
  });
}

const user = getUser();
!user ? console.log("ok") : goTo("/app");
