// Initialize EmailJS with your user ID
emailjs.init("sandyalwayssucks@gmail.com");

// Function to send order details via email
function sendOrderEmail(orderDetails) {
    const templateParams = {
        to_email: 'sandyalwayssucks@gmail.com', // Your email address
        from_name: orderDetails.customer.name,
        customer_email: orderDetails.customer.email,
        customer_phone: orderDetails.customer.phone,
        shipping_address: orderDetails.shipping,
        order_items: orderDetails.items.map(item => 
            `${item.name} (${item.quantity} x $${item.price})`
        ).join('\n'),
        total_amount: orderDetails.total
    };

    emailjs.send('service_7fco9yn', 'template_7mv5wpo', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Order submitted successfully! We will contact you shortly.');
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            alert('There was an error submitting your order. Please try again.');
        });
}

// Function to handle checkout form submission
function handleCheckout(event) {
    event.preventDefault();
    
    // Get form data
    const form = event.target;
    const orderDetails = {
        name: form.querySelector('[name="name"]').value,
        email: form.querySelector('[name="email"]').value,
        phone: form.querySelector('[name="phone"]').value,
        address: form.querySelector('[name="address"]').value,
        city: form.querySelector('[name="city"]').value,
        state: form.querySelector('[name="state"]').value,
        zip: form.querySelector('[name="zip"]').value,
        country: form.querySelector('[name="country"]').value,
        items: [], // Will be populated with cart items
        total: 0 // Will be calculated from cart items
    };

    // Get cart items from the page
    const cartItems = document.querySelectorAll('.cart-item');
    cartItems.forEach(item => {
        orderDetails.items.push({
            name: item.querySelector('.item-name').textContent,
            quantity: item.querySelector('.item-quantity').value,
            price: item.querySelector('.item-price').textContent.replace('$', '')
        });
    });

    // Calculate total
    orderDetails.total = orderDetails.items.reduce((total, item) => {
        return total + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    // Send order details via email
    sendOrderEmail(orderDetails);
}

// Add event listener to checkout form
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.querySelector('.checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}); 