// Client facing scripts here
$(document).ready(() => {

  // Example of adding food to cart when a button is clicked

  $('.addToCartBtn').on('click', function() {
    const menu_item_id = $(this).data('id');
    const quantity = 1;
    console.log(menu_item_id, quantity);
    $.post('/cart', { menu_item_id, quantity }, (res) => {
      console.log('Done');
    });
  });
})
