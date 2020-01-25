import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cardBodyTextOptions, options, formTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { RegisterForm } from '../components/forms'
import { utils } from '../utils/'
import '../scss/__course-detail.scss'

export const query = graphql`
	query($slug: String!) {
		contentfulCourseItem(slug: { eq: $slug }) {
			image {
				title
				file {
					url
				}
			}
			headline
			location
			startDate(formatString: "DD. MMM")
			endDate(formatString: "DD. MMM YYYY")
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
const Course = ({ data }) => {
	const imageURL = data.contentfulCourseItem.image.file.url
	const imageAlt = data.contentfulCourseItem.image.title
	const headline = data.contentfulCourseItem.headline
	const location = data.contentfulCourseItem.location
	const costs = data.contentfulCourseItem.costs
	const introTextJSON = data.contentfulCourseItem.introText.json
	const bodyJSON = data.contentfulCourseItem.body.json
	const formTextJSON = data.contentfulCourseItem.formText.json
	const startDate = utils.formatDate(data.contentfulCourseItem.startDate)
	const endDate = utils.formatDate(data.contentfulCourseItem.endDate)
	const prefilledText = `Ich interessiere mich für das Angebot "${headline}" im Zeitraum von ${startDate} bis ${endDate}`

	return (
		<Layout pageInfo={{ pageName: 'kurse', pageType: 'subPage' }}>
			<Head title={headline} />
			<section className="pt-5 pb-8 pb-sm-10 course-detail">
				<Container>
					<Row>
						<Col xs={12} lg={7} className="pr-lg-0 pr-lg-3 section">
							<Card className="detail-card content-card bg-dark overflow-hidden shadow-dark-sm">
								<div className="card-img-top">
									<img src={imageURL} alt={imageAlt} className="img-fluid" />
									<div>
										<div>
											<p className="text-white h6 mb-0">
												<i className="fe fe-map-pin mr-1"></i> {location}
											</p>
											<h1 className="h3 text-white mb-0">{headline}</h1>
										</div>
									</div>
								</div>
								<Card.Body className="bg-white">
									<div className="d-flex flex-column-reverse flex-sm-row justify-content-start align-items-start">
										<p className="h5 font-weight-bold">
											{startDate} bis {endDate}
										</p>
										<span className="badge badge-secondary rounded mr-auto mr-sm-0 ml-sm-auto mb-3">Preis: {costs}</span>
									</div>
									<div className="normalize-last-p">
										{documentToReactComponents(introTextJSON, cardBodyTextOptions)}
										<a
											href="#!"
											className="btn btn-success btn-sm"
											data-target="registrationForm"
											onClick={e => {
												utils.ScrollTo(e)
											}}
										>
											Jetzt anmelden
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

export default Course
