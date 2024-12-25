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
import { useAuth } from '@/hooks/useAuth'
import { registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const Register = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false)

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: '',
			name: '',
			password: '',
			avatar: '',
		},
	})

	function onSubmit(values: z.infer<typeof registerSchema>) {
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
					<h2 className='text-2xl text-center font-bold'>Register</h2>

					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<Label>Name*</Label>
								<FormControl>
									<Input placeholder='Name' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>

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

					<FormField
						control={form.control}
						name='avatar'
						render={({ field }) => (
							<FormItem>
								<Label>
									Picture{' '}
									<span className='text-muted-foreground text-xs'>
										(optional)
									</span>
								</Label>
								<FormControl>
									<Input placeholder='File' type='file' {...field} />
								</FormControl>
								<FormMessage className='text-red-500 text-xs' />
							</FormItem>
						)}
					/>

					<div className='flex justify-end'>
						<span
							onClick={() => setAuthState('login')}
							className='text-sm hover:underline text-blue-500 cursor-pointer'
						>
							Login
						</span>
					</div>

					<Button variant={'secondary'} type='submit'>
						Submit
					</Button>
				</form>
			</Form>
		</>
	)
}

export default Register
