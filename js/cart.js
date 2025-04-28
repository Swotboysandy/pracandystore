// Cart functionality
class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        this.saveCart();
        this.updateCartCount();
        this.updateCartUI();
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartUI();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCart();
            this.updateCartUI();
        }
    }

    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            cartCount.textContent = count;
        }
    }

    updateCartUI() {
        const cartList = document.querySelector('.cartOffcanvas_body-list');
        const cartTotal = document.querySelector('.cartTotal');
        
        if (cartList) {
            cartList.innerHTML = '';
            this.cart.forEach(item => {
                const li = document.createElement('li');
                li.className = 'cartOffcanvas_body-list_item d-sm-flex align-items-center';
                li.innerHTML = `
                    <div class="media">
                        <a href="product.html" target="_blank" rel="noopener norefferer">
                            <img src="${item.image}" alt="${item.name}" />
                        </a>
                    </div>
                    <div class="main d-flex flex-wrap justify-content-between align-items-end align-items-lg-center">
                        <a class="main_title" href="product.html" target="_blank" rel="noopener norefferer">
                            <span class="main_title-product">${item.name}</span>
                        </a>
                        <div class="main_price">
                            <span class="price">$${item.price}</span>
                        </div>
                        <div class="qty d-flex align-items-center justify-content-between">
                            <span class="qty_minus control d-flex align-items-center" onclick="cart.updateQuantity('${item.id}', ${item.quantity - 1})">
                                <i class="icon-minus"></i>
                            </span>
                            <input class="qty_amount" type="number" readonly value="${item.quantity}" min="1" max="99" />
                            <span class="qty_plus control d-flex align-items-center" onclick="cart.updateQuantity('${item.id}', ${item.quantity + 1})">
                                <i class="icon-plus"></i>
                            </span>
                        </div>
                        <a class="btn--underline" href="#" onclick="cart.removeFromCart('${item.id}')">Remove</a>
                    </div>
                `;
                cartList.appendChild(li);
            });
        }

        if (cartTotal) {
            cartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
        }
    }
}

// Initialize cart
const cart = new Cart();

// Add to cart button click handler
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const product = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
            price: parseFloat(e.target.dataset.price),
            image: e.target.dataset.image
        };
        cart.addToCart(product);
    }
}); 