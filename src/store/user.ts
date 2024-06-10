import { User } from '@prisma/client';
import { create } from 'zustand';

interface UserStore {
    user: User | null;
    setUser: (user: User) => void;
}

export const UserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    fetchUser: async () => {
        // fetch user
        try {
            const user = await fetch(`/api/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await user.json();
            set({ user: data.user });
        }
        catch (error) {
            console.error(error);
        }
    }
}));