import React from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import ReCAPTCHA from 'react-google-recaptcha'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import Head from '../components/head'

const Contact = () => {
	const headline = 'Kontakt'
	const displayHeadline = true
	const subline = 'Subline'
	const displaySubline = true
	return (
		<Layout pageInfo={{ pageName: 'kontakt', pageType: 'subPage' }}>
			<Head title="Kontakt" />
			<section className="bg-light">
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
				</Container>
			</section>
			<section className="pt-8 pt-md-11 bg-light">
				<Container>
					<Row className="align-items-center">
						<Col xs={12}>
							<Link to="/" className="font-weight-bold font-size-sm text-decoration-none mb-3">
								<i className="fe fe-arrow-left mr-3"></i> Zurück zur Startseite
							</Link>
							{displayHeadline === true ? <h1 className="display-4 mb-2">{headline}</h1> : ''}
							{displaySubline === true ? <p className="font-size-lg text-gray-700 mb-5 mb-md-0">{subline}</p> : ''}
						</Col>
					</Row>
					<Row>
						<Col xs={12}>
							<hr className="my-6 my-md-8 border-gray-300" />
						</Col>
					</Row>
					<Row>
						<Col xs={12} md={8}>
							<h2>Fragen Sie mich!</h2>
							<p>Benötigen Sie Informationen zu einer Tour oder möchten Sie eigene Vorschläge einbringen?</p>
							<p>Senden Sie mir eine E-Mail (oder das nachfolgende Formular ausgefüllt zurück) und ich melde mich zeitnah bei Ihnen.</p>
							{/* {documentToReactComponents(bodyJSON, options)} */}
							<Form name="Nachricht Test" method="POST" data-netlify="true" data-netlify-recaptcha="true" action="/danke-fuer-die-nachricht">
								<input type="hidden" name="form-name" value="Nachricht Test" />
								<Form.Row>
									<Form.Group as={Col} controlId="formName">
										<Form.Label>Name</Form.Label>
										<Form.Control type="text" placeholder="Dein Name" name="name" required />
									</Form.Group>
									<Form.Group as={Col} controlId="formEmail">
										<Form.Label>E-Mail</Form.Label>
										<Form.Control type="email" placeholder="Deine E-Mail Adresse" name="email" required />
									</Form.Group>
								</Form.Row>
								<Form.Group controlId="formTextarea">
									<Form.Label>Nachricht</Form.Label>
									<Form.Control as="textarea" rows="3" placeholder="Deine Nachricht" name="message" required />
								</Form.Group>
								<Form.Group>
									<ReCAPTCHA sitekey={process.env.GATSBY_RECAPTCHA_KEY} />
								</Form.Group>
								<Button variant="success" type="submit" className="btn-sm btn-submit">
									Nachricht senden <i className="fe fe-send ml-2"></i>
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</section>

			{/* <h1>Contact Page</h1>
				<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis beatae, incidunt amet repellendus vitae reiciendis in consequuntur voluptas laborum adipisci deleniti iste ipsam! Voluptatibus libero fugit voluptates amet vel. Nam!</p> */}
			{/* <form name="xxx Test Form" method="POST" data-netlify="true" action="/thank-you">
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
				</form> */}
		</Layout>
	)
}

export default Contact
