import { create } from 'zustand';

interface StoreState {
  name: string;
  firstLetter: string;
  setName: (name: string) => void;
}

const useStore = create<StoreState>((set) => ({
  name: '',
  firstLetter: '',
  setName: (name) => {
    localStorage.setItem('name', name);
    set({ name, firstLetter: name.charAt(0) });
  },
}));

export default useStore;
