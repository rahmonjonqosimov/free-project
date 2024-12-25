import $axios from '@/http'
import { useQuery } from '@tanstack/react-query'

const Home = () => {
	const { data } = useQuery({
		queryKey: ['get-users'],
		queryFn: async () => {
			const { data } = await $axios.get('/user/get-all')
			return data
		},
	})
	console.log(data)
	return <div>Home</div>
}

export default Home
