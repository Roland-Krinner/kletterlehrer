import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { defaultTextOptions } from './format-options'
import { Section } from './kletterlehrer'

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
		<Section data={{ classes: 'normalize-last-p' }}>
			<Container>
				<Row>
					<Col xs={12}>{documentToReactComponents(introBodyJSON, defaultTextOptions)}</Col>
				</Row>
			</Container>
		</Section>
	)
}

export default Intro
