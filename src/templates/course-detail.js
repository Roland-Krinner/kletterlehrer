import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
// import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import { BLOCKS, MARKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { utils } from '../utils/'
import Layout from '../components/layout'
import Head from '../components/head'
import '../scss/__course-detail.scss'

const introTextOptions = {
	renderNode: {
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="text-muted">{children}</p>,
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
		[MARKS.BOLD]: text => <p className="text-gray-800 font-weight-bold">{text}</p>,
	},
}

const options = {
	renderNode: {
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="mb-5">{children}</h3>,
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="mb-5">{children}</h2>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="text-gray-800">{children}</p>,
		[BLOCKS.QUOTE]: (node, children) => <blockquote className="xxx__blockquote">{children}</blockquote>,
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
		[MARKS.BOLD]: text => <p className="text-gray-800 font-weight-bold">{text}</p>,
	},
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

	return (
		<Layout pageInfo={{ pageName: 'kurse', pageType: 'subPage' }}>
			<Head title={headline} />
			<section className="pt-6 pb-12 course-detail">
				<Container>
					<Row>
						<Col xs={12} md={8}>
							<div className="card detail-card overflow-hidden shadow-dark-sm">
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
									<div className="d-flex align-items-start">
										<p className="text-muted">
											Von {startDate} bis {endDate}
										</p>
										<span class="badge badge-success ml-auto">Preis: {costs}</span>
									</div>
									<div className="normalize-last-p">{documentToReactComponents(introTextJSON, introTextOptions)}</div>
								</div>
							</div>
						</Col>
						<Col xs={12} className="mt-5">
							<Card className="shadow-dark-sm">
								<Card.Body>{documentToReactComponents(bodyJSON, options)}</Card.Body>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</Layout>
	)
}

export default Course
