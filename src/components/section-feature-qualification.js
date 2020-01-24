import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {  Link } from 'gatsby'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const Feature = () => {
	return (
		<section className="py-8 py-md-11 bg-white">
			<Container>
				<Row className="align-items-center">
					<Col className="col-12 col-md-3">
						<img src="https://placehold.it/500x500" alt="..." class="xx__screenshot img-fluid rounded-circle xxmw-md-110 float-right xxmr-md-6 xxmb-6 xxmb-md-0" />
					</Col>
					<Col className="col-12 col-md-9 pl-6">
						<h2>Bastian Speckle</h2>
						{/* <h2>Staatlich geprüfter Berg- und Skiführer</h2> */}
						<p className="xxx__font-size-lg text-muted">Staatlich geprüfter Berg- und Skiführer. Der Bergführerberuf ist vordergründig eine Dienstleistungstätigkeit, tatsächlich ist der Berg- und Skiführer aber auch Vertrauter, Berater, Helfer, Unterhalter, mentaler Trainer und “Risikomanager” in einer Person.</p>
						
									<Link className="xbtn xbtn-success xbtn-sm font-weight-bold text-decoration-none text-success" to="/ueber-mich">
									Zum Profil<i className="fe fe-arrow-right ml-3"></i>
								</Link>
						{/* <p className="font-size-lg text-muted">Der Bergführerberuf ist vordergründig eine Dienstleistungstätigkeit, tatsächlich ist der Berg- und Skiführer aber auch Vertrauter, Berater, Helfer, Unterhalter, mentaler Trainer und “Risikomanager” in einer Person. Bergführer gehen Ihrer Berufung hauptberuflich nach oder kombinieren diese Tätigkeit mit bergaffinen Berufen wie z.B. Sachverständigentätigkeit, Produktentwicklung, Erlebnispädagogik, Fotografie etc.</p> */}
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Feature
