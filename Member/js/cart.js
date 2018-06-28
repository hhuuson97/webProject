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

  function makePrice(value) {
    if (value == 0) return "0 VND";
    let p = " VND";
    while (value > 0) {
      let d = value % 1000;
      value = Math.floor(value / 1000);
      if (d > 99 || value == 0) p = d + p;
      else if (d > 9) p = "0" + d + p;
      else p = "00" + d + p;
      if (value > 0) p = "." + p;
    }
    return p;
  }

  function update() {
    let sum = 0;
    for (i = 0; i < data.length; i++) {
      $("table tr:last").before(
        '<tr class="item">\
      <td>' +
          data[i].name +
          "</td>\
      <td>" +
          data[i].des +
          "</td>\
      <td class='num'><a class='button minus' href='#'><i class='fa fa-minus-square'></i></a>" +
          data[i].num +
          "<a class='button plus' href='#'><i class='fa fa-plus-square'></i></a></td>\
      <td>" +
          makePrice(data[i].price) +
          '</td><td class="sum">' +
          makePrice(data[i].price * data[i].num) +
          "</td>\
      </tr>"
      );
      sum += data[i].price * data[i].num;
    }

    $("table tr:last").before(
      '<tr id="count">\
    <td colspan="3"></td>\
    <td>Tổng</td>\
    <td class="sumTotal">' +
        makePrice(sum) +
        "</td>\
  </tr>"
    );
  }

  update();

  $(document).on("click", ".plus", function() {
    let i = $(".plus").index(this);
    data[i].num++;
    $(".num")[i].innerHTML =
      "<a class='button minus' href='#'><i class='fa fa-minus-square'></i></a>" +
      data[i].num +
      "<a class='button plus' href='#'><i class='fa fa-plus-square'></i></a></td>";
    $(".sum")[i].innerHTML = makePrice(data[i].price * data[i].num);
    let sum = 0;
    for (i = 0; i < data.length; i++) sum += data[i].price * data[i].num;
    $(".sumTotal")[0].innerHTML = makePrice(sum);
  });

  $(document).on("click", ".minus", function() {
    let i = $(".minus").index(this);
    if (data[i].num > 0) {
      data[i].num--;
      $(".num")[i].innerHTML =
        "<a class='button minus' href='#'><i class='fa fa-minus-square'></i></a>" +
        data[i].num +
        "<a class='button plus' href='#'><i class='fa fa-plus-square'></i></a></td>";
      $(".sum")[i].innerHTML = makePrice(data[i].price * data[i].num);
      let sum = 0;
      for (i = 0; i < data.length; i++) sum += data[i].price * data[i].num;
      $(".sumTotal")[0].innerHTML = makePrice(sum);
    }
  });
});
