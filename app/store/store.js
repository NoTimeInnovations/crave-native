import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export const useAdminStore = create((set, get) => ({
  // State
  menuItems: [],
  offers: [],
  loading: false,
  error: null,

  // Actions for Menu
  fetchMenu: () => {
    // Simulate fetching menu items
    const fetchedMenu = [
      { id: uuidv4(), name: 'Grilled Chicken', price: 300, image: 'https://www.budgetbytes.com/wp-content/uploads/2024/06/Grilled-Chicken-Overhead.jpg', description: 'Juicy grilled chicken' },
      { id: uuidv4(), name: 'Veggie Delight', price: 200, image: 'https://s.lightorangebean.com/media/20240914161537/Ultimate-Veggie-Delight-Sandwich_-done.png', description: 'Fresh vegetable platter' },
    ];
    set({ menuItems: fetchedMenu });
  },

  addMenuItem: (item) => {
    const newItem = { ...item, id: uuidv4() };
    set((state) => ({ menuItems: [...state.menuItems, newItem] }));
  },

  updateMenuItem: (id, updatedFields) => {
    set((state) => ({
      menuItems: state.menuItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      ),
    }));
  },

  deleteMenuItem: (id) => {
    set((state) => ({
      menuItems: state.menuItems.filter((item) => item.id !== id),
    }));
  },

  // Actions for Offers
  fetchOffers: () => {
    // Simulate fetching offers
    const fetchedOffers = [
      { id: uuidv4(), menuItemId: '', newPrice: 250, validUntil: new Date(), itemsAvailable: 10, enquiries: 0 },
    ];
    set({ offers: fetchedOffers });
  },

  addOffer: (offer) => {
    const menuItem = get().menuItems.find((item) => item.id === offer.menuItemId);
    if (!menuItem) {
      set({ error: 'Menu item not found' });
      return;
    }

    const newOffer = {
      ...offer,
      id: uuidv4(),
      dishName: menuItem.name,
      dishImage: menuItem.image,
      originalPrice: menuItem.price,
      description: menuItem.description,
      enquiries: 0,
    };

    set((state) => ({ offers: [...state.offers, newOffer] }));
  },

  updateOffer: (id, updatedFields) => {
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === id ? { ...offer, ...updatedFields } : offer
      ),
    }));
  },

  deleteOffer: (id) => {
    set((state) => ({
      offers: state.offers.filter((offer) => offer.id !== id),
    }));
  },

  incrementEnquiry: (id) => {
    set((state) => ({
      offers: state.offers.map((offer) =>
        offer.id === id
          ? { ...offer, enquiries: offer.enquiries + 1 }
          : offer
      ),
    }));
  },
}));
