import { useContext } from "react"
import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import { ThemeContext } from "../contexts/ThemeContext"

const Layout = ({children}) => {

  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex flex-col min-h-screen ${theme === 'dark' ? 'bg-[#1E1E1E] text-white' : 'bg-gray-100 text-black'} ">
        <Header/>
        <div className="container mx-auto">
            <SearchBar/>
        </div>
        <Hero/>
        <div className="container mx-auto py-10 flex-1">{children}</div>
        <Footer/>
    </div>
  )
}

export default Layout