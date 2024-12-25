import { AuthType } from '@/interfaces'
import { create } from 'zustand'
type AuthStore = {
	authState: AuthType
	setAuthState: (authState: AuthType) => void
}

export const useAuth = create<AuthStore>(set => ({
	authState: 'login',
	setAuthState: state => set({ authState: state }),
}))
