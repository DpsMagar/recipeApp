import {create} from 'zustand'

const bookmarkStore = create((set)=>({
    bookmarks: {},
    toggleBookmark: (title) => set((state) => ({
      bookmarks: {
        ...state.bookmarks,
        [title]: !state.bookmarks[title]
      }
    }))
}));

export default bookmarkStore;