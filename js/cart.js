// Cart functionality using localStorage
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartCount();
    }

    loadCart() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.items.reduce((total, item) => total + item.quantity, 0);
        }
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url,
                quantity: 1
            });
        }

        this.saveCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
        }
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.items = [];
        this.saveCart();
    }
}

// Initialize and expose cart safely after DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();

    // Add-to-cart functionality for all product buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('h3').textContent,
                price: parseInt(productCard.querySelector('.price').textContent.replace('₹', '').trim()),
                image_url: productCard.querySelector('img').getAttribute('data-src') || productCard.querySelector('img').src
            };

            cart.addItem(product);

            // Show "Added to cart!" success message
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

            setTimeout(() => {
                successMessage.remove();
            }, 2000);
        });
    });

    // If cart page logic exists, handle rendering and interaction
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalAmount = document.getElementById('cart-total-amount');

    if (cartItemsContainer && cartTotalAmount) {
        function displayCartItems() {
            cartItemsContainer.innerHTML = '';

            if (!cart.items || cart.items.length === 0) {
                cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty</p>';
                cartTotalAmount.textContent = '0';
                return;
            }

            cart.items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image_url}" alt="${item.name}">
                    <div class="cart-item-details">
                      <h3>${item.name}</h3>
                      <p>₹${item.price}</p>
                      <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                      </div>
                    </div>
                    <button class="remove-btn" onclick="removeItem('${item.id}')">
                      <i class="fas fa-trash"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            cartTotalAmount.textContent = cart.getTotal();
        }

        window.updateQuantity = (productId, quantity) => {
            cart.updateQuantity(productId, quantity);
            displayCartItems();
        };

        window.removeItem = (productId) => {
            cart.removeItem(productId);
            displayCartItems();
        };

        // Initial render
        displayCartItems();
    }
});
