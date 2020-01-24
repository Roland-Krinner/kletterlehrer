import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
// import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { utils } from '../utils/'
import Layout from '../components/layout'
import Head from '../components/head'
import { RegisterForm } from '../components/forms'
import '../scss/__course-detail.scss'

const introTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="text-gray-800 xxx__text-muted">{children}</p>,
		[BLOCKS.HEADING_6]: (node, children) => <p className="h6 text-muted mb-0">{children}</p>,
		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className="d-flex list-item">
				<div className="badge badge-rounded-circle badge-secondary mt-1 mr-4">
					<i className="fe fe-check"></i>
				</div>
				<span className="mb-2">{children}</span>
			</div>
		),
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className="text-gray-800 font-weight-bold">{text}</span>,
	},
}

const options = {
	renderNode: {
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="mb-5 font-weight-bold">{children}</h3>,
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="mb-5 font-weight-bold">{children}</h2>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="text-gray-800">{children}</p>,
		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className="d-flex list-item">
				<div className="badge badge-rounded-circle badge-secondary mt-1 mr-4">
					<i className="fe fe-check"></i>
				</div>
				<span className="mb-2">{children}</span>
			</div>
		),
	},
	renderMark: {
		[MARKS.BOLD]: text => <span className="text-gray-800 font-weight-bold">{text}</span>,
	},
}

const handleScrollToForm = e => {
	e.preventDefault()
	const target = e.target.dataset.target
	const element = document.getElementById(target)
	element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

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
			author {
				name
				portrait {
					title
					file {
						url
					}
				}
			}
			introText {
				json
			}
			body {
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

	const startDate = utils.formatDate(data.contentfulCourseItem.startDate)
	const endDate = utils.formatDate(data.contentfulCourseItem.endDate)

	const prefilledText = `Ich interessiere mich für das Angebot "${headline}" im Zeitraum von ${startDate} bis ${endDate}`

	return (
		<Layout pageInfo={{ pageName: 'kurse', pageType: 'subPage' }}>
			<Head title={headline} />
			<section className="pt-5 pb-8 pb-sm-10 course-detail">
				<Container>
					<Row>
						<Col xs={12} xmd={8} lg={7} className="pr-lg-0 pr-lg-3 section">
							<div className="card detail-card content-card bg-dark overflow-hidden shadow-dark-sm">
								<div className="card-img-top">
									<img src={imageURL} alt={imageAlt} className="img-fluid" />
									<div>
										<div>
											<p className="text-white h6 mb-0">
												<i className="fe fe-map-pin mr-1"></i> {location}
												{/* <i className="fe fe-calendar ml-3 mr-1"></i> {startDate} */}
											</p>
											<h1 className="h3 text-white mb-0">{headline}</h1>
										</div>
									</div>
								</div>
								<div className="card-body bg-white">
									<div className="d-flex flex-column-reverse flex-sm-row justify-content-start align-items-start">
										<p className="h5 font-weight-bold">
											{startDate} bis {endDate}
										</p>
										<span className="badge badge-secondary rounded mr-auto mr-sm-0 ml-sm-auto  mb-3">Preis: {costs}</span>
									</div>
									<div className="normalize-last-p">
										{documentToReactComponents(introTextJSON, introTextOptions)}
										<a
											href="#!"
											className="btn btn-success btn-sm"
											data-target="registrationForm"
											onClick={e => {
												handleScrollToForm(e)
											}}
										>
											Jetzt anmelden
										</a>
									</div>
								</div>
							</div>
						</Col>
						<Col xs={12} xmd={8} lg={7} className="mt-5 pr-lg-0 pr-lg-3 section">
							<Card className="content-card shadow-dark-sm">
								<Card.Body className="normalize-last-p">{documentToReactComponents(bodyJSON, options)}</Card.Body>
							</Card>
						</Col>
						<Col xs={12} xmd={4} lg={5} className="mt-5 pl-lg-0 pl-lg-3 section" id="registrationForm">
							<Card className="content-card shadow-dark-sm">
								<Card.Body>
									<h3 className="h5 mb-3 font-weight-bold">Anmelden oder weitere Infos anfragen</h3>
									<p className="font-size-sm text-gray-800">At vero eos et accusam et justo duo dolores et ea rebum est Lorem ipsum dolor sit amet.</p>
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
