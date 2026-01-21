import SmoothScroll from './components/layout/SmoothScroll';
import Hero from './components/Hero';

function App() {
  return (
    <SmoothScroll>
      <main className="w-full max-h-screen bg-neutral-900 text-white">
        
        {/* The 3D Hero Section */}
        <Hero />

        {/* Temporary Spacer to allow scrolling past the Hero */}
        <section className="h-screen flex items-center justify-center bg-white text-black z-50 relative">
          <h2 className="text-4xl font-bold tracking-tighter">
            Next Section Starts Here
          </h2>
        </section>

      </main>
    </SmoothScroll>
  )
}

export default App