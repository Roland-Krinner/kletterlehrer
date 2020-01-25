import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { introTextOptions } from './format-options'

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
					<Col xs={12} xx__xl={8}>
						{documentToReactComponents(introBodyJSON, introTextOptions)}
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default Intro
