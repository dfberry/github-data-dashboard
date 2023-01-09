import Footer from './Footer'

const Layout = ({ children }:any) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
