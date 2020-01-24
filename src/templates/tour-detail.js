import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { introTextOptions, options, formTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { RegisterForm } from '../components/forms'
import { utils } from '../utils/'
import '../scss/__tour-detail.scss'

export const query = graphql`
	query($slug: String!) {
		contentfulTourItem(slug: { eq: $slug }) {
			image {
				title
				file {
					url
				}
			}
			headline
			subline
			costs
			introText {
				json
			}
			body {
				json
			}
			formText {
				json
			}
		}
	}
`
const Tour = ({ data }) => {
	const imageURL = data.contentfulTourItem.image.file.url
	const imageAlt = data.contentfulTourItem.image.title
	const headline = data.contentfulTourItem.headline
	const costs = data.contentfulTourItem.costs
	const introTextJSON = data.contentfulTourItem.introText.json
	const bodyJSON = data.contentfulTourItem.body.json
	const formTextJSON = data.contentfulTourItem.formText.json
	const prefilledText = `Ich interessiere mich für das Angebot "${headline}"`

	return (
		<Layout pageInfo={{ pageName: 'touren', pageType: 'subPage' }}>
			<Head title={headline} />
			<section className="pt-5 pb-8 pb-sm-10 tour-detail">
				<Container>
					<Row>
						<Col xs={12} lg={7} className="pr-lg-0 pr-lg-3 section">
							<Card className="detail-card content-card bg-dark overflow-hidden shadow-dark-sm">
								<div className="card-img-top">
									<img src={imageURL} alt={imageAlt} className="img-fluid" />
									<div>
										<div>
											<h1 className="h3 text-white mb-0">{headline}</h1>
										</div>
									</div>
								</div>
								<Card.Body className="bg-white">
									<div className="d-flex align-items-start">
										<span className="badge badge-secondary rounded mb-3">Preis: {costs}</span>
									</div>
									<div className="normalize-last-p">
										{documentToReactComponents(introTextJSON, introTextOptions)}
										<a
											href="#!"
											className="btn btn-success btn-sm"
											data-target="registrationForm"
											onClick={e => {
												utils.ScrollTo(e)
											}}
										>
											Angebot anfragen
										</a>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={7} className="mt-5 pr-lg-0 pr-lg-3 section">
							<Card className="content-card shadow-dark-sm">
								<Card.Body className="normalize-last-p">{documentToReactComponents(bodyJSON, options)}</Card.Body>
							</Card>
						</Col>
						<Col xs={12} lg={5} className="mt-5 pl-lg-0 pl-lg-3 section" id="registrationForm">
							<Card className="content-card shadow-dark-sm">
								<Card.Body>
									{documentToReactComponents(formTextJSON, formTextOptions)}
									<RegisterForm data={{ prefilledText }} />
								</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</Layout>
	)
}

export default Tour
