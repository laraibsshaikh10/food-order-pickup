// Client facing scripts here
$(document).ready(function() {
  $('.deleteCart').on('click', function() {
    const menu_item_id = $(this).data('id');
    const id = $(this).data('cartid');
    const $itemToRemove = $(this).closest('li');
    $.ajax({
      method: 'DELETE',
      url: '/cart',
      data: { id, menu_item_id }
    })
    .done(function(response) {
      // console.log({ id, menu_item_id });
      $itemToRemove.remove();
    });
  });
});
