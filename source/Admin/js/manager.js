getUsers();

function getUsers() {
  return $.get(apiUrl + "User/find", data => {
    showUsers(data);
  });
}

function ban(id, isBan) {
  const body = {
    _id: id,
    token: getToken(),
    isBan
  };
  return $.post("/BanUser", body, data => {
    if (data.success) {
      getUsers();
    }
  });
}

function showUsers(data = []) {
  function makePrice(value) {
    let p = " VND";
    while (value > 0) {
      let d = value % 1000;
      value = Math.round(value / 1000);
      if (d > 99) p = d + p;
      else if (d > 9) p = "0" + d + p;
      else p = "00" + d + p;
      if (value > 0) p = "." + p;
    }
    return p;
  }

  $(".item").remove();

  for (i = 0; i < data.length; i++) {
    $("table tr:last").after(
      '<tr class="item">\
        <td>' +
        data[i].name +
        "</td>\
        <td>" +
        data[i].address +
        "</td>\
          <td>" +
        data[i].email +
        "</td>\
          <td>" +
        (!data[i].isBan ? "ACTIVE" : "BANNED") +
        "</td>" +
        "<td><button onclick='ban(" +
        `"` +
        data[i]._id +
        `", ${!data[i].isBan}` +
        ")' class='delete' href='#'>" +
        (data[i].isBan ? "UNBAN" : "BAN") +
        "</button>" +
        "</td>\
        </tr>"
    );
  }
}
