"use client";
// redux/cartslice.js
import { createSlice } from '@reduxjs/toolkit';

// ✅ NEW - Helper functions for localStorage
const loadFromLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const saved = localStorage.getItem('veloraCart');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return null;
  }
};

const saveToLocalStorage = (state) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('veloraCart', JSON.stringify({
      items: state.items,
      userId: state.userId,
      guestCart: state.guestCart,
      userCarts: state.userCarts,
    }));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    userId: null,
    guestCart: [],
    userCarts: {},
    initialized: false, // ✅ NEW - Track if cart is loaded
  },
  reducers: {
    // ✅ NEW - Initialize cart from localStorage
    initializeCart: (state) => {
      if (state.initialized) return; // Already initialized
      
      const saved = loadFromLocalStorage();
      if (saved) {
        state.items = saved.items || [];
        state.userId = saved.userId || null;
        state.guestCart = saved.guestCart || [];
        state.userCarts = saved.userCarts || {};
        console.log('✅ Cart loaded from localStorage');
      }
      state.initialized = true;
    },

    // ✅ UPDATED - User login - guest cart merge with user cart
    setUserId: (state, action) => {
      const userId = action.payload;
      console.log(`👤 Setting user ID: ${userId}`);
      
      state.userId = userId;
      
      // Agar guest cart mein items hain
      if (state.guestCart.length > 0) {
        console.log(`📦 Merging ${state.guestCart.length} guest items`);
        
        // User ki existing cart load karo
        if (!state.userCarts[userId]) {
          state.userCarts[userId] = [];
        }
        
        // Guest items ko user cart mein merge karo
        state.guestCart.forEach(guestItem => {
          const existing = state.userCarts[userId].find(
            item => item.id === guestItem.id && 
                    item.size === guestItem.size && 
                    item.color === guestItem.color
          );
          
          if (existing) {
            existing.quantity += guestItem.quantity;
            existing.totalPrice = existing.price * existing.quantity;
          } else {
            state.userCarts[userId].push({...guestItem});
          }
        });
        
        // Current items update karo
        state.items = state.userCarts[userId];
        
        // Guest cart clear karo (optional - aap comment kar sakte ho)
        // state.guestCart = [];
        
        console.log(`✅ Merged! User cart now has ${state.items.length} items`);
      } else {
        // Guest cart empty hai, user ki saved cart load karo
        state.items = state.userCarts[userId] || [];
        console.log(`✅ Loaded ${state.items.length} items for user`);
      }
      
      // ✅ Save to localStorage
      saveToLocalStorage(state);
    },

    // ✅ UPDATED - Add to cart
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log("🛒 Adding item:", newItem.name);

      // ✅ NEW - Validate required fields
      if (!newItem.productId || !newItem.name || !newItem.price) {
        console.error('❌ Invalid item:', newItem);
        return;
      }

      // ✅ NEW - Create unique ID if not provided
      const uniqueId = newItem.id || `${newItem.productId}_${newItem.size}_${newItem.color || 'default'}`;

      if (state.userId) {
        // Logged-in user
        const existing = state.items.find(
          item => item.id === uniqueId || (
            item.productId === newItem.productId &&
            item.size === newItem.size && 
            item.color === newItem.color
          )
        );

        if (existing) {
          existing.quantity += newItem.quantity || 1;
          existing.totalPrice = existing.price * existing.quantity;
        } else {
          const item = {
            id: uniqueId, // ✅ Ensure ID is set
            productId: newItem.productId,
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity || 1,
            size: newItem.size || null,
            color: newItem.color || null,
            image: newItem.image || '/placeholder-image.jpg', // ✅ Fallback
            totalPrice: newItem.price * (newItem.quantity || 1),
          };
          state.items.push(item);
        }
        
        // User cart update karo
        state.userCarts[state.userId] = state.items;
        console.log(`✅ Added to user cart. Total: ${state.items.length}`);
        
      } else {
        // Guest user
        const existing = state.guestCart.find(
          item => item.id === uniqueId || (
            item.productId === newItem.productId &&
            item.size === newItem.size && 
            item.color === newItem.color
          )
        );

        if (existing) {
          existing.quantity += newItem.quantity || 1;
          existing.totalPrice = existing.price * existing.quantity;
        } else {
          const item = {
            id: uniqueId,
            productId: newItem.productId,
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity || 1,
            size: newItem.size || null,
            color: newItem.color || null,
            image: newItem.image || '/placeholder-image.jpg',
            totalPrice: newItem.price * (newItem.quantity || 1),
          };
          state.guestCart.push(item);
        }
        console.log(`✅ Added to guest cart. Total: ${state.guestCart.length}`);
      }
      
      // ✅ Save to localStorage
      saveToLocalStorage(state);
    },

    // ✅ Remove from cart (already good)
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      console.log("🗑️ Removing item:", itemId);

      if (state.userId) {
        state.items = state.items.filter(item => item.id !== itemId);
        state.userCarts[state.userId] = state.items;
      } else {
        state.guestCart = state.guestCart.filter(item => item.id !== itemId);
      }
      
      console.log("✅ Item removed");
      
      // ✅ Save to localStorage
      saveToLocalStorage(state);
    },

    // ✅ Update quantity (already good)
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      console.log(`📝 Updating quantity: ${id} -> ${quantity}`);

      const cart = state.userId ? state.items : state.guestCart;
      const item = cart.find(i => i.id === id);
      
      if (item) {
        item.quantity = quantity;
        item.totalPrice = item.price * quantity;
        
        if (state.userId) {
          state.userCarts[state.userId] = state.items;
        }
      }
      
      console.log("✅ Quantity updated");
      
      // ✅ Save to localStorage
      saveToLocalStorage(state);
    },

    // ✅ Clear cart (already good)
    clearCart: (state) => {
      console.log("🧹 Clearing cart");
      
      if (state.userId) {
        state.items = [];
        state.userCarts[state.userId] = [];
      } else {
        state.guestCart = [];
      }
      
      // ✅ Save to localStorage
      saveToLocalStorage(state);
    },

    // ✅ Logout (already good)
    logoutUser: (state) => {
      console.log(`👋 Logging out user: ${state.userId}`);
      
      // Items clear karo but userCarts mein save rahega
      state.items = [];
      state.userId = null;
      
      console.log("✅ Switched to guest mode");
      
      // ✅ Save to localStorage
      saveToLocalStorage(state);
    },
  },
});

export const {
  initializeCart, // ✅ NEW export
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setUserId,
  logoutUser,
} = cartSlice.actions;

export default cartSlice.reducer;