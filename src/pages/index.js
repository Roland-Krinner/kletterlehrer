import React from 'react'

import Layout from '../components/layout'
import Head from '../components/head'
import SectionHero from '../components/section-hero'
import SectionIntro from '../components/section-intro'
import SectionCourses from '../components/section-courses'
import SectionTours from '../components/section-tours'
import SectionQuotes from '../components/section-quotes'
import SectionFAQs from '../components/section-faqs'

const IndexPage = () => {
	return (
		<Layout pageInfo={{ pageName: 'index', pageType: 'homePage' }}>
			<Head title="Home" />
			<SectionHero/>
			<SectionIntro />
			<SectionCourses />
			<SectionTours />
			<SectionQuotes />
			{/* <SectionFAQs data={{ faqsHeadline, faqsSubline, faqList }} /> */}
			<SectionFAQs />
		</Layout>
	)
}

export default IndexPage
