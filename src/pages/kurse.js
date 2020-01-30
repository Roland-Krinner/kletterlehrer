import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { cardBodyTextOptions, defaultTextOptions } from '../components/format-options'
import Layout from '../components/layout'
import Head from '../components/head'
import { utils } from '../utils/'
import { SubPage, CTA } from '../components/kletterlehrer'
import Styles from './kurse.module.scss'

const baseURL = '/kurse'

const PreviewCard = ({ node, customClass }) => {
	const classes = customClass || ''
	const startDate = utils.formatDate(node.startDate)
	const endDate = utils.formatDate(node.endDate)
	return (
		<Card className={`detail-card content-card overflow-hidden shadow-dark-sm mt-20 mt-sm-7 ${classes}`}>
			<div className="card-img-top">
				<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
				<div className={Styles.cardImgTopDiv}>
					<div>
						<p className="text-white h6 mb-0">
							<i className="fe fe-map-pin mr-1"></i> {node.location}
						</p>
						<h2 className="h3 text-white mb-0">{node.headline}</h2>
					</div>
				</div>
			</div>
			<Card.Body className={Styles.cardBody}>
				<div className="d-flex flex-column-reverse justify-content-start align-items-start flex-sm-row flex-md-column-reverse flex-lg-row">
					<p className="h5 font-weight-bold">
						{startDate} bis {endDate}
					</p>
					<span className="badge badge-secondary rounded mr-auto mr-sm-0 ml-sm-auto mr-md-auto ml-md-0 mr-lg-0 ml-lg-auto mb-3">Preis: {node.costs}</span>
				</div>
				<div className="normalize-last-p">
					{documentToReactComponents(node.introText.json, cardBodyTextOptions)}
					<CTA data={{ to: `${baseURL}/${node.slug}`, classes: '' }}>Details anzeigen</CTA>
				</div>
			</Card.Body>
		</Card>
	)
}

const Courses = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulCourseItem(sort: { fields: startDate, order: ASC }) {
				edges {
					node {
						image {
							title
							file {
								url
							}
						}
						headline
						slug
						location
						duration
						costs
						startDate(formatString: "DD. MMM YYYY")
						endDate(formatString: "DD. MMM YYYY")
						introText {
							json
						}
					}
				}
			}
			allContentfulDynamicPages {
				edges {
					node {
						coursesIntroText {
							json
						}
					}
				}
			}
		}
	`)
	const courseData = data.allContentfulCourseItem.edges
	const introTextJSON = data.allContentfulDynamicPages.edges[0].node.coursesIntroText.json
	return (
		<Layout pageInfo={{ pageName: 'kurse', pageType: 'subPage' }}>
			<Head title="Kurse" />
			<SubPage data={{ classes: '' }}>
				<Container>{documentToReactComponents(introTextJSON, defaultTextOptions)}</Container>
				<Container className={Styles.mobileContainer}>
					<Row className="d-md-none">
						<Col xs={12}>
							{courseData.map(({ node }, idx) => {
								const classes = idx === 0 ? Styles.firstCard : ''
								return <PreviewCard node={node} key={idx} customClass={classes} />
							})}
						</Col>
					</Row>
					<Row className="d-none d-md-flex">
						<Col xs={6}>
							{courseData.map(({ node }, idx) => {
								const classes = idx === 0 ? Styles.firstCard : ''
								return idx % 2 === 0 ? <PreviewCard node={node} key={idx} customClass={classes} /> : ''
							})}
						</Col>
						<Col xs={6} className="pt-8">
							{courseData.map(({ node }, idx) => {
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

export default Courses
