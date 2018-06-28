const apiUrl = "http://localhost:8081/api/";

function getQuery(q) {
  return (window.location.search.match(new RegExp("[?&]" + q + "=([^&]+)")) || [
    ,
    null
  ])[1];
}

function goTo(url) {
  return (window.location.href = url);
}

function getUser() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

function getToken() {
  return localStorage.getItem("token");
}

function checkUser(cb) {
  const user = getUser();
  const token = getToken();
  if (!user) {
    return cb(true, null);
  }
  $.post(apiUrl + "checkToken", { token }, data => {
    if (data.banned) {
      swal("Thông báo", "Tài khoản đã bị khoá");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    if (data.error) {
      return cb(true);
    } else {
      return cb(null, data);
    }
  }).fail(() => cb(true, null));
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  goTo("/app");
}

$(document).ready(() => {
  checkUser((err, data) => {
    if (err) {
      $("#navbar").append(`
    <li>
        <a href="/app/signup">Đăng ký</a>
    </li>
    <li>
        <a href="/app/signin">Đăng nhập</a>
    </li>
    `);
    } else {
      if (data.user.isAdmin) {
        $("#navbar").append(`
      <li>
          <a href="/admin/manager.html">Admin</a>
      </li>`);
      }
      $("#navbar").append(`
    <li>
        <a href="/app/profile">${data.user.name}</a>
        <a href="/app/profile" onclick="logout()">Đăng xuất</a>
    </li>
    `);
    }
  });
});
