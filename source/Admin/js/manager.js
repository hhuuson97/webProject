$(document).ready(function() {
  // Get data from server
  data = [
    {
      username: "NVA",
      name: "Áo phông Angry Bird",
      des: "size XL",
      btime: "24/04/2018",
      etime: "25/04/2018",
      num: 2,
      price: 100000
    },
    {
      username: "ABC",
      name: "Áo phông Hello Monday",
      des: "size L",
      btime: "24/04/2018",
      etime: "Chưa giao",
      num: 1,
      price: 100000
    }
  ];

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

  for (i = 0; i < data.length; i++) {
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
        <td>" +
        makePrice(data[i].price) +
        "</td><td>" +
        makePrice(data[i].price * data[i].num) +
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
