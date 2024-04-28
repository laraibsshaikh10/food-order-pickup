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
  // Update price when delete an item from cart
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
  })


});
