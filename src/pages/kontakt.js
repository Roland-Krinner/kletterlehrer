import React from 'react'
import { Container } from 'react-bootstrap'
// import { Link } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'

const Contact = () => {
	return (
		<Layout pageInfo={{ pageName: 'kontakt', pageType: 'subPage' }}>
			<Head title="Home" />
			<Container>
				<h1>Contact Page</h1>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis beatae, incidunt amet repellendus vitae reiciendis in consequuntur voluptas laborum adipisci deleniti iste ipsam! Voluptatibus libero fugit voluptates amet vel. Nam!</p>
			</Container>
		</Layout>
	)
}

export default Contact
