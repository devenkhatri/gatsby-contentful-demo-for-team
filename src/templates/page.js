import * as React from "react"
import * as styles from "../scripts"
import { graphql } from 'gatsby'

const PageTemplate = ({ data }) => {
    // const data = props.data;
    console.log("***** data", data)
    return (
        <main style={styles.pageStyles}>
            <a style={styles.linkStyle} href={`/`}>Home</a>
            <h1 style={styles.headingStyles}>
                <span style={styles.headingAccentStyles}>{data?.contentfulPage?.title}!</span>
            </h1>
            <h2>Page Structure</h2>
            <ul>
                <li>Sections</li>
                <ul>
                    {data?.contentfulPage?.sections.map((section) => {
                        return (

                            <li key={section.type}>
                                {section.internalName} - {section.type}                                
                                <ul>
                                    {section.blocks && section.blocks.length > 0 && <li>Blocks</li>}
                                    <ul>
                                    {section?.blocks.map((block) => {
                                        return (
                                            <li key={block.title}>{block.title}</li>
                                        )
                                    })}
                                    </ul>
                                </ul>
                            </li>
                        )
                    })}
                </ul>

            </ul>
        </main>
    )
}

export default PageTemplate

export const Head = () => <title>Home Page</title>

export const pageQuery = graphql`
  query PageQuery ($slug: String!) {
    contentfulPage(slug: {eq: $slug}) {
      slug
      title
      sections {
        internalName
        type
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