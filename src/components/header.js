import React from 'react'
import { Link } from 'gatsby'
import { Navbar, Nav } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { SVG } from './kletterlehrer'
import '../scss/__header.scss'

const NavContent = ({ pageInfo }) => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulSiteMetadata {
				edges {
					node {
						brandLogo {
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
	const svg = data.allContentfulSiteMetadata.edges[0].node.brandLogo.svg
	const alt = data.allContentfulSiteMetadata.edges[0].node.brandLogo.title
	const file = data.allContentfulSiteMetadata.edges[0].node.brandLogo.file
	return (
		<>
			<Link to="/" className="brand">
				<SVG svg={svg} file={file} alt={alt} />
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
				<Navbar bg="black" expand="lg" variant="dark" collapseOnSelect className="transparent-navbar">
					<NavContent pageInfo={pageInfo} />
				</Navbar>
			) : (
				<Navbar bg="black" expand="lg" variant="dark" collapseOnSelect>
					<NavContent pageInfo={pageInfo} />
				</Navbar>
			)}
		</header>
	)
}

export default Header
