
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
const btn = document.querySelector('.add-to-cart');
if (btn) {
 btn.addEventListener('click', () => {
   const product = {
     id: 'kids-robot',
     name: 'Kids Robot Space Projector',
     price: 699,
     image_url: 'img/kids_robot_space_projector.png'
   };

   if (window.cart && typeof cart.addItem === 'function') {
     cart.addItem(product);
   }

   // Show "Added to cart!" message
   const successMessage = document.createElement('div');
   successMessage.className = 'success-message';
   successMessage.textContent = 'Added to cart!';
   successMessage.style.cssText = `
     position: fixed;
     top: 50px;
     right: 20px;
     background: #27ae60;
     color: white;
     padding: 1rem;
     border-radius: 5px;
     z-index: 1000;
   `;
   document.body.appendChild(successMessage);
   setTimeout(() => successMessage.remove(), 2000);
 });
}
});
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
