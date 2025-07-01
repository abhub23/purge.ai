import { create } from 'zustand';

type Signintype = {
  isOpen: boolean;
  setOpen: (status: boolean) => void;
};

export const useSignin = create<Signintype>((set) => ({
  isOpen: false,
  setOpen: (status: boolean) => set({ isOpen: status }),
}));
