const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const pageTemplate = path.resolve('./src/templates/page.js')

  const result = await graphql(
    `
      {
        allContentfulPage {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful pages`,
      result.errors
    )
    return
  }

  const pages = result.data.allContentfulPage.nodes

  // Create pages from Contentful
  // But only if there's at least one page found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (pages.length > 0) {
    pages.forEach((page, index) => {
      createPage({
        path: `/${page.slug}/`,
        component: pageTemplate,
        context: {
          slug: page.slug,
        },
      })
    })
  }
}