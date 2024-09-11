import { set } from 'react-hook-form';
import { create } from 'zustand';

const bookmarkStore = create((set) => ({
  bookmarks: {},

  // Function to initialize bookmarks from API response
  setBookmarks: (dishes) => set((state) => {
    const newBookmarks = dishes.reduce((acc, dish) => {
      acc[dish.title] = dish.isBookmarked;
      return acc;
    }, {});
    return { bookmarks: newBookmarks };
  }),

  // Function to toggle the bookmark state
  toggleBookmark: (title) => set((state) => ({
    bookmarks: {
      ...state.bookmarks,
      [title]: !state.bookmarks[title]
    }
  }))
}));


const focusStore = create((set) => ({
  focus: true,
  toggleFocus: () => set((state) => ({
    focus: !state.focus
  }))
}));

const formActivationStore= create((set)=>({
  isFormActive:true,
  toggleFormActivation: ()=>set((state)=>({
    isFormActive: !state.isFormActive
  }))
}))

const IDandTitleStore= create((set)=>({
  id:null,
  title:'',
  setId:(id)=>set({id:id}),
  setTitle:(title)=>set({title:title})
}))
export { bookmarkStore, focusStore, formActivationStore, IDandTitleStore };
