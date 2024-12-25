import { useAuth } from '@/hooks/useAuth'
import { LogIn } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

const Navbar: React.FC = () => {
	const { setAuthState } = useAuth()

	const handleAuthStateClick = () => {
		setAuthState('login')
	}
	return (
		<>
			<header className='shadow-md py-3'>
				<div className='container'>
					<div className='flex items-center justify-between'>
						<Link to='/' className='font-bold text-2xl'>
							LOGO
						</Link>
						<div className='flex gap-2'>
							<ModeToggle />
							<Link to='/auth'>
								<Button onClick={handleAuthStateClick} variant={'ghost'}>
									<LogIn />
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</header>
			<Separator />
		</>
	)
}

export default Navbar
