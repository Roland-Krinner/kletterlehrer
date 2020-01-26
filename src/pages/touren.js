import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cardBodyTextOptions, defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { SubPage, CTA } from '../components/kletterlehrer'
import '../scss/__tour-overview.scss'

const baseURL = '/touren'

const PreviewCard = ({ node }) => {
	return (
		<Card className="detail-card content-card overflow-hidden shadow-dark-sm mt-20 mt-sm-7">
			<div className="card-img-top">
				<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
				<div>
					<div>
						<h2 className="h3 text-white mb-0">{node.headline}</h2>
					</div>
				</div>
			</div>
			<Card.Body>
				<div className="d-flex align-items-start">
					<span className="badge badge-secondary rounded mb-3">Preis: {node.costs}</span>
				</div>
				<div className="normalize-last-p">
					{documentToReactComponents(node.introText.json, cardBodyTextOptions)}
					<CTA data={{ to: `${baseURL}/${node.slug}`, classes: '' }}>Details anzeigen</CTA>
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
			allContentfulDynamicPages {
				edges {
					node {
						toursIntroText {
							json
						}
					}
				}
			}
		}
	`)

	const tourData = data.allContentfulTourItem.edges
	const introTextJSON = data.allContentfulDynamicPages.edges[0].node.toursIntroText.json

	return (
		<Layout pageInfo={{ pageName: 'touren', pageType: 'subPage' }}>
			<Head title="Touren" />
			<SubPage data={{ classes: 'tour-overview' }}>
				<Container>
					<Row>
						<Col xs={12}>
							{documentToReactComponents(introTextJSON, defaultTextOptions)}
							<Row className="d-md-none">
								<Col xs={12} className="cards-col">
									{tourData.map(({ node }, idx) => {
										return <PreviewCard node={node} key={idx} />
									})}
								</Col>
							</Row>
							<Row className="d-none d-md-flex">
								<Col xs={6} className="cards-col">
									{tourData.map(({ node }, idx) => {
										return idx % 2 === 0 ? <PreviewCard node={node} key={idx} /> : ''
									})}
								</Col>
								<Col xs={6} className="pt-8 cards-col">
									{tourData.map(({ node }, idx) => {
										return idx % 2 === 1 ? <PreviewCard node={node} key={idx} /> : ''
									})}
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}

export default Tours
