function getOrders() {
  $.get(apiUrl + "Order/find", data => {
    showOrders(data);
  });
}

getOrders();

function showOrders(data) {
  // Get data from server

  for (i = 0; i < data.length; i++) {
    const o = data[i];
    console.log(o);
    $("table tr:last").after(
      '<tr class="item">\
      <td>' +
        data[i].username +
        "</td>\
      <td>" +
        data[i].name +
        "</td>\
      <td>" +
        data[i].des +
        "</td>\
        <td>" +
        data[i].btime +
        "</td>\
        <td>" +
        data[i].etime +
        "</td>\
      <td>" +
        data[i].num +
        "</td>\
      <td>$" +
        o.product.price +
        "</td>\
        <td>$" +
      o.product.price * o.num +
        "</td>\
        <td>" +
        "<a class='delete' href='#'><i class='fa fa-trash-alt' ondelete='$('table tr:eq(" +
        (i + 1) +
        ")').remove();'></a>" +
        "</td>\
      </tr>"
    );
  }
}
