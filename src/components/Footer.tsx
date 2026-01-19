export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="about" className="bg-base-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">&lt;</span>
              IS-480 Blog
              <span className="text-primary">/&gt;</span>
            </h3>
            <p className="text-base-content/60">
              A blog documenting my internship at the college IT lab, where I assist
              in installing NDG Netlab+. Built with React, TypeScript, and a passion for learning.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#posts" className="text-base-content/60 hover:text-primary transition-colors">
                  Blog Posts
                </a>
              </li>
              <li>
                <a href="https://github.com/rofenac/is-480-blog" target="_blank" rel="noopener noreferrer" className="text-base-content/60 hover:text-primary transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#" className="text-base-content/60 hover:text-primary transition-colors">
                  Course Materials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-primary">React</span>
              <span className="badge badge-secondary">TypeScript</span>
              <span className="badge badge-accent">Tailwind CSS</span>
              <span className="badge badge-info">DaisyUI</span>
              <span className="badge badge-success">GSAP</span>
              <span className="badge badge-warning">Vite</span>
            </div>
          </div>
        </div>

        <div className="divider my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-base-content/50 text-sm">
          <p>&copy; {currentYear} IS-480 Netlab+ Internship Blog. Made for learning.</p>
          <p>
            Built with{' '}
            <span className="text-error">♥</span>
            {' '}using React + TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}
