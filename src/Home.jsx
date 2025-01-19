import Navbar from './ui/navbar'
import SearchBar from './ui/searchBar'
import UniversitySlider from './ui/popularUni'
import Footer from './ui/Footer'
import HostelSlider from './ui/hostelSlider'

function Home() {
  
    return (
      <>
      <div className="body bg-[#fdf9e4] min-h-screen">
        <Navbar/>
        <SearchBar/>
        <UniversitySlider/>
        <HostelSlider />
        <Footer/>
      </div>
      </>
    )
  }
  
  export default Home