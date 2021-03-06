import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cardBodyTextOptions, defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { SubPage, CTA, PictureFixedWidth } from '../components/kletterlehrer'
import Styles from './touren.module.scss'

const baseURL = '/touren'

const PreviewCard = ({ node, customClass }) => {
	const classes = customClass || ''
	const src = node.image.fixed.src
	const srcSet = node.image.fixed.srcSet
	const srcSetWebp = node.image.fixed.srcSetWebp
	const altText = node.image.title
	return (
		<Card className={`detail-card content-card overflow-hidden shadow-dark-sm mt-20 mt-sm-7 ${classes}`}>
			<div className={`card-img-top`}>
				<PictureFixedWidth data={{ srcSetWebp, srcSet, src, altText, customClass: 'responsive-img' }} />
				<div className={Styles.cardImgTopDiv}>
					<div>
						<h2 className="h3 text-white mb-0">{node.headline}</h2>
					</div>
				</div>
			</div>
			<Card.Body className={Styles.cardBody}>
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

const Tours = props => {
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
							fixed(width: 450, quality: 75) {
								src
								srcSet
								srcSetWebp
							}
						}
						slug
						headline
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
			<Head title="Touren" props={props} />
			<SubPage data={{ classes: '' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.mobileContainer}>
					<Row className="d-md-none">
						<Col xs={12}>
							{tourData.map(({ node }, idx) => {
								const classes = idx === 0 ? Styles.firstCard : ''
								return <PreviewCard node={node} key={idx} customClass={classes} />
							})}
						</Col>
					</Row>
					<Row className="d-none d-md-flex">
						<Col xs={6}>
							{tourData.map(({ node }, idx) => {
								const classes = idx === 0 ? Styles.firstCard : ''
								return idx % 2 === 0 ? <PreviewCard node={node} key={idx} customClass={classes} /> : ''
							})}
						</Col>
						<Col xs={6} className="pt-8">
							{tourData.map(({ node }, idx) => {
								const classes = idx === 1 ? Styles.firstCard : ''
								return idx % 2 === 1 ? <PreviewCard node={node} key={idx} customClass={classes} /> : ''
							})}
						</Col>
					</Row>
				</Container>
			</SubPage>
		</Layout>
	)
}

export default Tours
