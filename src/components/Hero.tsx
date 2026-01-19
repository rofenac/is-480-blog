import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from(titleRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
    })
    .from(subtitleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
    }, '-=0.5')
    .from(ctaRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
    }, '-=0.4')
  }, { scope: heroRef })

  return (
    <div ref={heroRef} className="hero min-h-[80vh] bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-primary">Netlab+</span> Internship Blog
          </h1>
          <p ref={subtitleRef} className="text-lg md:text-xl text-base-content/70 mb-8">
            Documenting my internship at the college IT lab. Follow along as I assist
            in installing NDG Netlab+ and share what I learn along the way.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center">
            <a href="#posts" className="btn btn-primary btn-lg">
              Read Posts
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#about" className="btn btn-outline btn-lg">
              About Project
            </a>
          </div>

          <div className="mt-12 flex justify-center gap-8 text-base-content/50">
            <div className="flex items-center gap-2">
              <div className="badge badge-primary badge-sm"></div>
              <span>NDG Netlab+</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-secondary badge-sm"></div>
              <span>IS-480</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="badge badge-accent badge-sm"></div>
              <span>IT Lab Internship</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
