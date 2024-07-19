import * as React from "react"
/*import { Link } from "gatsby"*/
import Navigation from './navigation'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location ? location.pathname === rootPath : false

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <Navigation /> {/* Use the Navigation component */}
      <main className="prose content-center">{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
