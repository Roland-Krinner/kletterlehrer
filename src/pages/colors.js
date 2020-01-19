import React from 'react'
import { Container, Card } from 'react-bootstrap'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

const Colors = () => {
	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'black']
	const steps = [900, 800, 700, 600, 500, 400, 300, 200, 100]
	const stepsReversed = [...steps].reverse()

	return (
		<Layout pageInfo={{ pageName: 'datenschutz', pageType: 'subPage' }}>
			<Head title="Colors" />
			<section className="bg-light">
				<Container>
					<nav aria-label="breadcrumb">
						<ol className="breadcrumb breadcrumb-scroll">
							<li className="breadcrumb-item">
								<Link className="text-gray-700" to="/">
									Startseite
								</Link>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Colors
							</li>
						</ol>
					</nav>
				</Container>
			</section>
			<section className="pt-8 pt-md-11 bg-light">
				<Container>
					<section id="top">
						{colors.map(color => {
							return (
								<>
									<Container>
										<h2>{color}</h2>
									</Container>
									<Container>
										<Card>
											<Card.Body className="d-flex flex-wrap" style={{ padding: 0 }}>
												{steps.map(step => {
													return (
														<a href={`#bg-${color}-dark-${step}`} className={`mr-3 mb-3`}>
															<div style={{ width: '5rem', height: '5rem' }} className={`bg-${color}-dark-${step}`}></div>
															<span className="text-black font-size-sm">{`dark-${step}`}</span>
														</a>
													)
												})}
												<a href={`#bg-${color}`} className={`mr-3 mb-3`}>
													<div style={{ width: '5rem', height: '5rem' }} className={`bg-${color}`}></div>
													<span className="text-black font-size-sm">default</span>
												</a>
												{stepsReversed.map(step => {
													return (
														<a href={`#bg-${color}-light-${step}`} className={`mr-3 mb-3`}>
															<div style={{ width: '5rem', height: '5rem' }} className={`bg-${color}-light-${step}`}></div>
															<span className="text-black font-size-sm">{`light-${step}`}</span>
														</a>
													)
												})}
											</Card.Body>
										</Card>
									</Container>
									<Container>
										<Card>
											<Card.Body className="d-flex flex-wrap" style={{ padding: 0 }}>
												{stepsReversed.map(step => {
													return (
														<a href={`#bg-${color}-tint-${step}`} className={`mr-3 mb-3`}>
															<div style={{ width: '5rem', height: '5rem' }} className={`bg-${color}-tint-${step}`}></div>
															<span className="text-black font-size-sm">{`tint-${step}`}</span>
														</a>
													)
												})}
											</Card.Body>
										</Card>
									</Container>
								</>
							)
						})}
					</section>

					{colors.map(color => {
						return (
							<>
								{steps.map(step => {
									return (
										<section className={`bg-${color}-dark-${step}`}>
											<Container style={{ padding: '50px' }}>
												<span className="text-white">{`bg-${color}-dark-${step}`}</span>
											</Container>
										</section>
									)
								})}
								<section className={`bg-${color}`}>
									<Container style={{ padding: '50px' }}>
										<span className="text-white">{`bg-${color}`}</span>
									</Container>
								</section>
								{stepsReversed.map(step => {
									return (
										<section className={`bg-${color}-light-${step}`}>
											<Container style={{ padding: '50px' }}>
												<span className="text-white">{`bg-${color}-light-${step}`}</span>
											</Container>
										</section>
									)
								})}
								{stepsReversed.map(step => {
									return (
										<section className={`bg-${color}-tint-${step}`}>
											<Container style={{ padding: '50px' }}>
												<span className="text-white">{`bg-${color}-tint-${step}`}</span>
											</Container>
										</section>
									)
								})}
							</>
						)
					})}

					{colors.map(color => {
						return (
							<>
								{steps.map(step => {
									return (
										<section className={`bg-${color}-dark-${step}`} id={`bg-${color}-dark-${step}`}>
											<Container className="vh-100 d-flex align-items-center">
												<div>
													<p className="display-4 mb-6 text-white">
														{`bg-${color}-dark-${step}`} Hi, Toffee muffin bear claw ice cream gummies jujubes gingerbread. Apple pie bonbon pastry chocolate bar bear claw wafer bonbon. Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping <span className="text-success">Awesome Comapny</span> Powder bonbon oat cake chocolate!
													</p>
													<p className="text-primary-light-600">John Doe</p>
													<a href="#top" className="btn btn-primary text-primary-light-600">
														back to top
													</a>
												</div>
											</Container>
										</section>
									)
								})}
								<section className={`bg-${color}`} id={`bg-${color}`}>
									<Container className="vh-100 d-flex align-items-center">
										<div>
											<p className="display-4 mb-6 text-white">
												{`bg-${color}`} Hi, Toffee muffin bear claw ice cream gummies jujubes gingerbread. Apple pie bonbon pastry chocolate bar bear claw wafer bonbon. Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping <span className="text-success">Awesome Comapny</span> Powder bonbon oat cake chocolate!
											</p>
											<p className="text-primary-light-600">John Doe</p>
											<a href="#top" className="btn btn-primary text-primary-light-600">
												back to top
											</a>
										</div>
									</Container>
								</section>
								{stepsReversed.map(step => {
									return (
										<section className={`bg-${color}-light-${step}`} id={`bg-${color}-light-${step}`}>
											<Container className="vh-100 d-flex align-items-center">
												<div>
													<p className="display-4 mb-6 text-white">
														{`bg-${color}-light-${step}`} Hi, Toffee muffin bear claw ice cream gummies jujubes gingerbread. Apple pie bonbon pastry chocolate bar bear claw wafer bonbon. Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping <span className="text-success">Awesome Comapny</span> Powder bonbon oat cake chocolate!
													</p>
													<p className="text-primary-light-600">John Doe</p>
													<a href="#top" className="btn btn-primary text-primary-light-600">
														back to top
													</a>
												</div>
											</Container>
										</section>
									)
								})}
								{stepsReversed.map(step => {
									return (
										<section className={`bg-${color}-tint-${step}`} id={`bg-${color}-tint-${step}`}>
											<Container className="vh-100 d-flex align-items-center">
												<div>
													<p className="display-4 mb-6 text-white">
														{`bg-${color}-tint-${step}`} Hi, Toffee muffin bear claw ice cream gummies jujubes gingerbread. Apple pie bonbon pastry chocolate bar bear claw wafer bonbon. Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping Marzipan topping <span className="text-success">Awesome Comapny</span> Powder bonbon oat cake chocolate!
													</p>
													<p className="text-primary-light-600">John Doe</p>
													<a href="#top" className="btn btn-primary text-primary-light-600">
														back to top
													</a>
												</div>
											</Container>
										</section>
									)
								})}
							</>
						)
					})}
				</Container>
			</section>
		</Layout>
	)
}

export default Colors
