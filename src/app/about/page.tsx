import Link from 'next/link'
import { ArrowRight, Users, Store, TrendingUp, Award } from 'lucide-react'

const stats = [
  { value: '160+', label: 'Team Members Managed', icon: Users },
  { value: '12', label: 'Stores Overseen', icon: Store },
  { value: '9', label: 'New Stores Opened', icon: Award },
  { value: '73%', label: 'Staff Retention Rate', icon: TrendingUp },
]

const expertise = [
  {
    title: 'New Store Openings',
    description: 'From site assessment to launch day. Nine successful openings across the UK, each one delivered on time and ready to trade.',
  },
  {
    title: 'Team Development',
    description: 'Building teams that stay. Individual inductions, ongoing training programmes, and a 73% retention rate that speaks for itself.',
  },
  {
    title: 'Operations',
    description: 'Reducing wastage, improving stock management, and creating processes that actually work on a busy shop floor.',
  },
  {
    title: 'Sales Growth',
    description: 'Consistent 10-15% sales growth through better merchandising, improved customer service, and smarter stock control.',
  },
]

const values = [
  {
    title: 'Honesty First',
    description: 'We tell you what you need to hear, not what you want to hear. Real advice, even when it is uncomfortable.',
  },
  {
    title: 'Practical Over Perfect',
    description: 'We focus on what works in real shops with real constraints. No ivory tower thinking here.',
  },
  {
    title: 'Long-Term Relationships',
    description: 'We are not interested in quick wins. We build partnerships that last because your success is our success.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-bronze-400 font-medium mb-4">About Stock & Flow</p>
            <h1 className="font-display text-4xl lg:text-5xl text-beige-50 leading-tight mb-6">
              Built on <em className="text-bronze-400">real</em> retail experience
            </h1>
            <p className="text-lg text-beige-300 leading-relaxed">
              Stock & Flow was founded with a simple belief: independent retailers deserve advisors who have actually done the job. 
              Not consultants with MBAs and slide decks, but people who have opened stores, managed teams, and know what it takes to make a shop successful.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="text-bronze-400 mx-auto mb-4" size={28} />
                <p className="font-display text-4xl text-beige-50 mb-2">{stat.value}</p>
                <p className="text-beige-300 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 lg:py-32 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-bronze-400 font-medium mb-4">Meet Tracy</p>
              <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-6">
                From the shop floor to district leadership
              </h2>
              <div className="space-y-4 text-dark-600 leading-relaxed">
                <p>
                  Tracy started where every good retailer starts: on the shop floor. From assistant manager to running two stores simultaneously, 
                  then store manager, and finally district manager overseeing 12 locations and 160 team members.
                </p>
                <p>
                  Along the way, she opened 9 new stores across the UK, built training programmes from scratch, 
                  and consistently delivered 10-15% sales growth. Her teams stayed too, with a 73% retention rate 
                  in an industry known for high turnover.
                </p>
                <p>
                  That experience came from years at The Works, Flying Tiger Copenhagen, and Miniso. 
                  Three very different retailers, but the fundamentals are always the same: 
                  look after your people, know your stock, and never stop improving.
                </p>
                <p>
                  Stock & Flow exists because independent retailers deserve access to this level of experience. 
                  Not watered down. Not overpriced. Just honest, practical help from someone who gets it.
                </p>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white rounded-lg border border-beige-200 p-8">
              <h3 className="font-display text-xl text-dark-900 mb-8">Proven Results</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="text-bronze-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900">10-15% Sales Growth</p>
                    <p className="text-dark-500 text-sm">Consistent improvement through better operations and merchandising</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-bronze-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900">73% Staff Retention</p>
                    <p className="text-dark-500 text-sm">Teams that stay because they are trained, supported, and valued</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Store className="text-bronze-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900">12% Footfall Increase</p>
                    <p className="text-dark-500 text-sm">More customers through better visual merchandising and service</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="text-bronze-400" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-900">9 Store Openings</p>
                    <p className="text-dark-500 text-sm">End-to-end delivery from fit-out to first day of trade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-24 lg:py-32 bg-beige-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-bronze-400 font-medium mb-4">What We Bring</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900">
              Expertise that comes from doing
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((item, index) => (
              <div key={index} className="p-8 bg-white rounded-lg border border-beige-200">
                <h3 className="font-display text-xl text-dark-900 mb-4">{item.title}</h3>
                <p className="text-dark-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-16">
            <p className="text-bronze-400 font-medium mb-4">How We Work</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900">
              Our values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="p-8 bg-white rounded-lg border border-beige-200">
                <h3 className="font-display text-xl text-dark-900 mb-4">{value.title}</h3>
                <p className="text-dark-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Independent Retail */}
      <section className="py-24 lg:py-32 bg-beige-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-bronze-400 font-medium mb-4">Why We Do This</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-6">
              The high street matters
            </h2>
          </div>
          
          <div className="space-y-6 text-dark-600 text-lg leading-relaxed">
            <p>
              Independent retailers are the lifeblood of British communities. They are the shops that know your name, 
              that sponsor the local football team, that stay open late when you need them.
            </p>
            <p>
              But running an independent shop has never been harder. Rising costs, online competition, and complex regulations 
              make it tough to compete, especially without the resources of big chains.
            </p>
            <p>
              Stock & Flow exists to level that playing field. We bring the operational expertise and strategic thinking 
              that big retailers take for granted, and we make it accessible to family-run businesses.
            </p>
            <p className="font-medium text-dark-900">
              Because when independent retailers thrive, communities thrive.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-dark-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-beige-50 mb-6">
            Want to know more?
          </h2>
          <p className="text-beige-300 text-lg mb-10">
            Let us have a conversation about your shop and how we might help.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Get in Touch
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}