import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/useAuth'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const Login = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof loginSchema>) {
		console.log(values)
	}
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const { setAuthState } = useAuth()
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-0'>
					<h2 className='text-2xl text-center font-bold'>Log In</h2>
					<p className=' text-sm text-muted-foreground'>
						Don't have an account?
						<span
							onClick={() => setAuthState('register')}
							className='cursor-pointer text-blue-500 hover:underline ml-1'
						>
							Sign up
						</span>
					</p>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<Label>Email*</Label>
								<FormControl>
									<Input placeholder='Email' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<Label>Password*</Label>
								<FormControl>
									<div className='relative'>
										<Input
											type={showPassword ? 'text' : 'password'}
											{...field}
											placeholder={showPassword ? 'Password' : '******'}
											className='pr-10'
										/>
										<Button
											variant={'secondary'}
											type='button'
											onClick={togglePasswordVisibility}
											className='absolute right-0 top-1/2 transform -translate-y-1/2'
										>
											{showPassword ? (
												<EyeOff className='w-5 h-5' />
											) : (
												<Eye className='w-5 h-5' />
											)}
										</Button>
									</div>
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>
					<div className='flex items-center gap-2'>
						<Separator className='flex-1' />
						<span className='text-muted-foreground text-xs'>Or</span>
						<Separator className='flex-1' />
					</div>
					<div className='flex justify-end'>
						<span
							onClick={() => setAuthState('forgot-password')}
							className='text-sm hover:underline text-blue-500 cursor-pointer'
						>
							Forgot password?
						</span>
					</div>

					<Button variant={'secondary'} type='submit'>
						Log In{' '}
					</Button>
				</form>
			</Form>
		</>
	)
}

export default Login
