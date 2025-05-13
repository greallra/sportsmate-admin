import { create } from 'zustand';
import User from '@/types/User';
import Todo from '@/types/Todo';

import { signInWithEmailAndPassword, getAuth, onAuthStateChanged } from 'firebase/auth';
import { appendAuthDataToUser, esGetDoc, formatUserData, esGetCollection } from 'exchanges-shared';
import { db as FIREBASE_DB } from '../../firebaseConfig';

type Store = {
  loading: boolean;
  user: User;
  users: [];
  todos: Todo[];
  languages: [];
  exchanges: [];
  getData: () => void;
};

export const useStore = create<Store>()((set) => ({
  user: undefined, // <-- initially "unknown"
  getData: async (): Promise<void> => {
    try {
      const { data: languages } = await esGetCollection(FIREBASE_DB, 'languages');
      const { data: users } = await esGetCollection(FIREBASE_DB, 'users');
      const { data: exchanges } = await esGetCollection(FIREBASE_DB, 'exchanges');
      set(() => ({ languages, users, exchanges }));
    } catch (error) {
      console.log('getData err', error);
    }
  },
  signIn: async (username: string, password: string): Promise<void> => {
    // login process
  },
  fetchCurrentUser: async (): Promise<void> => {
    try {
      // const response: AxiosResponse<AuthResponse> = await apiSecure.get(`/auth/currentuser`);

      // const { data } = response.data;
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        //admin
        // if (location.pathname.includes('admin')) {
        //   return;
        // }
        // if no user setUser(LS) to null
        if (!user) {
          return set({ user: null });
          // return navigate('/', { replace: true });
        }
        console.log('zus auth user', user);
        const userData = appendAuthDataToUser(user);

        return esGetDoc(FIREBASE_DB, 'users', user.uid)
          .then(({ docSnap }) => {
            const combinedAuthAndCollection = { ...userData, ...docSnap.data() };
            set({ user: combinedAuthAndCollection });
            console.log('combinedAuthAndCollection', combinedAuthAndCollection);
            // login(combinedAuthAndCollection);
          })
          .catch((e) => console.log(e));
      });
    } catch (error: unknown) {
      // Handle authentication errors
      set({ user: null }); // <-- auth failed, set null
    }
  },
  todos: [],
  setTodos: (todos: Todo[]) => set(() => ({ todos: todos })),
  loading: false,
  setLoading: () => set(() => ({ loading: true })),
  stopLoading: () => set((state) => ({ loading: false })),
}));
