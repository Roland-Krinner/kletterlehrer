import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Section, PictureFixedWidth } from './kletterlehrer'
import { defaultTextOptions } from './format-options'
import { utils } from '../utils/'
import '../scss/__section-courses.scss'

const baseURL = '/kurse'

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

const DesktopCard = ({ customClass, node }) => {
	const startDate = utils.formatDate(node.startDate)
	const src = node.image.fixed.src
	const srcSet = node.image.fixed.srcSet
	const srcSetWebp = node.image.fixed.srcSetWebp
	const altText = node.image.title
	return (
		<Card className={`desktop-card shadow-dark-sm overflow-hidden ${customClass || ''}`}>
			<Link className="card-img-top" to={`${baseURL}/${node.slug}`}>
				<PictureFixedWidth data={{ srcSetWebp, srcSet, src, altText, customClass: 'responsive-img' }} />
				<div>
					<p className="text-white h6 mb-0">
						<i className="fe fe-map-pin mr-1"></i>
						{node.location}
						<i className="fe fe-calendar ml-3 mr-1"></i> {startDate}
					</p>
					<h3 className="text-white mb-0">{node.headline}</h3>
				</div>
			</Link>
			<Link className="card-meta" to={`${baseURL}/${node.slug}`}>
				<h6 className="text-uppercase text-muted mr-2 mb-0">
					Mehr erfahren <i className="fe fe-arrow-right ml-1"></i>
				</h6>
				<h6 className="h6 text-uppercase text-muted mb-0 ml-auto">Dauer: {node.duration}</h6>
			</Link>
		</Card>
	)
}

const MobileCard = ({ customClass, node }) => {
	const startDate = utils.formatDate(node.startDate)
	const src = node.image.fixed.src
	const srcSet = node.image.fixed.srcSet
	const srcSetWebp = node.image.fixed.srcSetWebp
	const altText = node.image.title
	return (
		<div className={`card mobile-card shadow-dark-sm overflow-hidden ${customClass || ''}`}>
			<Link className="card-img-top" to={`${baseURL}/${node.slug}`}>
				<PictureFixedWidth data={{ srcSetWebp, srcSet, src, altText, customClass: 'responsive-img' }} />
			</Link>
			<Link className="card-body" to={`${baseURL}/${node.slug}`}>
				<h3 className="mb-0">{node.headline}</h3>
				<p className="text-muted h6 mb-0">
					<i className="fe fe-map-pin mr-1"></i>
					{node.location}
					<i className="fe fe-calendar ml-3 mr-1"></i> {startDate}
				</p>
				<h6 className="h6 text-muted mt-4 mb-0 ml-auto d-lg-none">Dauer: {node.duration}</h6>
			</Link>
			<Link className="card-meta" to={`${baseURL}/${node.slug}`}>
				<hr className="card-meta-divider" />
				<h6 className="text-uppercase text-muted mr-2 mb-0">
					Mehr erfahren <i className="fe fe-arrow-right ml-1"></i>
				</h6>
				<h6 className="h6 text-uppercase text-muted mb-0 ml-auto d-none d-lg-block">Dauer: {node.duration}</h6>
			</Link>
		</div>
	)
}

const OneCard = ({ data: { courseData, ctaJSON } }) => {
	return (
		<div className="desktop-posts one-post d-none d-xl-flex">
			<div className="posts-col">
				<DesktopCard node={courseData[0].node} customClass="lift" />
			</div>
		</div>
	)
}

const TwoCards = ({ data: { courseData, ctaJSON } }) => {
	return (
		<div className="desktop-posts d-none d-xl-flex">
			<div className="posts-col">
				<DesktopCard node={courseData[0].node} customClass="lift" />
			</div>
			<div className="posts-col">
				<DesktopCard node={courseData[1].node} customClass="lift" />
			</div>
		</div>
	)
}

const ThreeCards = ({ data: { courseData, ctaJSON } }) => {
	return (
		<div className="desktop-posts three-posts d-none d-xl-flex">
			<div className="posts-col">
				<DesktopCard node={courseData[0].node} customClass="lift" />
				<DesktopCard node={courseData[1].node} customClass="card-small lift" />
			</div>
			<div className="posts-col">
				<DesktopCard node={courseData[2].node} customClass="lift" />
				<div className="card-container">
					<CtaCard customClass="btn btn-success text-white" ctaJSON={ctaJSON} />
				</div>
			</div>
		</div>
	)
}

const MultipleCards = ({ data: { courseData, ctaJSON } }) => {
	return (
		<div className="desktop-posts d-none d-xl-flex">
			<div className="posts-col">
				<DesktopCard node={courseData[0].node} customClass="lift" />
				<DesktopCard node={courseData[1].node} customClass="card-small lift" />
			</div>
			<div className="posts-col">
				<DesktopCard node={courseData[2].node} customClass="lift" />
				<div className="card-container">
					<DesktopCard node={courseData[3].node} customClass="card-small lift" />
					<CtaCard customClass="btn btn-success text-white" ctaJSON={ctaJSON} />
				</div>
			</div>
		</div>
	)
}

const Courses = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						coursesText {
							json
						}
						coursesMobileButton {
							text
							url
						}
					}
				}
			}
			allContentfulCourseItem(sort: { fields: startDate, order: ASC }) {
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
						headline
						slug
						location
						duration
						startDate(formatString: "DD. MMM YYYY")
						body {
							json
						}
					}
				}
			}
		}
	`)
	const courseData = data.allContentfulCourseItem.edges
	const bodyJSON = data.allContentfulHome.edges[0].node.coursesText.json
	const ctaJSON = data.allContentfulHome.edges[0].node.coursesMobileButton
	return (
		<Section data={{ classes: '' }}>
			<Container>
				<div className="mb-6 mb-xl-8 normalize-last-p">{documentToReactComponents(bodyJSON, defaultTextOptions)}</div>
				{courseData.length === 1 ? <OneCard data={{ courseData, ctaJSON }} /> : ''}
				{courseData.length === 2 ? <TwoCards data={{ courseData, ctaJSON }} /> : ''}
				{courseData.length === 3 ? <ThreeCards data={{ courseData, ctaJSON }} /> : ''}
				{courseData.length > 3 ? <MultipleCards data={{ courseData, ctaJSON }} /> : ''}
			</Container>
			<div className="scrollable-wrapper d-block d-xl-none">
				<div className="scrollable">
					<div className="scrollable-content">
						{courseData.map(({ node }, idx) => {
							return idx < 4 ? <MobileCard node={node} key={idx} /> : ''
						})}
						<CtaCard customClass="text-success" ctaJSON={ctaJSON} />
					</div>
				</div>
			</div>
		</Section>
	)
}

export default Courses
