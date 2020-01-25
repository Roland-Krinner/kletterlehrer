import React from 'react'

import Layout from '../components/layout'
import Head from '../components/head'
import SectionHero from '../components/section-hero'
import SectionIntro from '../components/section-intro'
import SectionCourses from '../components/section-courses'
import SectionTours from '../components/section-tours'
import SectionQuotes from '../components/section-quotes'
import SectionFeature from '../components/section-feature'
import SectionFeatureProfile from '../components/section-feature-profile'
import SectionFAQs from '../components/section-faqs'

const IndexPage = () => {
	return (
		<Layout pageInfo={{ pageName: 'index', pageType: 'homePage' }}>
			<Head title="Home" />
			<SectionHero/>
			<SectionIntro />
			<SectionFeatureProfile />
			<SectionCourses />
			<SectionTours />
			<SectionQuotes />
			<SectionFeature />
			<SectionFAQs />
		</Layout>
	)
}

export default IndexPage
