import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { SVG } from './kletterlehrer'
import Styles from './footer.module.scss'

const Footer = ({ pageInfo: { pageType } }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSiteMetadata {
				edges {
					node {
						brandIcon {
							title
							svg {
								content
							}
							file {
								url
								fileName
								contentType
							}
						}
					}
				}
			}
			allContentfulPersonalData {
				edges {
					node {
						name
						jobRole
						eMail
						city
						street
						country
						phone
						phonePlain
						websiteName
						websiteUrl
						socialLinks {
							name
							url
						}
					}
				}
			}
		}
	`)
	const svg = data.allContentfulSiteMetadata.edges[0].node.brandIcon.svg
	const alt = data.allContentfulSiteMetadata.edges[0].node.brandIcon.title
	const file = data.allContentfulSiteMetadata.edges[0].node.brandIcon.file

	const name = data.allContentfulPersonalData.edges[0].node.name
	const eMail = data.allContentfulPersonalData.edges[0].node.eMail
	const city = data.allContentfulPersonalData.edges[0].node.city
	const street = data.allContentfulPersonalData.edges[0].node.street
	const phone = data.allContentfulPersonalData.edges[0].node.phone
	const phonePlain = data.allContentfulPersonalData.edges[0].node.phonePlain
	const websiteName = data.allContentfulPersonalData.edges[0].node.websiteName
	const websiteUrl = data.allContentfulPersonalData.edges[0].node.websiteUrl
	const socialLinks = data.allContentfulPersonalData.edges[0].node.socialLinks

	const headline = 'font-weight-bold text-uppercase text-white mt-6'
	const listItem = 'text-white-70'
	const listItemWrapper = 'text-white-70 my-0'

	const homePageClassesFooter = pageType === 'homePage' ? 'mt-n12 mt-md-n15' : ''
	const homePageClassesContainer = pageType === 'homePage' ? 'pt-12 pt-md-14 pt-lg-15' : ''

	return (
		<footer className={`bg-black position-relative ${homePageClassesFooter}`}>
			<Container className={`py-8 py-md-12 ${homePageClassesContainer}`}>
				<Row noGutters>
					<Col xs={12} md={6} lg={12} xl={3}>
						<div>
							<div className={Styles.svgWrapper}>
								<SVG svg={svg} file={file} alt={alt} />
							</div>
							{socialLinks.map((socialLink, idx) => {
								return (
									<div className={`${listItemWrapper}`}>
										<a href={socialLink.url} target="_blank" rel="noopener noreferrer" className={`${listItem}`} key={idx}>
											{socialLink.name}
										</a>
									</div>
								)
							})}
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<h6 className={`${headline}`}>Inhalt</h6>
							<div className={`${listItemWrapper}`}>
								<Link to="/" className={`${listItem}`}>
									Startseite
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/kurse" className={`${listItem}`}>
									Kurse
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/touren" className={`${listItem}`}>
									Touren
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/profil" className={`${listItem}`}>
									Profil
								</Link>
							</div>
							<div className={`${listItemWrapper}`}>
								<Link to="/kontakt" className={`${listItem}`}>
									Kontakt
								</Link>
							</div>
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<h6 className={`${headline}`}>Adresse</h6>
							<p className={`${listItemWrapper}`}>
								{name}
								<br />
								{street}
								<br />
								{city}
							</p>
						</div>
					</Col>
					<Col xs={12} md={6} lg={4} xl={3}>
						<div>
							<h6 className={`${headline}`}>Kontakt</h6>
							<p className={`${listItemWrapper}`}>
								<i className="fe fe-smartphone mr-2"></i>
								<a href={`tel:${phonePlain}`} className={`${listItem}`}>
									{phone}
								</a>
								<br />
								<i className="fe fe-mail mr-2"></i>
								<a href={`mailto:${eMail}`} className={`${listItem}`}>
									{eMail}
								</a>
								<br />
								<i className="fe fe-globe mr-2"></i>
								<a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={`${listItem}`}>
									{websiteName}
								</a>
							</p>
						</div>
					</Col>
				</Row>
			</Container>
			<Container fluid className="py-5 bg-black-dark-900">
				<Row>
					<Col xs={12} className="d-sm-flex flex-row-reverse">
						<p className="text-white-70 mb-0 text-center text-sm-left">
							<Link to="/impressum" className="text-reset pr-3">
								Impressum
							</Link>
							<Link to="/datenschutz" className="text-reset ml-3 pr-3">
								Datenschutz
							</Link>
							{/* <Link to="/datenschutz" className="text-reset ml-3">
								Credits
							</Link> */}
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	)
}

export default Footer
