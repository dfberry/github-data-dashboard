import Navigation from './Navigation'
import Footer from './Footer'

const Layout = ({ children }:any) => {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
