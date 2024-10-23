import { useEffect } from 'react';
import { create } from 'zustand';

interface StoreState {
  name: string;
  firstLetter: string;
  setName: (name: string) => void;
}

const useStore = create<StoreState>((set) => ({
  name: '',
  firstLetter: '',
  setName: (name) => set({ name, firstLetter: name.charAt(0) }),
}));

export const useConstantStore = () => {
  const { name, firstLetter, setName } = useStore();

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, [setName]);

  return { name, firstLetter, setName };
};

export default useStore;