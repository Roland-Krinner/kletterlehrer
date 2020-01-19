import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'

const Contact = () => {
	return (
		<Layout pageInfo={{ pageName: 'kontakt', pageType: 'subPage' }}>
			<Head title="Kontakt" />
			<Container>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb breadcrumb-scroll">
						<li className="breadcrumb-item">
							<Link className="text-gray-700" to="/">
								Startseite
							</Link>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Kontakt
						</li>
					</ol>
				</nav>
				<h1>Contact Page</h1>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis beatae, incidunt amet repellendus vitae reiciendis in consequuntur voluptas laborum adipisci deleniti iste ipsam! Voluptatibus libero fugit voluptates amet vel. Nam!</p>
				<form name="xxx Test Form" method="POST" data-netlify="true">
					<input type="hidden" name="form-name" value="xxx Test Form" />
					<div>
						<label>Your Email:</label>
						<input type="email" name="email" />
					</div>
					<div>
						<label>Message:</label>
						<textarea name="message" />
					</div>
					<button type="submit">Send</button>
				</form>
			</Container>
		</Layout>
	)
}

export default Contact
