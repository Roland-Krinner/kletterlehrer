import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'gatsby'

const Footer = () => {
	return (
		<footer>
			<Container fluid className="py-4 bg-dark">
				<Row>
					<Col xs={12} className="d-sm-flex flex-row-reverse">
						<p className="text-muted mb-0 ml-auto text-center text-sm-left mb-2 mb-sm-0">
							<Link to="/impressum" className="text-reset">
								Impressum
							</Link>
							<Link to="/datenschutz" className="text-reset ml-3">
								Datenschutz
							</Link>
						</p>
						<p className="text-muted mb-0 mr-auto text-center text-sm-left">
							&copy; {new Date().getFullYear()}{' '}
							<span>Copyright</span>
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
