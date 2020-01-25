import React from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import Notification from '../components/notification'
import { Provider as MyProvider } from '../context/context'
import layoutStyles from './layout.module.scss'
import '../scss/default.scss'

const Layout = ({ children, pageInfo }) => {
	return (
		<MyProvider>
			<div className={layoutStyles.container}>
				<div className={`${layoutStyles.content} bg-light`}>
					<Header pageInfo={pageInfo} />
					{children}
				</div>
				<Footer />
				<Notification />
			</div>
		</MyProvider>
	)
}

export default Layout
