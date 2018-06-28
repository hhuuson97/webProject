var cartValue = localStorage.getItem("cart");
var data = JSON.parse(cartValue);

function submit() {
  return true;
}

function makePrice(value) {
  if (value == 0) return "0 USD";
  let p = " USD";
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

function save() {
  localStorage.setItem("cart", JSON.stringify(data));
}

function remove(index) {
  data.splice(index, 1);
  update();
  save();
}

function order() {
  console.log(data);
  if (data.length) {
    let body = {
      products: data.map(
        ({ num = 1, price, _id, color = "#fff", size = "S" }) => ({
          num: num,
          price: price,
          product: _id,
          color: color,
          size: size
        })
      )
    };
    swal("Tên đầy đủ:", {
      content: "input"
    }).then(name => {
      swal("SĐT:", {
        content: "input"
      }).then(phonenum => {
        swal("Địa chỉ:", {
          content: "input"
        }).then(address => {
          $.post(
            "/order",
            { name, phonenum, address, order: JSON.stringify(body) },
            () => {
              swal("Order thành công");
              data = [];
              localStorage.setItem("cart", "[]");
              update();
            }
          ).fail(err => {});
        });
      });
    });
  } else {
    swal("Thông báo", "Giỏ hàng trống", "error");
  }
}

function update() {
  let sum = 0;
  $(".item").remove();
  $("#count").remove();
  for (i = 0; i < data.length; i++) {
    $("table tr:last").after(
      '<tr class="item">\
      <td>' +
        data[i].title +
        "</td>\
      <td>" +
        data[i].description +
        "</td>\
      <td class='num'><a class='button minus' href='#'><i class='fa fa-minus-square'></i></a>" +
        data[i].num +
        "<a class='button plus' href='#'><i class='fa fa-plus-square'></i></a></td>\
      <td>" +
        makePrice(data[i].price) +
        '</td><td class="sum">' +
        makePrice(data[i].price * data[i].num) +
        "</td>\
          <td><button onclick='remove(" +
        i +
        ")'>Xoá</button></td>\
      </tr>"
    );
    sum += data[i].price * data[i].num;
  }

  $("table tr:last").after(`<tr id="count">
  <td colspan="3"></td>
  <td>Tổng</td>
  <td class="sumTotal">
    ${makePrice(sum)}
    </td><td>
    <button onclick="order()">Đặt hàng</button>
    </td>
</tr>`);

  $("table tr:last").after();
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
