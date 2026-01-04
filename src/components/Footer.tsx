import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-beige-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="font-display text-2xl tracking-tight">
                Stock<span className="text-bronze">&</span>Flow
              </span>
            </Link>
            <p className="text-beige-300 mb-8 max-w-sm leading-relaxed">
              Holistic retail advisory for family-run UK high street retailers. 
              Helping independent shops thrive.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              
              <div>
                <h4 className="font-display text-lg mb-6 text-beige-50">Services</h4>
                <ul className="space-y-4">
                  <li><Link href="/consulting" className="text-beige-300 hover:text-bronze transition-colors">Operations</Link></li>
                  <li><Link href="/consulting" className="text-beige-300 hover:text-bronze transition-colors">Training</Link></li>
                  <li><Link href="/consulting" className="text-beige-300 hover:text-bronze transition-colors">Merchandising</Link></li>
                  <li><Link href="/consulting" className="text-beige-300 hover:text-bronze transition-colors">Analysis</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-lg mb-6 text-beige-50">Resources</h4>
                <ul className="space-y-4">
                  <li><Link href="/resources" className="text-beige-300 hover:text-bronze transition-colors">Guides</Link></li>
                  <li><Link href="/resources" className="text-beige-300 hover:text-bronze transition-colors">Templates</Link></li>
                  <li><Link href="/resources" className="text-beige-300 hover:text-bronze transition-colors">Training Materials</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-display text-lg mb-6 text-beige-50">Company</h4>
                <ul className="space-y-4">
                  <li><Link href="/about" className="text-beige-300 hover:text-bronze transition-colors">About Us</Link></li>
                  <li><Link href="/contact" className="text-beige-300 hover:text-bronze transition-colors">Contact</Link></li>
                  <li><Link href="/portal" className="text-beige-300 hover:text-bronze transition-colors">Client Portal</Link></li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-16 pt-8 border-t border-dark-700">
          <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
            <a href="mailto:hello@stockandflow.co" className="flex items-center gap-2 text-beige-300 hover:text-bronze transition-colors">
              <Mail size={16} />
              hello@stockandflow.co
            </a>
            <span className="flex items-center gap-2 text-beige-300">
              <MapPin size={16} />
              United Kingdom
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-beige-400 text-sm">
              © {new Date().getFullYear()} Stock & Flow. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-beige-400">
              <Link href="/privacy" className="hover:text-bronze transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-bronze transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}