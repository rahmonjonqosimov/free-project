import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
	return (
		<>
			<Navbar />

			<main>
				<Outlet />
			</main>
		</>
	)
}

export default Layout
