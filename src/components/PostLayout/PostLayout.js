import React from "react"
import Header from "../header"
import Container from "../Container"
import { graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"
import TableOfContents from "../TableOfContents"
import CodeBlock from "../code-block"
import styled from "@emotion/styled"

const Heading = {
  H1: props => <h1 style={{ color: "red" }} {...props} />,
  H2: props => {
    const { children } = props
    return (
      <h2><a id={children} name={children} href={`#${children}`}> </a>{children}</h2>
    )
  },
  H3: props => <h3 style={{ color: "red" }} {...props} />
}

const components = {
  pre: props => <div {...props} />,
  code: CodeBlock,
  h1: Heading.H1,
  h2: Heading.H2,
  h3: Heading.H3


}
export default function PostLayout({ data }) {
  return (
    <Container>
      <MDXProvider components={components}>
        <Header/>
        <Wrapper>
          <Aside>
            <TableOfContents headings={data.mdx.headings}/>
          </Aside>
          <Article>
            <MDXRenderer>{data.mdx.body}</MDXRenderer>
          </Article>
        </Wrapper>

      </MDXProvider>
    </Container>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  width: 100%;
`
const Article = styled.article`
  min-width: 686px;
  flex: 1 1;
`
const Aside = styled.aside`
  width: 350px;
  padding-left: 128px;
  position: sticky;
  top: 80px;
  max-height: calc(100vh - 120px);
  overflow: auto;
`

export const pageQuery = graphql`
  query MDXQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      headings {
        depth
        value
      }
    }
  }
`