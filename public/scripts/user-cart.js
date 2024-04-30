// Client facing scripts here
$(document).ready(function() {
  // Delete items from cart
  $('.deleteCart').on('click', function() {
    const menu_item_id = $(this).data('id');
    const id = $(this).data('cartid');
    const $itemToRemove = $(this).closest('li');
    $.ajax({
      method: 'DELETE',
      url: '/cart',
      data: { id, menu_item_id }
    })
    .done(function(res) {
      $itemToRemove.remove();
      updateTotalPrice(res.totalPrice)
    });
  });
  // Increase quantity
  $('.increase-btn').on('click', function() {
    const menu_item_id = $(this).data('id');
    const id = $(this).data('cartid');
    const quantityElement = $(this).siblings('#quantity');
    const newQuantity = parseInt(quantityElement.text()) + 1;
    quantityElement.text(newQuantity);
    if (newQuantity > 1) {
      $('.decrease-btn').show()
    }
    $.ajax({
      method: 'PUT',
      url: '/cart/increment',
      data: { id, menu_item_id }
    })
    .done(function(res) {
      updateTotalPrice(res.totalPrice);
    });
  });
  // Decrease quantity
  $('.decrease-btn').on('click', function() {
    const menu_item_id = $(this).data('id');
    const id = $(this).data('cartid');
    const quantityElement = $(this).siblings('#quantity');
    const newQuantity = parseInt(quantityElement.text()) - 1;
    if (newQuantity <= 1) {
      $(this).hide()
    }
    quantityElement.text(newQuantity);
    $.ajax({
      method: 'PUT',
      url: '/cart/decrement',
      data: { id, menu_item_id }
    })
    .done(function(res) {
      updateTotalPrice(res.totalPrice)
    });
  });
  // Update price when change items from cart
  function updateTotalPrice(totalPrice) {
    $('#totalPrice').text('Total Price: $' + totalPrice);
}
  // Place an order
  $('#orderForm').on('submit', function (e) {
    e.preventDefault()
    const instructions = $('#instruction').val()
    const phone_number = $('#customerPhone').val()
    const client_name = $('#customerName').val()
    // console.log(instructions, phone_number, client_name);
    $.post('order', {instructions, phone_number, client_name}, (res) => {window.location.href = `http://localhost:8080${res.redirect}`;})
  })


});
