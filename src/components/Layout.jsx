import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CustomCursor from './CustomCursor'
import SiteBackdrop from './SiteBackdrop'
import {ConnectBand} from './UI'

export default function Layout(){
  const {pathname} = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return (
    <>
      <SiteBackdrop/>
      <CustomCursor/>
      <Header/>
      <main className="page-in" key={pathname}><Outlet/></main>
      {pathname !== '/contact' && <ConnectBand/>}
      <Footer/>
    </>
  )
}
