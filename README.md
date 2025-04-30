# 🌿 Coplant

> No need to be a plant expert.\
> Even beginners can easily find, explore, and choose plants intuitively.\
> **Coplant** is a curated plant recommendation service designed for newcomers to plant care.

## 🌟 About

**Coplant** is a web service that helps those unfamiliar with growing plants\
get personalized plant recommendations and proceed to purchase,\
through an intuitive quiz, filter system, and informative UI.

- 🧩 Quiz-based and preference-based filtering recommendations
- 📝 Accessible and user-friendly product descriptions
- 🛒 Add to cart and purchase flow
- 📱 Responsive UI design

## ⚙️ Main Features

### 🌱 Product List Page

- Search by name or conditions (light, temperature, humidity, watering needs, etc.)
- Tag-based filtering (e.g., #beginner-friendly, #low-light)
- Dynamic filters based on search results

### 🌼 Product Detail Page

- Plant information including description, scientific name, difficulty, images
- Quantity adjustment and add-to-cart functionality
- Responsive and visually engaging layout

### 📩 Authentication Features

- Integrated with Firebase Auth and Firebase Admin SDK
- Login, sign up, logout, and password reset

### 🧪 Quiz-based Recommendation

- Recommends the most suitable plant based on user preferences
- Simple choices and beginner-friendly interface

### 🛠️ Admin Dashboard

- Admin access control via Firebase Custom Claims
- Product creation and editing features

## 💪 Tech Stack

### 📆 Framework & Libraries

- Next.js
- React
- Firebase / Firebase Admin SDK
- Framer Motion (for interaction and animation)
- Zod (for schema validation)
- Tailwind CSS (for styling)

### 🔧 Dev Tools

- TypeScript
- ESLint, Prettier
- Vercel (for deployment)
- Git, GitHub

## 📁 Folder Structure

```bash
/src
  /actions                 
    auth.ts               // Firebase auth-related server actions
    create-product.ts     // Action to create a new product
    get-product.ts        // Action to fetch product details
    update-product.ts     // Action to update an existing product
  /api/revalidate
    route.ts              // API route for revalidating cache
  /app                    
    /admin                
      /product            
        /new              
          page.tsx
          add-product-button.tsx
          admin-product.tsx
        /[id]/edit        
          edit-form.tsx
          page.tsx
    /product              
      /[id]               
        cart-action.tsx
        floating-image.tsx
        info-block.tsx
        main-section.tsx   // Main client-side UI
        page.tsx           // Server-side data fetching
      filter.tsx           // Product filter UI
      list-item.tsx        // Individual product card component
      page.tsx             // Product list page
    /sign                 
      /find-password       
        page.tsx
      sign-in-form.tsx     
      sign-up-form.tsx     
      layout.tsx           
      moving-leaf.tsx      
      page.tsx             
      template.tsx         
    /test                 
      /result              
        page.tsx           
        product.tsx
        result-client.tsx  // Renders the result UI on the client
      page.tsx
    /constants             
      filter-options.ts    
      preset-tags.ts       
      product-init.ts      
      questions.ts         
  /components
    /common                
      button.tsx
      checkbox.tsx
      counter.tsx
      file-input.tsx
      go-to-top.tsx
      label-input.tsx
      radio.tsx
      searchBar.tsx
    /admin                 
      filter-selector.tsx  
      form-field.tsx       
      image-uploader.tsx   
      tag-selector.tsx     
    /nav                   
      cart.tsx
      drawer.tsx
      hamburger.tsx
      nav-auth.tsx         
      navigation.tsx
  /contexts
    AuthContext.tsx        // Manages user auth state
  /hooks
    useAddProductForm.ts   // Hook for handling product creation form
    useEditProductForm.ts  // Hook for handling product editing form
    useLockBodyScroll.ts   // Hook to lock scroll when drawer is open
  /lib
    /firebase              
      product/
        create.ts          
        delete.ts          
        get.ts             
        update.ts          
      auth.ts              
      firebaseAdminConfig.ts 
      firebaseConfig.ts      
    /utils
      filters.ts           
      get-matched-product.ts 
    /validation
      product-schema.ts    
      sign-schema.ts       
  types.ts                 // Global TypeScript types

```

## ⏳ Development Timeline

- **2021.06.21** : Initial HTML prototype and planning
- **2025.03.26 ~ 2025.04.22** : Refactored with Next.js and TypeScript

## 📸 Demo

> Deployment link or images to be added later

## 🔮 Future Plans

- 🧠 Enhanced personalized quiz system
- 🌍 Consideration of i18n support for multiple languages
- 🔎 Advanced filtering (e.g., room type, care difficulty)
- 🧾 Integration with real payment and order system
- 📦 Order history and delivery tracking
- 💬 User review and rating features
