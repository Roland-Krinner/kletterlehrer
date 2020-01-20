import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Flickity from './flickity'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../scss/__tours.scss'

const Tours = () => {
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
		<section className="py-8 py-md-11 bg-dark course-slider">
			<Container>
				<Row>
					<Col>
						{/* <h6 className="text-uppercase text-muted font-weight-bold mb-2 mb-md-4">Touren</h6> */}
						<h2 className="text-white">Aktuelle Tourangebote</h2>
						<Link to="/touren" className="btn btn-success btn-sm xbtn-default mb-6 mb-xl-8">
							Alle Touren ansehen<i className="fe fe-arrow-right ml-3"></i>
						</Link>
						{/* <hr className="mb-6 mb-md-8 mt-0 border-gray-800" /> */}
						<Flickity options={{ cellAlign: 'left', wrapAround: true, pageDots: false, freeScroll: true }}>
							{courseData.map(({ node }, idx) => {
								const featureImg = node.image.file.url
								const featureAlt = node.image.title
								const headline = node.headline
								const subline = node.subline
								const startDate = node.startDate
								const location = node.location
								const duration = node.duration
								const authorName = node.author.name
								const authorImg = node.author.portrait.file.url
								const authorAlt = node.author.portrait.title
								const url = `/kurse/${node.slug}`
								return (
									<div className="xxcol-12 xxcol-xl-3 xxd-flex xxw-50 slider-item" key={idx}>
										<Card className="mb-6 mb-xl-0 shadow-light-lg">
											<Link className="card-img-top" to={url}>
												<img src={featureImg} alt={featureAlt} className="img-fluid" />
											</Link>
											<Link className="card-body" to={url}>
												<h3>{headline}</h3>
												<p className="mb-6 text-muted">{subline}</p>
												<p className="mb-0 text-gray-700 font-size-sm">Location: {location}</p>
												<p className="mb-0 text-gray-700 font-size-sm">Begin: {startDate}</p>
												<p className="mb-0 text-gray-700 font-size-sm">Dauer: {duration}</p>
											</Link>
											<Link className="card-meta" to={url}>
												<hr className="card-meta-divider" />
												<div className="avatar avatar-sm mr-2">
													<img src={authorImg} alt={authorAlt} className="avatar-img rounded-circle" />
												</div>
												<h6 className="text-uppercase text-muted mr-2 mb-0">{authorName}</h6>
												<h6 className="text-uppercase text-muted mr-2 mb-0">{authorName}</h6>
											</Link>
										</Card>
									</div>
								)
							})}
						</Flickity>
					</Col>
				</Row>
				{/* <hr className="mt-6 mt-md-8 border-gray-800" />
				<Link to="/kurse" className="text-uppercase font-size-sm font-weight-bold text-decoration-none text-muted">
					Alle Kursangebote<i className="fe fe-arrow-right ml-3"></i>
				</Link>
				<Link to="/kurse" className="btn btn-success btn-sm xbtn-default mb-6 mb-xl-8">
					Alle Kurse ansehen<i className="fe fe-arrow-right ml-3"></i>
				</Link> */}
			</Container>
			{/* <Container fluid>
					<div className="scrollable-wrapper">
						<div className="scrollable">
							{courseData.map(({ node }, idx) => {
								const featureImg = node.image.file.url
								const featureAlt = node.image.title
								const headline = node.headline
								const subline = node.subline
								const startDate = node.startDate
								const location = node.location
								const duration = node.duration
								const authorName = node.author.name
								const authorImg = node.author.portrait.file.url
								const authorAlt = node.author.portrait.title
								const url = `/kurse/${node.slug}`
								return (
									<Card className="card mb-6 mb-xl-0 pt-4 overlay overlay-black overlay-30 bg-cover shadow-light-lg" style={{ backgroundImage: `url(${featureImg})` }}>
										<Link className="card-body mt-auto" to={url}>
											<h3 className="text-white">{headline}</h3>
											<p className="mb-6 text-white">{subline}</p>
											<p className="mb-0 text-white font-size-sm">Location: {location}</p>
											<p className="mb-0 text-white font-size-sm">Begin: {startDate}</p>
											<p className="mb-0 text-white font-size-sm">Dauer: {duration}</p>
										</Link>
										<Link className="card-meta" to={url}>
											<hr className="card-meta-divider border-white-20" />
											<div className="avatar avatar-sm mr-2">
												<img src={authorImg} alt={authorAlt} className="avatar-img rounded-circle" />
											</div>
											<h6 className="text-uppercase text-white-80 mr-2 mb-0">{authorName}</h6>
										</Link>
									</Card>
								)
							})}
						</div>
					</div>
				</Container> 
			</section>*/}
		</section>
	)
}

export default Tours
