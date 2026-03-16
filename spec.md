# USHA Burger Pointe

## Current State
- React + TypeScript frontend
- 10 burger menu items with add-to-cart functionality
- Order form: name, phone, address fields
- WhatsApp order integration (wa.me/916002296217)
- Customization options (extra cheese, spice, etc.)
- Payment section with QR code
- Cancellation policy
- Contact section

## Requested Changes (Diff)

### Add
- Soft Drinks section: Cola (₹40), Lemon Soda (₹40), Orange Soda (₹45) -- each with generated images
- Milk Shakes section: Chocolate Shake (₹90), Mango Shake (₹80), Strawberry Shake (₹85) -- each with generated images
- Postcode field in the order form (below address); delivery area shown as 782447 (Lumding, Assam)
- Admin Panel (password-protected, password: "usha123") accessible via a hidden link in footer; allows adding/editing/removing items across all categories (Burgers, Soft Drinks, Milk Shakes); data stored in localStorage so changes persist across sessions
- Nav links for Drinks and Shakes sections

### Modify
- Order form: add postcode input field; include postcode in WhatsApp message
- Header/nav: show delivery postcode 782447
- WhatsApp message to include postcode

### Remove
- Nothing removed

## Implementation Plan
1. Add SOFT_DRINKS and MILK_SHAKES data arrays with generated image paths
2. Add reusable menu section renderer for drinks/shakes
3. Add postcode state + input field in order form
4. Add postcode to WhatsApp message
5. Build Admin Panel: password gate, add/edit/delete for items in all categories, localStorage persistence, accessible via /admin route or toggle button in footer
6. Merge admin-added items with default menu on render using localStorage
7. Add nav links for new sections
