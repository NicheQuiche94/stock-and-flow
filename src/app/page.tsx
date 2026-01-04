import Link from 'next/link'
import { ArrowRight, Star, TrendingUp, Store, Users } from 'lucide-react'

const stats = [
  { value: '160+', label: 'Team Members Managed', icon: Users },
  { value: '9', label: 'New Stores Opened', icon: Store },
  { value: '73%', label: 'Staff Retention Rate', icon: TrendingUp },
]

const experience = [
  'The Works',
  'Flying Tiger Copenhagen', 
  'Miniso',
]

const services = [
  {
    title: 'Operations',
    description: 'Streamline your day-to-day. Build systems that work for real shops with real staff and real customers.',
  },
  {
    title: 'Training',
    description: 'Your team is everything. Develop training that sticks and builds genuine capability at every level.',
  },
  {
    title: 'New Store Openings',
    description: 'Opening a new location? We have opened 9 stores across the UK and can guide you through every step.',
  },
]

const testimonials = [
  {
    quote: "They understood our family business from day one. No corporate nonsense, just practical help that made a real difference.",
    author: "Margaret Chen",
    role: "Chens Hardware, Birmingham",
    years: "Est. 1978",
  },
  {
    quote: "Finally, consultants who have actually worked a shop floor. The difference shows in everything they recommend.",
    author: "David Williams", 
    role: "Williams & Sons Outfitters",
    years: "Cardiff",
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-dark-900">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-bronze-400 font-medium tracking-wide mb-6">
              Holistic Retail Advisory
            </p>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-beige-50 leading-tight mb-8">
              Helping <em className="text-bronze-400">family-run</em> UK high street retailers build shops that last
            </h1>
            
            <p className="text-lg text-beige-300 max-w-xl leading-relaxed mb-10">
              Stock & Flow provides hands-on consulting for independent retailers. 
              We bring real experience from running real shops, because that is what it takes to make a real difference.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact" className="btn-primary flex items-center gap-2">
                Get Your First Hour Free
                <ArrowRight size={18} />
              </Link>
              <Link href="/consulting" className="btn-secondary">
                Our Services
              </Link>
            </div>

            <p className="text-beige-400 text-sm">
              Not a sales call. A real hour of consulting, on us.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="text-bronze-400 mx-auto mb-4" size={32} />
                <p className="font-display text-4xl lg:text-5xl text-beige-50 mb-2">{stat.value}</p>
                <p className="text-beige-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-beige-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-dark-500 mb-6">Our founder has led retail operations at</p>
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16">
              {experience.map((company, i) => (
                <span key={i} className="font-display text-xl lg:text-2xl text-dark-900">{company}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 lg:py-32 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-bronze-400 font-medium mb-4">What We Do</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-6">
              Practical support for <em>real</em> retailers
            </h2>
            <p className="text-dark-600 text-lg">
              No jargon. No complex frameworks. Just honest help from someone who has done the job, from shop floor to district management.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group p-8 bg-white rounded-lg border border-beige-200 card-hover"
              >
                <h3 className="font-display text-2xl text-dark-900 mb-4">{service.title}</h3>
                <p className="text-dark-600 mb-6 leading-relaxed">{service.description}</p>
                <Link 
                  href="/consulting"
                  className="inline-flex items-center gap-2 text-bronze-400 font-medium group-hover:gap-3 transition-all duration-300"
                >
                  Learn more
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-24 lg:py-32 bg-beige-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-bronze-400 font-medium mb-4">Simple, Honest Pricing</p>
          <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-6">
            Rates that work for <em className="text-bronze-400">independent</em> retailers
          </h2>
          <p className="text-dark-600 text-lg mb-12 max-w-2xl mx-auto">
            We know high street margins are tight. Our pricing is designed to be accessible, with your first hour completely free.
          </p>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg border border-beige-200 p-6">
              <p className="text-dark-500 text-sm mb-2">Hourly</p>
              <p className="font-display text-3xl text-dark-900">£75</p>
              <p className="text-dark-400 text-sm">per hour</p>
            </div>
            <div className="bg-white rounded-lg border-2 border-bronze-400 p-6">
              <p className="text-bronze-400 text-sm mb-2">Day Rate</p>
              <p className="font-display text-3xl text-dark-900">£495</p>
              <p className="text-dark-400 text-sm">save £105</p>
            </div>
            <div className="bg-white rounded-lg border border-beige-200 p-6">
              <p className="text-dark-500 text-sm mb-2">5-Day Block</p>
              <p className="font-display text-3xl text-dark-900">£1,995</p>
              <p className="text-dark-400 text-sm">save £480</p>
            </div>
          </div>

          <Link href="/consulting" className="text-bronze-400 font-medium hover:underline">
            View all packages including store launch support →
          </Link>
        </div>
      </section>

      {/* Statement Section */}
      <section className="py-24 lg:py-32 bg-beige-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-8 leading-snug">
            The British high street is built on <em className="text-bronze-400">independent retailers</em>. 
            We are here to help them thrive.
          </h2>
          <p className="text-dark-600 text-lg max-w-2xl mx-auto">
            Family-run shops are the backbone of local communities. They deserve advisors who understand that, and who care about long-term success, not quick fixes.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 lg:py-32 bg-beige-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-bronze-400 font-medium mb-4">Client Stories</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900">
              Real results for <em>real</em> retailers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-lg border border-beige-200"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-bronze-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-dark-700 text-lg mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-dark-900">{testimonial.author}</p>
                  <p className="text-dark-500 text-sm">{testimonial.role}</p>
                  <p className="text-bronze-400 text-sm">{testimonial.years}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-dark-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-beige-50 mb-6">
            Your first hour is <em className="text-bronze-400">free</em>
          </h2>
          <p className="text-beige-300 text-lg mb-4 max-w-xl mx-auto">
            Not a sales pitch. Not an intro call. A real hour of consulting where we dig into your challenges and give you actionable advice.
          </p>
          <p className="text-beige-400 text-sm mb-10">
            No obligation. If we are not the right fit, we will tell you.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Book Your Free Hour
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}