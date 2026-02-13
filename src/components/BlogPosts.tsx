import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface BlogPost {
  id: number
  title: string
  excerpt: string
  body?: string
  date: string
  tags: string[]
  readTime: string
}

// Sample posts - replace with your actual content
const posts: BlogPost[] = [
  {
    id: 1,
    title: 'Netlab+: The Neverending Saga',
    excerpt: 'Choosing an internship over a project to work on installing NDG Netlab+ with my supervisors. Navigating the VMWare to Proxmox transition and planning the network infrastructure.',
    body: `I chose to do an internship this quarter vice a project. This is mainly because I am already working on a sizeable project with my bosses, Aaron MacDonald and Prof. Kevin Blackwell. We are working on installing a product called NDG Netlab+. It is an on prem virtual hosting service that can spin up ephemeral virtual machines so students can work with virtualized networking and desktop assets in support of their studies. Currently, 90% of the hardware is installed. I just need to install the Netlab+ network switches and configure them. Software-wise, we are in a gray area. NDG, or Network Development Group, had been using VMWare ESXi as the hypervisor in their tech stack. Since the Broadcom acquisition of VMWare, Broadcom has been prioritizing enterprise level customers and pricing out mid to low level customers. Because of this, ESXi became too expensive and NDG moved to Proxmox for its hypervisor. Well, Proxmox WAS at version 8. Just recently Proxmox released version 9, which NDG now has to vet and test for integration. This means that at this point, we are trying to decide if we should just go ahead and roll with Proxmox 8 or wait for Proxmox 9 to be fully supported. What I think I might do is recommend to Prof. Blackwell to go ahead with Proxmox 8 and we will deal with the upgrade whenever it comes out because as of this writing, there is no forecasted commencement date for Proxmox 9 support. But other than that, we are ready to roll with the install. I have already constructed the network plan and Prof. Blackwell agrees with it. Basically we are bolting on the Netlab infrastructure on top of the existing classroom flat 192.168.0.0 subnet. By using NAT, we can strip all VLAN tags off the Netlab packets so there is no upstream configuration necessary. This coming week, I hope to get those switches installed and possibly convince Blackwell to roll with Proxmox 8.`,
    date: 'Jan 17, 2026',
    tags: ['Netlab+', 'Proxmox', 'Infrastructure'],
    readTime: '4 min read',
  },
  {
    id: 2,
    title: 'Time Management',
    excerpt: 'Not a whole lot happened this week.',
    body: `Not a whole happened this week. I kind of dropped the ball on my internship duties because I was swamped with school work. Next week I will try to get back on track. I have three concrete goals for the coming week. First, install the Netlab+ network switches. Second, obtain the login credentials for the Netlab+ control servers. Third, convince Prof. Blackwell to go ahead with Proxmox 8 instead of waiting for Proxmox 9 support. If I can those all done, I'll feel good about my internship progress.`,
    date: 'Jan 24, 2026',
    tags: ['Netlab+', 'Proxmox', 'Infrastructure'],
    readTime: '1 min read',
  },
  {
    id: 3,
    title: 'Baby Steps',
    excerpt: 'I got the Netlab+ switches installed this week and partially configured.',
    body: `I got the Netlab+ switches installed this week and partially configured. Then I will get them cabled up with a good boiler plate startup configuration. On Monday, I will talk to Kevin and report what I have done and try to get the information I need about a NDG point of contact and the login credentials for the Netlab+ control servers. Baby steps.`,
    date: 'Jan 30, 2026',
    tags: ['Netlab+', 'Proxmox', 'Infrastructure'],
    readTime: '1 min read',
  },
  {
    id: 4,
    title: 'Good Effort',
    excerpt: 'I achieved some good progress this week.',
    body: `I achieved some good progress this week. I got most of the network infrastructure set up for Netlab. The Netlab switches have a solid base configuration in place. Our test Proxmox server is set up with VLAN interfaces and can ping the Netlab switches via VLAN traffic. I also got the router-on-a-stick set up and is properly performing PAT and interVLAN routing with ACLs that ensure VLAN isolation. Next week, I'll install Proxmox 8 on the remaining servers and get their network settings set and wired up. The only thing I am not happy with is that due to running out of switchports on the hub switch, I have had to daisy chain the Netlab switch together, which is not optimal. Next week I will make it so the daisy chain is only one layer deep, so only one switch is actually being chained. Still not the best solution, but here we are. I am confident that by next week, The hardware and software will be almost 100% ready, with the last piece being the information I need from Prof. Blackwell.`,
    date: 'Feb 6, 2026',
    tags: ['Netlab+', 'Proxmox', 'Infrastructure'],
    readTime: '1 min read',
  },
  {
    id: 5,
    title: 'My Networking Strategies',
    excerpt: 'My networking strategy right now is pretty straightforward',
    body: `My networking strategy right now is pretty straightforward and honestly still a work in progress. I'm not someone who naturally enjoy“networking” for the sake of networking, but I understand that relationships matter in IT just as much as technical skills do. One channel I'm using is LinkedIn, mostly because it's expected. I'm not a huge fan of it. A lot of it feels performative and disconnected from how people actually work day to day. That said, I do see value in it as a public-facing record of what I've actually done. I will be using it more as a living resume than a social platform, focusing on documenting real projects, lab work, and hands-on experience from my internship rather than buzzwords or fluff. Another important networking channel for me is through my wife, who has worked at Nike for over 20 years. She has a large internal network and has offered to help set up informational interviews with people in IT. I'm interested in these conversations not as a shortcut to a job, but as a way to better understand what working in a large enterprise IT environment is really like and what skills they expect from new hires. That feedback directly helps me decide what I should focus on learning and improving before I graduate. I've also been attending job fairs and talking with recruiters. Instead of just handing over a résumé, I try to ask specific questions about what they look for in entry-level candidates, where students tend to be weak technically, and what skills matter most once you're actually on the job. Between my coursework, my internship projects, and these conversations, I feel like I'm building a realistic picture of where I want to go in IT and what I need to keep learning after graduation. My goal isn't just to get hired, but to keep growing once I am.`,
    date: 'Feb 13, 2026',
    tags: ['Netlab+', 'Proxmox', 'Infrastructure'],
    readTime: '3 min read',
  },
]

interface BlogPostModalProps {
  post: BlogPost
  onClose: () => void
}

function BlogPostModal({ post, onClose }: BlogPostModalProps) {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-3xl max-h-[85vh]">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex items-center gap-2 text-sm text-base-content/50 mb-2">
          <time>{post.date}</time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="font-bold text-2xl mb-4">{post.title}</h3>
        <div className="flex gap-2 mb-6">
          {post.tags.map((tag) => (
            <div key={tag} className="badge badge-primary badge-sm">
              {tag}
            </div>
          ))}
        </div>
        <div className="prose prose-sm max-w-none text-base-content/80 leading-relaxed">
          {post.body ? (
            post.body.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))
          ) : (
            <p>{post.excerpt}</p>
          )}
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  )
}

export default function BlogPosts() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

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
                  <button
                    className="btn btn-primary btn-sm btn-outline"
                    onClick={() => setSelectedPost(post)}
                  >
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

      {selectedPost && (
        <BlogPostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  )
}
