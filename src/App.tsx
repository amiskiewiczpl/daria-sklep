import AnnouncementBar from './components/sections/AnnouncementBar'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'
import Router from './router'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-background text-brand">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow">
        <Router />
      </main>
      <Footer />
    </div>
  )
}

export default App