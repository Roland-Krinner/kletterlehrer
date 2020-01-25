import React from 'react'
import { Container } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import Flickity from './flickity'
import '../scss/__hero.scss'

const Hero = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHome {
				edges {
					node {
						heroSlides {
							headline
							subline
							excerpt {
								excerpt
							}
							image {
								title
								file {
									url
									contentType
								}
								fluid(maxWidth: 1600, quality: 100) {
									src
									srcWebp
									sizes
									srcSet
									srcSetWebp
								}
							}
						}
					}
				}
			}
		}
	`)
	const heroSlides = data.allContentfulHome.edges[0].node.heroSlides

	return (
		<section className="hero-section bg-light">
			<Flickity options={{ wrapAround: true, pageDots: true, prevNextButtons: false, adaptiveHeight: true, autoPlay: 2500 }}>
				{heroSlides.map((slide, idx) => {
					//const url = slide.image.file.url
					const alt = slide.image.title
					const fluidURL = slide.image.fluid.src
					const headline = slide.headline
					const subline = slide.subline
					const excerpt = slide.excerpt.excerpt

					return (
						<div className="hero-slide" key={idx}>
							<img src={fluidURL} style={{ width: '100%' }} kry={idx} alt={alt} />
							<div className="hero-slide-content">
								<div className="hero-slide-gradient"></div>
								<Container className="hero-slide-container">
									<div className="hero-slide-text-box d-none d-sm-block d-lg-none">
										<h1 className="h5 text-white mb-0">{headline}</h1>
										<h3 className="h6 text-white">{subline}</h3>
									</div>
									<div className="hero-slide-text-box d-none d-lg-block d-xl-none">
										<h1 className="h2 text-white mb-0">{headline}</h1>
										<h3 className="h4 text-white mb-0">{subline}</h3>
									</div>
									<div className="hero-slide-text-box d-none d-xl-block">
										<h1 className="h2 text-white">{headline}</h1>
										<h3 className="text-white">{subline}</h3>
										<p className="text-white mb-0">{excerpt}</p>
									</div>
								</Container>
							</div>
						</div>
					)
				})}
			</Flickity>
		</section>
	)
}

export default Hero
