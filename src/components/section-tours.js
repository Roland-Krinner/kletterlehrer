import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Flickity from './flickity'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import '../scss/__section-tours.scss'

const baseURL = '/touren'

const options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="text-white">{children}</h2>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-muted">{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					<Link to={node.data.uri} className="btn btn-success btn-sm xbtn-default mb-6 mb-xl-8">
						{children}
						{/* <i className="fe fe-arrow-right ml-3"></i> */}
					</Link>
				)
			} else {
				return (
					<a href={node.data.uri} target="_blank" rel="noopener noreferrer">
						{children}
					</a>
				)
			}
		},
	},
}

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
		<div className="slider-item">
			<Card className="mb-6 mb-xl-0 bg-dark overflow-hidden">
				<Link className="card-img-top" to={url}>
					<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
				</Link>
				<Link className="card-body bg-white" to={url}>
					<h3>{node.headline}</h3>
					<p className="mb-6 text-muted">{node.subline}</p>
				</Link>
				<Link className="card-meta bg-white" to={url}>
					<hr className="card-meta-divider" />
					<h6 className="text-uppercase text-muted mr-2 mb-0">
						Mehr erfahren <i className="fe fe-arrow-right ml-1"></i>
					</h6>
				</Link>
			</Card>
		</div>
	)
}

const MobileCard = ({ customClass, node }) => {
	return (
		<div className={`card mobile-card bg-dark overflow-hidden ${customClass || ''}`}>
			<Link className="card-img-top" to={`${baseURL}/${node.slug}`}>
				<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
			</Link>
			<Link className="card-body bg-white" to={`${baseURL}/${node.slug}`}>
				<h3 className="mb-2">{node.headline}</h3>
				<p className="mb-0 text-muted">{node.subline}</p>
			</Link>
			<Link className="card-meta bg-white" to={`${baseURL}/${node.slug}`}>
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
						subline
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
		<section className="py-8 py-md-11 bg-dark tours-slider">
			<Container>
				<Row>
					<Col>
						<div className="normalize-last-p">{documentToReactComponents(bodyJSON, options)}</div>
						<div className="d-none d-xl-block">
							<Flickity options={{ cellAlign: 'left', wrapAround: true, pageDots: false, freeScroll: true }}>
								{tourData.map(({ node }, idx) => {
									return <DesktopCard node={node} key={idx} />
								})}
							</Flickity>
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
		</section>
	)
}

export default Tours
