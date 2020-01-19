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

const Post = ({ customClass, node }) => {
	return (
		<div className={`card shadow-dark-sm ${customClass || ''}`}>
			<Link className="card-body" to={`/kurse/${node.slug}`}>
				<h3>{node.headline}</h3>
				<p className="mb-0 text-muted">{node.subline}</p>
			</Link>
			<Link className="card-meta" to={`/kurse/${node.slug}`}>
				<hr className="card-meta-divider" />
				<div className="avatar avatar-sm mr-2">
					<img src={node.author.portrait.file.url} alt={node.author.portrait.title} className="avatar-img rounded-circle" />
				</div>
				<h6 className="text-uppercase text-muted mr-2 mb-0">{node.author.name}</h6>
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
		<section className="py-8 py-md-11 bg-gradient-light">
			<Container>
				{/* <h6 className="text-uppercase text-muted font-weight-bold mb-2 mb-md-4">Kurse</h6> */}
				<h2>Aktuelle Kursangebote</h2>
				<Link to="/kurse" className="btn btn-success btn-sm xbtn-default mb-6 mb-xl-8">
					Alle Kurse ansehen<i className="fe fe-arrow-right ml-3"></i>
				</Link>
				<div className="posts-wrapper d-none d-xl-flex">
					<div className="posts-col">
						<Post node={courseData[0].node} customClass="lift" />
						<Post node={courseData[1].node} customClass="card-small lift" />
					</div>
					<div className="posts-col">
						<Post node={courseData[2].node} customClass="lift" />
						<div className="card-container">
							<Post node={courseData[3].node} customClass="card-small lift" />
							<CtaCard customClass="btn btn-success text-white" />
						</div>
					</div>
				</div>
			</Container>
			<div className="scrollable-wrapper d-block d-xl-none">
				<div className="scrollable">
					<div className="scrollable-content">
						{courseData.map(({ node }, idx) => {
							return idx < 4 ? <Post node={node} key={idx} /> : ''
						})}
						<CtaCard customClass="text-success" />
					</div>
				</div>
			</div>
		</section>
	)
}

export default Courses
