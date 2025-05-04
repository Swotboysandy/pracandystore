# Pracandy - Static eCommerce Website

A static eCommerce website built with HTML, CSS, and JavaScript, designed to be deployed on Vercel.

## Features

- Responsive design for all devices
- Product catalog with detailed information
- Shopping cart functionality using localStorage
- Cash on Delivery (COD) as the primary payment method
- Form validation for checkout
- FAQ section
- No backend required - fully static

## Project Structure

```
pracandy/
├── index.html          # Homepage
├── cart.html          # Shopping cart page
├── checkout.html      # Checkout page
├── confirmation.html  # Order confirmation page
├── faq.html          # FAQ page
├── css/
│   └── style.css     # Main stylesheet
├── js/
│   ├── cart.js       # Cart functionality
│   └── main.js       # General website functionality
└── img/              # Product images
```

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pracandy.git
cd pracandy
```

2. Add your product images to the `img/` directory:
- kids_robot_space_projector.png
- Moon_light_gift.png
- starry_night_projector.png

3. Test locally:
- Open `index.html` in your browser
- Test all functionality including cart, checkout, and form validation

## Deployment on Vercel

1. Create a Vercel account if you don't have one
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to complete deployment

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The website uses localStorage for cart functionality
- No backend is required as it's a static website
- All form submissions are simulated (no actual data is sent)
- Images should be optimized for web use
- The website is designed to work offline after initial load

## Limitations

- Cart data is stored in localStorage and will be lost if cleared
- No actual payment processing (COD only)
- No user accounts or order history
- No actual backend for order processing

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 