import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const options = {
	renderNode: {
		[BLOCKS.HEADING_2]: (node, children) => <h2 className="mb-2">{children}</h2>,
		[BLOCKS.HEADING_3]: (node, children) => <h3 className="mb-5">{children}</h3>,
		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-muted">{children}</p>,
		[INLINES.HYPERLINK]: (node, children) => {
			if (node.data.uri && node.data.uri.startsWith('/')) {
				return (
					<Link to={node.data.uri} className="font-size-sm font-weight-bold text-decoration-none text-dark">
						{children}
						<i className="fe fe-arrow-right ml-3"></i>
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
		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
		[BLOCKS.LIST_ITEM]: (node, children) => (
			<div className="d-flex list-item">
				<div className="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
					<i className="fe fe-check"></i>
				</div>
				<span className="mb-4">{children}</span>
			</div>
		),
	},
}

const Intro = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						introText {
							json
						}
					}
				}
			}
		}
	`)
	const introBodyJSON = data.allContentfulHome.edges[0].node.introText.json
	return (
		<section className="py-8 py-md-11 bg-white bg-light normalize-last-p">
			<Container>
				<Row>
					<Col xs={12} xx__lg={8}>
						{/* {documentToReactComponents(introBodyJSON, options)} */}
						<h2 className="mb-1">Dein Kletterlehrer</h2>
						<h3 className="mb-5 text-muted">Mit Sicherheit ein guter Seilpartner</h3>
						<Card className="shadow-dark-sm">
							<Card.Body>
								<p className="font-size-lg text-gray-800">Manche nehmen lieber den direkten Weg nach oben anstatt den Weg des geringsten Widerstands zu wählen. Klettern ist ein anspruchsvoller aber auch faszinierender und natürlicher Sport und schließlich liegt das Klettern in der Natur des Menschen. Alles Gründe, weshalb sich diese Trendsportart einer immer größeren Beliebtheit erfreut – egal ob in der Halle oder draußen am Fels.</p>
								<Link className="xbtn xbtn-success xbtn-sm font-weight-bold text-decoration-none text-success" to="/ueber-mich">
									Mehr erfahren<i className="fe fe-arrow-right ml-3"></i>
								</Link>
								
								{/* <Link className="btn btn-success btn-sm" to="/ueber-mich">
									Zum Profil
									
								</Link> */}
								{/* <Link className="xbtn xbtn-success xbtn-sm font-weight-bold text-decoration-none text-success" to="/ueber-mich">
									Zum Profil<i className="fe fe-arrow-right ml-3"></i>
								</Link> */}
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Intro
