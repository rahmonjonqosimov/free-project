import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
	const { setTheme, theme } = useTheme()

	return (
		<>
			{theme === 'dark' ? (
				<Button variant={'ghost'} onClick={() => setTheme('light')}>
					<Sun className='w-4 h-4' />
				</Button>
			) : (
				<Button variant={'ghost'} onClick={() => setTheme('dark')}>
					<Moon className='w-4 h-4' />
				</Button>
			)}
		</>
	)
}
