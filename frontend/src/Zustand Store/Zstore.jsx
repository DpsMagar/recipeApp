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
  focus: false,
  toggleFocus: () => set((state) => ({
    focus: !state.focus
  }))
}));

export { bookmarkStore, focusStore };
