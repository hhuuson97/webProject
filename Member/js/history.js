$(document).ready(function() {
  // Get data from server
  data = [
    {
      dateOrder: "25/04/2018",
      dateReceive: "27/04/2018",
      receiver: "noname",
      address: "227, Nguyễn Văn Cừ, Quận 5, TP Hồ Chí Minh",
      detail: [
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
      ]
    },
    {
      dateOrder: "01/05/2018",
      dateReceive: "07/05/2018",
      receiver: "noname",
      address: "227, Nguyễn Văn Cừ, Quận 5, TP Hồ Chí Minh",
      detail: [
        {
          name: "Áo phông Angry Bird",
          des: "size XL",
          num: 3,
          price: 100000
        },
        {
          name: "Áo phông Hello Monday",
          des: "size L",
          num: 4,
          price: 100000
        }
      ]
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
      let sum = 0;
      for (let j = 0; j < data[i].detail.length; j++)
        sum += data[i].detail[j].price * data[i].detail[j].num;
      $("#history").append(
        '<tr class="item history">\
        <td><i class="fa fa-arrow-right"></i></td><td>' +
          data[i].dateOrder +
          "</td>\
        <td>" +
          data[i].dateReceive +
          "</td>\
        <td>" +
          data[i].receiver +
          "</td>\
        <td>" +
          data[i].address +
          "</td>\
        <td>" +
          makePrice(sum) +
          "</td>\
        </tr>"
      );
      $("#history .item.history:last").after(
        '<tr class="detail closed">\
            <td></td>\
            <td colspan="5">\
                <table class="detailTable">\
                    <tr>\
                        <td>Tên hàng</td>\
                        <td>Mô tả</td>\
                        <td>Số lượng</td>\
                        <td>Giá bán</td>\
                        <td>Thành tiền</td>\
                    </tr>\
                </table>\
            </td>\
        </tr>'
      );
      for (let j = 0; j < data[i].detail.length; j++) {
        $(".detailTable:last").append(
          '<tr class="item">\
      <td>' +
            data[i].detail[j].name +
            "</td>\
      <td>" +
            data[i].detail[j].des +
            "</td>\
      <td>" +
            data[i].detail[j].num +
            "</td>\
      <td>" +
            makePrice(data[i].detail[j].price) +
            "</td><td>" +
            makePrice(data[i].detail[j].price * data[i].detail[j].num) +
            "</td>\
      </tr>"
        );
      }
    }
  }

  update();

  $(document).on("click", ".item.history", function() {
    let i = $(".item.history").index(this);
    let t = $(".detail:eq(" + i + ")");
    if ($(t).hasClass("open")) {
      $(t)
        .removeClass("open")
        .addClass("closed");
    } else {
      $(t)
        .removeClass("closed")
        .addClass("open");
    }
  });
});
