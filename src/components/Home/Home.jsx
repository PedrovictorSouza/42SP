import './Home.css'
import InteractiveGrid from './InteractiveGrid/InteractiveGrid'
import HomeSections from './HomeSections/HomeSections'

function Home() {
  return (
    <div className="home-wrapper">
      <InteractiveGrid />
      <HomeSections />
    </div>
  )
}

export default Home

