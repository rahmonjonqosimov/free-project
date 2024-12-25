import ForgetPassword from '@/components/auth/forget-password/ForgetPassword'
import Login from '@/components/auth/login/Login'
import Register from '@/components/auth/register/Register'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
	const { authState } = useAuth()

	const navigate = useNavigate()
	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			navigate('/')
		}
	}, [])
	return (
		<section className='container'>
			<div className='w-full h-[calc(100vh-80px)] flex items-center justify-center'>
				<Card className='max-w-xl p-3 relative w-full '>
					<CardContent className='p-2'>
						{authState === 'login' && <Login />}
						{authState === 'forgot-password' && <ForgetPassword />}
						{authState === 'register' && <Register />}
					</CardContent>
				</Card>
			</div>
		</section>
	)
}

export default Auth
