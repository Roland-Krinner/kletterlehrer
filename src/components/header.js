import React from 'react'
import { Link } from 'gatsby'
import { Navbar, Nav } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import '../scss/__header.scss'

const Image = ({ svg, file, alt }) => {
	if (file.contentType === 'image/svg+xml') {
		if (svg && svg.content) {
			return <div dangerouslySetInnerHTML={{ __html: svg.content }} />
		}
		return <img src={file.url} alt={alt} />
	}
	// Dummy
	return <img src="" alt={alt} />
}

const NavContent = ({ pageInfo }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSiteMetadata {
				edges {
					node {
						brandLogoHorizontal {
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
		}
	`)
	const svg = data.allContentfulSiteMetadata.edges[0].node.brandLogoHorizontal.svg
	const alt = data.allContentfulSiteMetadata.edges[0].node.brandLogoHorizontal.title
	const file = data.allContentfulSiteMetadata.edges[0].node.brandLogoHorizontal.file
	return (
		<>
			<Link to="/" className="brand">
				<Image svg={svg} file={file} alt={alt} />
			</Link>
			<Navbar.Toggle />
			<Navbar.Collapse>
				<Navbar.Toggle>
					<i className="fe fe-x"></i>
				</Navbar.Toggle>
				<Nav className="ml-auto" activeKey={pageInfo && pageInfo.pageName}>
					<Nav.Item className="d-block d-lg-none ">
						<Link to="/">
							<Nav.Link as="span" eventKey="startseite">
								<span>Startseite</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/kurse">
							<Nav.Link as="span" eventKey="kurse">
								<span>Kurse</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/touren">
							<Nav.Link as="span" eventKey="touren">
								<span>Touren</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/profil">
							<Nav.Link as="span" eventKey="profil">
								<span>Profil</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
					<Nav.Item>
						<Link to="/kontakt">
							<Nav.Link as="span" eventKey="kontakt">
								<span>Kontakt</span>
							</Nav.Link>
						</Link>
					</Nav.Item>
				</Nav>
			</Navbar.Collapse>
		</>
	)
}

const Header = ({ pageInfo }) => {
	return (
		<header>
			{pageInfo.pageType && pageInfo.pageType === 'homePage' ? (
				<Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect className="transparent-navbar">
					<NavContent pageInfo={pageInfo} />
				</Navbar>
			) : (
				<Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
					<NavContent pageInfo={pageInfo} />
				</Navbar>
			)}
		</header>
	)
}

export default Header
