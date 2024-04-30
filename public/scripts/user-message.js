$(document).ready(function() {
  $('#placeOrderButton').on('click', function() {
    
  
    $.ajax({
      url: '/sendOrderConfirmation',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ orderDetails }),
      success: function(response) {
        console.log('Order confirmation sent successfully');
        // Handle successful order confirmation (e.g., display a success message)
      },
      error: function(xhr, status, error) {
        console.error('Failed to send order confirmation');
        // Handle failure to send order confirmation (e.g., display an error message)
      }
    });
  });


});
