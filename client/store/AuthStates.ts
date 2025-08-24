import { create } from 'zustand';

type Signintype = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const useSignBox = create<Signintype>((set) => ({
  isOpen: false,
  setOpen: (value: boolean) => set({ isOpen: value }),
}));

type IsSignedintype = {
  isSignedin: boolean | null;
  setSignedin: (value: boolean | null) => void;
};

export const useIsSignedin = create<IsSignedintype>((set) => ({
  isSignedin: null,
  setSignedin: (value: boolean | null) => set({ isSignedin: value }),
}));

type Usernametype = {
  username: string;
  setUsername: (value: string) => void;
};

export const useUsername = create<Usernametype>((set) => ({
  username: '',
  setUsername: (value: string) => set({ username: value }),
}));
