$(document).ready(function() {
  $("#openAdd").click(function() {
    $("#myModal").modal();
  });
  $("#add").click(function() {
    $("myModal").hide();
    const title = $("#title2").val();
    const amount = $("#amount").val();
    const price = $("#price").val();
    const address = $("#address").val();
    const description = $("#desc").val();
    const image = $("#image").val();
    $.post(
      apiUrl + "Product",
      {
        title,
        amount,
        price,
        address,
        description,
        image
      },
      data => {
        getProducts();
      }
    );
  });
});

function getProducts(cb) {
  return $.get(apiUrl + "Product/find", data => {
    showProducts(data);
  });
}

function updateProduct(id) {}

function removeProduct(id) {
  const body = {
    _id: id
  };
  return $.post(apiUrl + "Product/delete", body, data => {
    getProducts();
  });
}

getProducts();

function showProducts(data) {
  let html = "";
  data.forEach(p => {
    html += `<tr class='item'>
    <td> 
    <input type='text' name='name' id='title' placeholder='Tên hàng' value="${
      p.title
    }" required> 
    </td>
    <td> 
    <input type='text' name='des' id='description' placeholder='Mô tả' value="${
      p.description
    }"
     required> 
    </td>
    <td> 
    <input type='number' name='num' id='amount' placeholder='Số lượng' value= 
    "${p.amount}"
     required> 
    </td>
    <td> 
    <input type='number' name='num' id='price' placeholder='Số lượng' value= 
    "${p.price}"
     required> 
    </td>
      <td> 
    <button onclick='removeProduct("${
      p._id
    }")' class='delete' href='#'><i class='fa fa-trash-alt'></button> 
    </td>
    </tr>`;
    $(".item").remove();
    $("table tr:last").after(html);
  });
}
