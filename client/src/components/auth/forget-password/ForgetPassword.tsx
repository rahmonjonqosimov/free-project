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
import { emailSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
const ForgetPassword = () => {
	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: {
			email: '',
		},
	})

	function onSubmit(values: z.infer<typeof emailSchema>) {
		console.log(values)
	}

	const { setAuthState } = useAuth()
	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-0'>
					<h2 className='text-2xl text-center font-bold'>Forget Password</h2>

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

export default ForgetPassword
