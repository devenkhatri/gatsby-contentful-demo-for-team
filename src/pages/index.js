import * as React from "react"
import * as styles from "../scripts"
import { graphql } from 'gatsby'

const docLink = {
  text: "Documentation",
  url: "https://www.gatsbyjs.com/docs/",
  color: "#8954A8",
}

const IndexPage = ({ data }) => {
  // const data = props.data;
  console.log("***** data", data)
  return (
    <main style={styles.pageStyles}>
      <h1 style={styles.headingStyles}>
        <span style={styles.headingAccentStyles}>{data?.contentfulPage?.title}!</span>
      </h1>
      <h2>Member List</h2>
      <ul>
        {data?.contentfulPage?.sections[0]?.blocks.map((block) => {
          return (
            <li key={block.title}>{block.title} - {block.description?.description} - {block.metadata?.tags[0].contentful_id}</li>
          )
        })}
      </ul> 
      <a href="/dashboard/">Go to dashboard</a>     
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>

export const pageQuery = graphql`
  query HomeQuery {
    contentfulPage(slug: {eq: "/"}) {
      slug
      title
      sections {
        blocks {
          title
          description {
            description
          }
          metadata {
            tags {
              name
              contentful_id
            }
          }
        }
      }
    }
  }  
`