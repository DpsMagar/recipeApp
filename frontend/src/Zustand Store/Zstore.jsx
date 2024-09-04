import { set } from 'react-hook-form';
import { create } from 'zustand';

const bookmarkStore = create((set) => ({
  bookmarks: {},
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

export { bookmarkStore, focusStore, formActivationStore };
