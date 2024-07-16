const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
const prayerPostTemplate = path.resolve(`./src/templates/prayer-post.js`)
const poetryPostTemplate = path.resolve(`./src/templates/poetry-post.js`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      blog: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/blog/" } }
        sort: { frontmatter: { date: ASC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      prayer: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/prayer/" } }
        sort: { frontmatter: { date: ASC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
      poetry: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/poetry/" } }
        sort: { frontmatter: { date: ASC } }
        limit: 1000
      ) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your blog posts`, result.errors)
    return
  }

  const blogPosts = result.data.blog.nodes
  const prayerPosts = result.data.prayer.nodes
  const poetryPosts = result.data.poetry.nodes

  const createBlogPages = (posts, basePath, component) => {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: `${basePath}${post.fields.slug}`,
        component,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  createBlogPages(blogPosts, '/blog', blogPostTemplate)
  createBlogPages(prayerPosts, '/prayer', prayerPostTemplate)
  createBlogPages(poetryPosts, '/poetry', poetryPostTemplate)
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value: slug,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
