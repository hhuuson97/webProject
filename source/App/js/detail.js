const id = getQuery("id");

let product;

function submit() {
  var cartValue = localStorage.getItem("cart");
  var cartObj = JSON.parse(cartValue) || [];

  const color = $("#textColor").val();
  const size = $("#size").val();

  product.color = color;
  product.size = size;
  product.num = 1;

  cartObj.push(product);

  var jsonStr = JSON.stringify(cartObj);
  localStorage.setItem("cart", jsonStr);
  swal("Thông báo", "Đã thêm vào giỏ hàng");
  //   $.post(apiUrl + "Order", { color, size, product, token }, data => {
  //     swal("Thông báo", "Đã thêm vào giỏ hàng");
  //   });
}

// function submit() {
//   const color = $("#textColor").val();
//   const size = $("#size").val();
//   const product = id;
//   const token = getToken();
//   $.post(apiUrl + "Order", { color, size, product, token }, data => {
//     swal("Thông báo", "Đã thêm vào giỏ hàng");
//   });
// }

getProduct(id);

function getProduct(id) {
  $.get(apiUrl + "Product/find", data => {
    let html = "";
    if (data.length) {
      const p = data[0];
      product = p;
      html = `<div class="col-6">
      <img src="${p.image}" alt="" height="500">
  </div>
  <div class="col-6">
      <h3>${p.title}</h3>
      <h4 style="color:red">$${p.price}</h4>
      <div class="alert alert-primary" role="alert">
          <b>In áo tại chỗ và lấy liền trong 1 tiếng</b>
          <br/>${p.address}
      </div>
      <h5>Kích thước</h5>
        <select id="size">
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
        </select>
      <h5>Chọn màu</h5>
      <div>
          <input type="color" id="textColor" name="favcolor" value="#ffffff">
      </div>
      <div style="padding-top: 20px">
          <button type="button" class="btn btn-primary btn-lg" onclick="return submit();">Thêm vào giỏ hàng</button>
      </div>
  </div>`;
      $("#detail").html(html);
    }
  });
}
