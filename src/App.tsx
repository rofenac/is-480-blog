import './index.css'
import Header from './components/Header'
import Hero from './components/Hero'
import BlogPosts from './components/BlogPosts'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-base-100" data-theme="night">
      <Header />
      <main>
        <Hero />
        <BlogPosts />
      </main>
      <Footer />
    </div>
  )
}

export default App
