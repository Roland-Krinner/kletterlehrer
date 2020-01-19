import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'

const Tours = () => {
	return (
		<Layout pageInfo={{ pageName: 'touren', pageType: 'subPage' }}>
			<Head title="Touren" />
			<Container>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb breadcrumb-scroll">
						<li className="breadcrumb-item"><Link className="text-gray-700" to="/">Startseite</Link></li>
						<li className="breadcrumb-item active" aria-current="page">Touren</li>
					</ol>
				</nav>
				<h1>Touren</h1>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis beatae, incidunt amet repellendus vitae reiciendis in consequuntur voluptas laborum adipisci deleniti iste ipsam! Voluptatibus libero fugit voluptates amet vel. Nam!</p>
			</Container>
		</Layout>
	)
}

export default Tours
