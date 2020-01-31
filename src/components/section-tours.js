import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section } from './kletterlehrer'
import { defaultTextOptions } from './format-options'

const baseURL = '/touren'

const CtaCard = ({ customClass, ctaJSON }) => {
	return (
		<div className="card-cta rounded shadow-dark-sm">
			<Link to={ctaJSON.url} className={`font-weight-bold text-decoration-none ${customClass}`}>
				<span className="text-nowrap">{ctaJSON.text[0]}</span>
				<span className="text-nowrap">
					{ctaJSON.text[1]} <i className="fe fe-arrow-right ml-0"></i>
				</span>
			</Link>
		</div>
	)
}

const DesktopCard = ({ node }) => {
	const url = `${baseURL}/${node.slug}`
	return (
		<Col xs={4}>
			<Card className="overflow-hidden shadow-dark-sm lift">
				<Link className="card-img-top" to={url}>
					<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
				</Link>
				<Link className="card-body" to={url}>
					<h3>{node.headline}</h3>
					<p className="mb-6 text-muted">{node.excerpt}</p>
				</Link>
				<Link className="card-meta" to={url}>
					<hr className="card-meta-divider" />
					<h6 className="text-uppercase text-muted mr-2 mb-0">
						Mehr erfahren <i className="fe fe-arrow-right ml-1"></i>
					</h6>
				</Link>
			</Card>
		</Col>
	)
}

const MobileCard = ({ customClass, node }) => {
	return (
		<div className={`card mobile-card overflow-hidden ${customClass || ''}`}>
			<Link className="card-img-top" to={`${baseURL}/${node.slug}`}>
				<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
			</Link>
			<Link className="card-body" to={`${baseURL}/${node.slug}`}>
				<h3 className="mb-2">{node.headline}</h3>
				<p className="mb-0 text-muted">{node.excerpt}</p>
			</Link>
			<Link className="card-meta" to={`${baseURL}/${node.slug}`}>
				<hr className="card-meta-divider" />
				<h6 className="text-uppercase text-muted mr-2 mb-0">
					Mehr erfahren <i className="fe fe-arrow-right ml-1"></i>
				</h6>
			</Link>
		</div>
	)
}

const Tours = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						toursText {
							json
						}
						toursMobileButton {
							text
							url
						}
					}
				}
			}
			allContentfulTourItem(sort: { fields: headline, order: DESC }) {
				edges {
					node {
						image {
							title
							file {
								url
							}
						}
						headline
						excerpt
						slug
						body {
							json
						}
					}
				}
			}
		}
	`)
	const tourData = data.allContentfulTourItem.edges
	const bodyJSON = data.allContentfulHome.edges[0].node.toursText.json
	const ctaJSON = data.allContentfulHome.edges[0].node.toursMobileButton
	return (
		<Section data={{ classes: 'bg-dark-light-700' }}>
			<Container>
				<Row>
					<Col>
						<div className="mb-6 mb-xl-8 normalize-last-p">{documentToReactComponents(bodyJSON, defaultTextOptions)}</div>
						<div className="d-none d-xl-block">
							<Row>
								{tourData.map(({ node }, idx) => {
									if (idx < 3) {
										return <DesktopCard node={node} key={idx} />
									} else {
										return ''
									}
								})}
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
			<div className="scrollable-wrapper d-block d-xl-none">
				<div className="scrollable">
					<div className="scrollable-content">
						{tourData.map(({ node }, idx) => {
							return idx < 4 ? <MobileCard node={node} key={idx} /> : ''
						})}
						<CtaCard customClass="text-success" ctaJSON={ctaJSON} />
					</div>
				</div>
			</div>
		</Section>
	)
}

export default Tours
