import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import './index.css'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
					<App />
				</ThemeProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</StrictMode>
)
