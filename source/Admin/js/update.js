$(document).ready(function() {
  // Get data from server
  data = [
    {
      name: "Áo phông Angry Bird",
      des: "size XL",
      num: 2,
      price: 100000
    },
    {
      name: "Áo phông Hello Monday",
      des: "size L",
      num: 1,
      price: 100000
    }
  ];

  for (i = 0; i < data.length; i++) {
    $("table tr:last").before(
      "<tr class='item'>\
        <td>" +
        "<input type='text' name='name' id='username' placeholder='Tên hàng' value=" +
        data[i].name +
        " required>" +
        "</td>\
        <td>" +
        "<input type='text' name='des' id='des' placeholder='Mô tả' value=" +
        data[i].des +
        " required>" +
        "</td>\
        <td>" +
        "<input type='number' name='num' id='num' placeholder='Số lượng' value=" +
        data[i].num +
        " required>" +
        "</td>\
        <td>" +
        "<input type='number' name='num' id='num' placeholder='Số lượng' value=" +
        data[i].price +
        " required>" +
        "</td>\
          <td>" +
        "<a class='delete' href='#'><i class='fa fa-trash-alt' ondelete='$('table tr:eq(" +
        (i + 1) +
        ")').remove();'></a>" +
        "</td>\
        </tr>"
    );
  }
});
