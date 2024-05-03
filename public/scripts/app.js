// Client facing scripts here
$(document).ready(() => {
  $('.category').click(function() {
    const category = $(this).data('category');
    $.get('/menu_items/' + category, (res) => {
      $('#foodMenu').empty();
            res.menuItems.forEach(item => {
                $('#foodMenu').append(`<li class="menu-item">
                <span class="item-image"><img class="item-img" src='${item.photo_url}' alt="menu item image"></span>
                <span class="item-name-description">
                  <p class="item-name">
                    ${item.name}
                  </p>
                  <p class="item-description">
                    ${item.description}
                  </p>
                </span>
                <span class="item-cost">$${item.cost} </span>
                <button class="addToCartBtn" roll="button" data-id="${item.id}" data-name="${item.name}"
                  data-price="$item.price }">Add to Cart</button>
              </li></li>`);
            });
    })
});
  // Example of adding food to cart when a button is clicked
  $('#foodMenu').on('click', '.addToCartBtn', function() {
    const menu_item_id = $(this).data('id');
    const quantity = 1;
    console.log(menu_item_id, quantity);
    $.post('/cart', { menu_item_id, quantity }, (res) => {
      console.log('Done');
    });
  });
  //Filtering Items By Category

})
