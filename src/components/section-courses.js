import React from 'react'
import { Container } from 'react-bootstrap'
// import Flickity from './flickity'
import { Link, useStaticQuery, graphql } from 'gatsby'

import '../scss/__courses.scss'

// const DummyCard = ({ customClass }) => {
// 	return (
// 		<div className={`card shadow-dark-sm ${customClass}`}>
// 			<a className="card-body" href="#!">
// 				<h3>Photos should appeal to a sense of adventure</h3>
// 				<p className="mb-0 text-muted">Cozy vibes are out and this summer you should focus on making customer's feel brave.</p>
// 			</a>
// 			<a className="card-meta" href="#!">
// 				<hr className="card-meta-divider" />
// 				<div className="avatar avatar-sm mr-2">
// 					<img src="http://placehold.it/50x50" alt="..." className="avatar-img rounded-circle" />
// 				</div>
// 				<h6 className="text-uppercase text-muted mr-2 mb-0">Danny Devito</h6>
// 				<p className="h6 text-uppercase text-muted mb-0 ml-auto">
// 					<time dateTime="2019-05-02">May 02</time>
// 				</p>
// 			</a>
// 		</div>
// 	)
// }

// const CardsArray = [1, 2, 3, 4, 5]

// const DummyCards = ({ customClass }) => {
// 	return CardsArray.map((item, idx) => {
// 		return <DummyCard customClass={customClass} key={idx} />
// 	})
// }

const CtaCard = ({ customClass }) => {
	return (
		<div className="card-cta rounded shadow-dark-sm">
			<Link to="/kurse" className={`font-weight-bold text-decoration-none ${customClass}`}>
				<span className="text-nowrap">Alle Kurse</span>
				<span className="text-nowrap">
					ansehen <i className="fe fe-arrow-right ml-0"></i>
				</span>
			</Link>
		</div>
	)
}

const DesktopCard = ({ customClass, node }) => {
	const startDate = node.startDate
	const location = node.location
	const duration = node.duration
	return (
		<div className={`card desktop-card shadow-dark-sm overflow-hidden ${customClass || ''}`}>
			<Link className="card-img-top" to={`/kurse/${node.slug}`}>
				<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
				<div>
					<p className="text-white h6 mb-0">
						<i className="fe fe-map-pin mr-1"></i>
						{location}
						<i className="fe fe-calendar ml-3 mr-1"></i> {startDate}
					</p>
					<h3 className="text-white mb-0">{node.headline}</h3>
				</div>
			</Link>
			<Link className="card-meta" to={`/kurse/${node.slug}`}>
				<h6 className="text-uppercase text-muted mr-2 mb-0">
					Mehr erfahren <i className="fe fe-arrow-right ml-1"></i>
				</h6>
				<h6 className="h6 text-uppercase text-muted mb-0 ml-auto">Dauer: {duration}</h6>
			</Link>
		</div>
	)
}

const MobileCard = ({ customClass, node }) => {
	const startDate = node.startDate
	const location = node.location
	const duration = node.duration
	return (
		<div className={`card mobile-card shadow-dark-sm overflow-hidden ${customClass || ''}`}>
			<Link className="card-img-top" to={`/kurse/${node.slug}`}>
				<img src={node.image.file.url} alt={node.image.title} className="img-fluid" />
			</Link>
			<Link className="card-body" to={`/kurse/${node.slug}`}>
				<h3 className="mb-0">{node.headline}</h3>
				<p className="text-muted h6 mb-0">
					<i className="fe fe-map-pin mr-1"></i>
					{location}
					<i className="fe fe-calendar ml-3 mr-1"></i> {startDate}
				</p>
				<h6 className="h6 text-muted mt-4 mb-0 ml-auto d-lg-none">Dauer: {duration}</h6>
			</Link>
			<Link className="card-meta" to={`/kurse/${node.slug}`}>
				<hr className="card-meta-divider" />
				<h6 className="text-uppercase text-muted mr-2 mb-0">
					Mehr erfahren <i className="fe fe-arrow-right ml-1"></i>
				</h6>
				<h6 className="h6 text-uppercase text-muted mb-0 ml-auto d-none d-lg-block">Dauer: {duration}</h6>
			</Link>
		</div>
	)
}

const Courses = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulCourseItem(sort: { fields: startDate, order: DESC }) {
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
						location
						duration
						author {
							name
							portrait {
								title
								file {
									url
								}
							}
						}
						startDate(formatString: "DD. MMM  YYYY")
						body {
							json
						}
					}
				}
			}
		}
	`)
	const courseData = data.allContentfulCourseItem.edges
	return (
		<section className="py-8 py-md-11 bg-light xxx__bg-gray-200">
			<Container>
				{/* <h6 className="text-uppercase text-muted font-weight-bold mb-2 mb-md-4">Kurse</h6> */}
				<h2>Aktuelle Kursangebote</h2>
				<Link to="/kurse" className="btn btn-success btn-sm xbtn-default mb-6 mb-xl-8">
					Alle Kurse ansehen<i className="fe fe-arrow-right ml-3"></i>
				</Link>
				<div className="desktop-posts d-none d-xl-flex">
					<div className="posts-col">
						<DesktopCard node={courseData[0].node} customClass="lift" />
						<DesktopCard node={courseData[1].node} customClass="card-small lift" />
					</div>
					<div className="posts-col">
						<DesktopCard node={courseData[2].node} customClass="lift" />
						<div className="card-container">
							<DesktopCard node={courseData[3].node} customClass="card-small lift" />
							<CtaCard customClass="btn btn-success text-white" />
						</div>
					</div>
				</div>
			</Container>
			<div className="scrollable-wrapper d-block d-xl-none">
				<div className="scrollable">
					<div className="scrollable-content">
						{courseData.map(({ node }, idx) => {
							return idx < 4 ? <MobileCard node={node} key={idx} /> : ''
						})}
						<CtaCard customClass="text-success" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Courses
