import React, { useContext } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cardBodyTextOptions, options, formTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import ModalDialog from '../components/modal-dialog'
import { RegisterForm } from '../components/forms'
import { GlobalDispatchContext } from '../context/GlobalContextProvider'
import { utils } from '../utils/'
import Styles from './course-detail.module.scss'

export const query = graphql`
	query($slug: String!) {
		contentfulCourseItem(slug: { eq: $slug }) {
			image {
				title
				file {
					url
				}
			}
			slug
			headline
			location
			startDate(formatString: "DD. MMM")
			endDate(formatString: "DD. MMM YYYY")
			costs
			excerpt
			introText {
				json
			}
			body {
				json
			}
			formHeadline
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
	const formHeadline = data.contentfulCourseItem.formHeadline
	const formTextJSON = data.contentfulCourseItem.formText.json
	const startDate = utils.formatDate(data.contentfulCourseItem.startDate)
	const endDate = utils.formatDate(data.contentfulCourseItem.endDate)
	const prefilledText = `Ich interessiere mich für das Angebot "${headline}" im Zeitraum von ${startDate} bis ${endDate}`
	const dispatch = useContext(GlobalDispatchContext)

	// Metdata
	const slug = data.contentfulCourseItem.slug
	const url = `/kurse/${slug}`
	const sharerTitle = `${headline} / ${location}`
	const excerpt = data.contentfulCourseItem.excerpt

	return (
		<Layout pageInfo={{ pageName: 'kurse', pageType: 'subPage' }}>
			<Head title={headline} staticURL={url} sharerTitle={sharerTitle} sharerImage={imageURL} sharerDescription={excerpt} />
			<section className={`pt-5 pb-8 pb-sm-10 ${Styles.detailView}`}>
				<Container className={Styles.mobileContainer}>
					<Row>
						<Col xs={12} lg={7} className="pr-lg-0 pr-lg-3">
							<Card className="bg-dark overflow-hidden shadow-dark-sm">
								<div className="card-img-top">
									<img src={imageURL} alt={imageAlt} className="img-fluid" />
									<div className={`${Styles.cardImgTopDiv}`}>
										<div>
											<p className="text-white h6 mb-0">
												<i className="fe fe-map-pin mr-1"></i> {location}
											</p>
											<h1 className="h3 text-white mb-0">{headline}</h1>
										</div>
									</div>
								</div>
								<Card.Body className={`bg-white ${Styles.cardBody}`}>
									<div className="d-flex flex-column-reverse flex-sm-row justify-content-start align-items-start">
										<p className="h5 font-weight-bold">
											{startDate} bis {endDate}
										</p>
										<span className={`badge badge-secondary rounded mr-auto mr-sm-0 ml-sm-auto mb-3 ${Styles.badge}`}>Preis: {costs}</span>
									</div>
									<div className="normalize-last-p">
										{documentToReactComponents(introTextJSON, cardBodyTextOptions)}
										<Button
											className="btn btn-success btn-sm"
											onClick={() => {
												dispatch({ type: 'TOGGLE_MODAL' })
											}}
										>
											Jetzt anmelden
										</Button>
									</div>
								</Card.Body>
							</Card>
						</Col>
						<Col xs={12} className={`mt-5 pr-lg-0 pr-lg-3`}>
							<Card className={`shadow-dark-sm`}>
								<Card.Body className={`normalize-last-p ${Styles.cardBody}`}>{documentToReactComponents(bodyJSON, options)}</Card.Body>
							</Card>
						</Col>
						<ModalDialog data={{ headline: formHeadline }}>
							{documentToReactComponents(formTextJSON, formTextOptions)}
							<RegisterForm data={{ prefilledText }} />
						</ModalDialog>
					</Row>
				</Container>
			</section>
		</Layout>
	)
}

export default Course
