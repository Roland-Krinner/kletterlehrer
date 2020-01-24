import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { introTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
// import { utils } from '../utils/'
import '../scss/__tour-overview.scss'

const baseURL = '/touren'

const PreviewCard = ({ node }) => {
	// const startDate = utils.formatDate(node.startDate)
	// const endDate = utils.formatDate(node.endDate)
	return (
		<Card className="detail-card content-card overflow-hidden shadow-dark-sm mt-20 mt-sm-7">
			<div className="card-img-top">
				<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
				<div>
					<div>
						{/* <p className="text-white h6 mb-0">
							<i className="fe fe-map-pin mr-1"></i> {node.location}
						</p> */}
						<h2 className="h3 text-white mb-0">{node.headline}</h2>
					</div>
				</div>
			</div>
			<Card.Body>
				<div className="d-flex align-items-start">
					<span className="badge badge-secondary rounded mb-3">Preis: {node.costs}</span>
				</div>
				<div className="normalize-last-p">
					{documentToReactComponents(node.introText.json, introTextOptions)}
					<Link className="btn btn-success btn-sm" to={`${baseURL}/${node.slug}`}>
						Details anzeigen
					</Link>
				</div>
			</Card.Body>
		</Card>
	)
}

const Tours = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulTourItem {
				edges {
					node {
						image {
							title
							file {
								url
							}
						}
						slug
						headline
						subline
						costs
						introText {
							json
						}
					}
				}
			}
		}
	`)

	const tourData = data.allContentfulTourItem.edges

	return (
		<Layout pageInfo={{ pageName: 'touren', pageType: 'subPage' }}>
			<Head title="Touren" />
			<section className="pt-5 pt-lg-8 pb-8 pb-sm-10 course-overview">
				<Container>
					<Row>
						<Col xs={12}>
							<h2 className="mb-1">Touren</h2>
							<h3 className="mb-0 text-muted">Alle Touren und Individualtouren im Überblick</h3>
							<Row>
								<Col xs={12} md={6}>
									{tourData.map(({ node }, idx, self) => {
										return idx % 2 === 0 ? <PreviewCard node={node} key={idx} /> : ''
									})}
								</Col>
								<Col xs={12} md={6} className="pt-8">
									{tourData.map(({ node }, idx, self) => {
										return idx % 2 === 1 ? <PreviewCard node={node} key={idx} /> : ''
									})}
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</section>
		</Layout>
	)
}

export default Tours
