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
		<section className="hero-section">
			<Flickity options={{ wrapAround: true, pageDots: true, prevNextButtons: false, adaptiveHeight: true, autoPlay: 2500 }}>
				{heroSlides.map((slide, idx) => {
					// const fluidURL = slide.image.fluid.src
					
					const srcSet = slide.image.fluid.srcSet
					const sizes = slide.image.fluid.sizes
					const alt = slide.image.title
					const imageURL = slide.image.file.url
					
					const headline = slide.headline
					const subline = slide.subline
					const excerpt = slide.excerpt.excerpt


					return (
						<div className="hero-slide" key={idx}>
							{/* <img src={fluidURL} style={{ width: '100%' }} key={idx} alt={alt} /> */}
							<img srcset={srcSet} sizes={sizes} src={`${imageURL}?w=800`} alt={alt}/>
							<div className="hero-slide-content">
								<div className="hero-slide-gradient"></div>
								<Container className="hero-slide-container">
									<div className="hero-slide-text-box">
										<div className="d-none d-sm-block d-lg-none">
											<h2 className="h5 text-white mb-0">{headline}</h2>
											<p className="h6 text-white">{subline}</p>
										</div>
										<div className="d-none d-lg-block d-xl-none">
											<h2 className="text-white mb-0">{headline}</h2>
											<p className="font-size-lg text-white mb-0">{subline}</p>
										</div>
										<div className="d-none d-xl-block">
											<h2 className="text-white mb-0">{headline}</h2>
											<p className="font-size-lg text-white mb-5">{subline}</p>
											<p className="text-white mb-0">{excerpt}</p>
										</div>
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
