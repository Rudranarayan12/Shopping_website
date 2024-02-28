import React from 'react'
import Layout from '../components/Layout'

const About = () => {
  return (
    <Layout title={"About Us"}>
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-6/12 mb-6 md:mb-0">
          <img
            src="/images/aboutus.jpg"
            alt="aboutus"
            className="w-full h-auto"
          />
        </div>
        <div className="w-full md:w-6/12 container mx-auto p-4">
          <p className="text-justify mt-2 text-xl">
            Every business has an origin story worth telling, and usually, one that justifies why you even do business and have clients.

            Some centennial enterprises have pages of content that can fit in this section, while startups can tell the story of how the company was born, its challenges, and its vision for the future.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About;
