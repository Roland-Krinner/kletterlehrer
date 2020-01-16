import React from 'react'

import Layout from '../components/layout'
import Head from '../components/head'
import SectionHero from '../components/section-hero'
import SectionIntro from '../components/section-intro'
import SectionFAQs from '../components/section-faqs'
import SectionQuotes from '../components/section-quotes'

const IndexPage = () => {
	return (
		<Layout pageInfo={{ pageName: 'index', pageType: 'homePage' }}>
			<Head title="Home" />
			<SectionHero/>
			<SectionIntro />
			<SectionQuotes />
			{/* <SectionFAQs data={{ faqsHeadline, faqsSubline, faqList }} /> */}
			<SectionFAQs />
		</Layout>
	)
}

export default IndexPage
