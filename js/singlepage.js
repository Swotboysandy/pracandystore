 function changeImage(thumb) {
      const mainImage = document.getElementById('mainImage');
      document.querySelectorAll('.thumbs img').forEach(img => img.classList.remove('active'));
      thumb.classList.add('active');
      mainImage.src = thumb.src;
    }

    function showTab(tabId) {
      document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById(tabId).classList.add('active');
      event.target.classList.add('active');
    }

    document.addEventListener('DOMContentLoaded', () => {
      // Add to cart functionality
      const addToCartBtn = document.querySelector('.add-to-cart');
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
          const product = {
            id: 'starry-night',
            name: 'Starry Night Galaxy Projector',
            price: 399,
            image_url: 'img/starry_night_projector.png'
          };
          if (window.cart && typeof cart.addItem === 'function') {
            cart.addItem(product);
          }
        });
      }

      // WhatsApp share logic
      const shareButton = document.getElementById('whatsapp-share');
      const productTitle = document.querySelector('.product-info h2')?.textContent.trim();
      const price = document.querySelector('.price')?.textContent.trim();
      const url = window.location.href;

      const message = `🌌 Fall asleep under the stars!\n\n✨ *${productTitle}*\n💸 Just ${price}!\n🚚 COD Available\n\n🛒 View now:\n${url}`;
      const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
      shareButton.setAttribute('href', whatsappURL);
    });