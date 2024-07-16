import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PoetryIndex = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Seo title="Poetry" />
      <h1>Poetry</h1>
      <ul>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug
          return (
            <li key={post.fields.slug}>
              <Link to={`/poetry${post.fields.slug}`}>
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

export default PoetryIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/poetry/" } }
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
