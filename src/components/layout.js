import React from 'react'

import Header from '../components/header'
import Footer from '../components/footer'

import layoutStyles from './layout.module.scss'
import '../scss/default.scss'

const Layout = ({ children, pageInfo }) => {
	return (
		<div className={layoutStyles.container}>
			<div className={layoutStyles.content}>
				<Header pageInfo={pageInfo} />
				{children}
			</div>
			<Footer />
		</div>
	)
}

export default Layout
