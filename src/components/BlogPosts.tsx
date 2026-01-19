import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  tags: string[]
  readTime: string
}

// Sample posts - replace with your actual content
const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Introduction to NDG Netlab+',
    excerpt: 'An overview of NDG Netlab+ and what it provides for networking education. Understanding the platform before installation.',
    date: 'Jan 18, 2026',
    tags: ['Netlab+', 'Overview'],
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'IT Lab Environment Setup',
    excerpt: 'Preparing the college IT lab infrastructure for the Netlab+ installation. Hardware requirements and network considerations.',
    date: 'Jan 15, 2026',
    tags: ['Infrastructure', 'Setup'],
    readTime: '8 min read',
  },
  {
    id: 3,
    title: 'Working with My Supervisor',
    excerpt: 'Lessons learned from collaborating with my boss on this installation project. Communication and teamwork in IT.',
    date: 'Jan 12, 2026',
    tags: ['Internship', 'Teamwork'],
    readTime: '6 min read',
  },
]

export default function BlogPosts() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: 'power2.out',
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="posts" className="py-20 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Posts</h2>
          <p className="text-base-content/60 max-w-xl mx-auto">
            Documenting my progress, challenges, and learnings throughout the course.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={post.id}
              ref={(el) => { if (el) cardsRef.current[index] = el }}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="card-body">
                <div className="flex items-center gap-2 text-sm text-base-content/50 mb-2">
                  <time>{post.date}</time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="card-title text-xl hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-base-content/70 mt-2">
                  {post.excerpt}
                </p>
                <div className="card-actions justify-start mt-4">
                  {post.tags.map((tag) => (
                    <div key={tag} className="badge badge-outline badge-sm">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <button className="btn btn-primary btn-sm btn-outline">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
