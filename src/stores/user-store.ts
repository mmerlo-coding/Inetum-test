import { create } from "zustand";
import { User } from "@/types/user-type"; // Make sure this path is correct

interface UserState {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  setSelectedUser: (user) => set({ selectedUser: user }),
}));
