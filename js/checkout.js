document.addEventListener('DOMContentLoaded', () => {
    const itemsEl     = document.getElementById('checkout-items');
    const totalEl     = document.getElementById('checkout-total');
    const form        = document.getElementById('checkout-form');
    const pincodeIn   = document.getElementById('pincode');
    const pincodeInfo = document.getElementById('pincode-info');

    function displayOrderSummary() {
      itemsEl.innerHTML = '';
      if (!cart.items.length) return window.location = 'cart.html';

      cart.items.forEach(item => {
        const row = document.createElement('div');
        row.className = 'order-item';
        row.innerHTML = `
          <div class="order-item-details">
            <span class="name">${item.name}</span>
            <span class="qty">Qty: ${item.quantity}</span>
          </div>
          <span class="price">₹${item.price * item.quantity}</span>
        `;
        itemsEl.append(row);
      });
      totalEl.textContent = cart.getTotal();
    }
    displayOrderSummary();

    // PIN Code verification
    pincodeIn.addEventListener('blur', () => {
      const pin = pincodeIn.value.trim();
      if (!/^\d{6}$/.test(pin)) {
        pincodeInfo.textContent = 'PIN must be 6 digits';
        pincodeInfo.classList.add('error');
        return;
      }
      fetch(`https://api.postalpincode.in/pincode/${pin}`)
        .then(res => res.json())
        .then(data => {
          if (data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            pincodeInfo.textContent = `${postOffice.District}, ${postOffice.State}`;
            pincodeInfo.classList.remove('error');
          } else {
            pincodeInfo.textContent = 'Invalid PIN Code';
            pincodeInfo.classList.add('error');
          }
        })
        .catch(() => {
          pincodeInfo.textContent = 'Unable to verify PIN right now';
          pincodeInfo.classList.add('error');
        });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();

      const fullName = form['Full Name'].value.trim();
      const phone    = form['Phone'].value.trim();
      const email    = form['Email'].value.trim();
      const address  = form['Address'].value.trim();
      const pincode  = form['PIN Code'].value.trim();
      const payment  = form['Payment Method'].value;

      if (!/^[6-9]\d{9}$/.test(phone)) return alert('Enter valid 10-digit mobile number');
      if (!/^\d{6}$/.test(pincode))  return alert('Enter valid 6-digit PIN code');
      if (!fullName || !address)     return alert('Fill in all required fields');
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Enter valid email');

      const orderId = 'ORD-' + Date.now();
      const total   = cart.getTotal();
      const orders  = cart.items.map(i => ({
        name: i.name,
        units: i.quantity,
        price: i.price * i.quantity,
        image_url: i.image_url
      }));
      const params = {
        order_id: orderId,
        full_name: fullName,
        phone,
        email,
        address,
        pincode,
        payment_method: payment,
        total,
        orders
      };

      emailjs.send("service_osgf1uq", "template_9u39r3c", params)
        .then(() => {
          alert("Order placed! Redirecting...");
          setTimeout(() => {
            location = `confirmation.html?orderId=${orderId}&total=${total}&paymentMethod=${encodeURIComponent(payment)}&details=${encodeURIComponent(JSON.stringify(orders))}`;
          }, 1000);
        })
        .catch(err => {
          console.error(err);
          alert("Error placing order. Please try again.");
        });
    });
  });