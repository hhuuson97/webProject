function submit() {
  var cartValue = sessionStorage.getItem("cart");
  var cartObj = JSON.parse(cartValue);

  cartObj.push({
    name: "áo 1",
    des: "giá rẻ",
    num: 1,
    price: 1000
  });

  var jsonStr = JSON.stringify(cartObj);
  sessionStorage.setItem("cart", jsonStr);
}
