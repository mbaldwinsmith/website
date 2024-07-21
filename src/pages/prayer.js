import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PrayerIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo title="Prayer" />
      <h1 className="text-center">Prayer</h1>
      <ul>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug} className="shadow-md">
              <Link to={`/prayer${post.fields.slug}`}>
                <h2>{title}</h2>
              </Link>
              <p>{post.frontmatter.date}</p>
              <p>{post.frontmatter.description}</p>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export default PrayerIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/prayer/" } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMMM DD, YYYY")
          description
        }
      }
    }
  }
`
