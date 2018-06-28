function login() {
  const email = $("#username").val();
  const password = $("#password").val();
  console.log({ email, password });
  $.post(apiUrl + "login", { email, password }, data => {
    if (data.error) {
      swal("Thông báo!", data.error, "error");
    } else {
      swal("Thông báo", "Đăng nhập thành công", "success").then(() => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        goTo("./manager.html");
      });
    }
  });
}
