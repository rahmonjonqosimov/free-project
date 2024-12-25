import { Route, Routes } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Layout from './pages/Layout'

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/auth' element={<Auth />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
