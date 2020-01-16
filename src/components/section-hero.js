import React from 'react'
import { Container } from 'react-bootstrap'
import { useStaticQuery, graphql } from 'gatsby'
import Flickity from './flickity'
import heroStyles from './section-hero.module.scss'

// import { BLOCKS } from '@contentful/rich-text-types'
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

// const options = {
// 	renderNode: {
// 		[BLOCKS.PARAGRAPH]: (node, children) => <p className="font-size-lg text-muted">{children}</p>,
// 		[BLOCKS.UL_LIST]: (node, children) => <div className="pb-5">{children}</div>,
// 		[BLOCKS.LIST_ITEM]: (node, children) => (
// 			<div className="d-flex list-item">
// 				<div className="badge badge-rounded-circle badge-success-soft mt-1 mr-4">
// 					<i className="fe fe-check"></i>
// 				</div>
// 				<span className="mb-4">{children}</span>
// 			</div>
// 		),
// 	},
// }

const Hero = () => {
	const data = useStaticQuery(graphql`
		query {
			allContentfulHero {
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
	const heroSlides = data.allContentfulHero.edges[0].node.heroSlides

	return (
		<section className={heroStyles.section}>
			<Flickity options={{ wrapAround: true, pageDots: true, prevNextButtons: false, adaptiveHeight: true, autoPlay: 12500 }}>
				{heroSlides.map((slide, idx) => {
					//const url = slide.image.file.url
					const alt = slide.image.title
					const fluidURL = slide.image.fluid.src
					const headline = slide.headline
					const subline = slide.subline
					const excerpt = slide.excerpt.excerpt

					return (
						<div className={heroStyles.slide}>
							<img src={fluidURL} style={{ width: '100%' }} kry={idx} alt={alt} />
							<div className={heroStyles.content}>
								<div className={heroStyles.gradient}></div>
								<Container xfluid className={heroStyles.container}>
									<div className={heroStyles.textBox}>
										<h1 className="text-white">{headline}</h1>
										<h3 className="text-white">{subline}</h3>
										<p className="text-white">{excerpt}</p>
									</div>
								</Container>
							</div>
						</div>
					)
				})}
			</Flickity>
			{/* <div className="container">
				<div className="row align-items-center">
					<div className="col-12 col-md-8 col-lg-6">
						<h1 className="display-3 font-weight-bold text-white">
							Remote positions for <br />
							<span className="text-warning">Ruby Develop</span>
						</h1>
						<p className="font-size-lg text-white-80 mb-6">We help place the world's top tech talent at the some of the greatest companies in the world.</p>
					</div>
				</div>
			</div> */}
			{/* <div id="jarallax-container-0" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; overflow: hidden; pointer-events: none; z-index: -100;">
				<div style='background-position: 50% 50%; background-size: cover; background-repeat: no-repeat; background-image: url("https://landkit.goodthemes.co/assets/img/covers/cover-3.jpg"); position: absolute; top: 0px; left: 0px; width: 1354px; height: 839.55px; overflow: hidden; pointer-events: none; margin-top: 228.725px; transform: translate3d(0px, -228.725px, 0px);'></div>
			</div> */}
		</section>
	)
}

export default Hero
