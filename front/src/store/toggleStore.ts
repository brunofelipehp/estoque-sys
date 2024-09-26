import { create } from 'zustand';

interface ToggleStateProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const useMenuStore = create<ToggleStateProps>((set) => ({
  isOpen: false,
  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useMenuStore;
