import Link from 'next/link'
import { ArrowRight, CheckCircle2, Store, Users, BarChart3, Package, Palette, ClipboardList, Clock, Calendar, Zap } from 'lucide-react'

const services = [
  {
    icon: Store,
    title: 'New Store Openings',
    description: 'Opening a new location? We have opened 9 stores and can guide you through every step, from site assessment to launch day.',
    includes: [
      'Site assessment and planning',
      'Fit-out coordination',
      'Staff recruitment and training',
      'Launch day execution',
    ],
  },
  {
    icon: Users,
    title: 'Team Development',
    description: 'Your team makes or breaks your shop. We help you hire right, train well, and keep good people with a proven approach that delivered 73% retention.',
    includes: [
      'Recruitment and interviewing',
      'Individual induction programmes',
      'Ongoing training and development',
      'Performance management',
    ],
  },
  {
    icon: ClipboardList,
    title: 'Operations',
    description: 'Get your shop running like clockwork. Build processes that work on a busy shop floor, not just in a manual.',
    includes: [
      'Opening and closing procedures',
      'Cash handling and banking',
      'Health and safety compliance',
      'Daily, weekly, and monthly routines',
    ],
  },
  {
    icon: Package,
    title: 'Stock Management',
    description: 'Right product, right place, right time. We help you reduce wastage, improve ordering, and get control of your inventory.',
    includes: [
      'Stock control systems',
      'Ordering and replenishment',
      'Stocktake procedures',
      'Wastage reduction',
    ],
  },
  {
    icon: Palette,
    title: 'Merchandising',
    description: 'Make your shop floor sell. Strategic layouts and displays that guide customers and drive sales, delivering footfall increases of 12% and more.',
    includes: [
      'Floor layout optimisation',
      'Window displays',
      'Promotional planning',
      'Seasonal changeovers',
    ],
  },
  {
    icon: BarChart3,
    title: 'Performance',
    description: 'Know your numbers. We help you track what matters and make decisions based on data. Our approach has consistently delivered 10-15% sales growth.',
    includes: [
      'KPI frameworks',
      'Sales analysis',
      'Basket size improvement',
      'Target setting and tracking',
    ],
  },
]

const packages = [
  {
    name: 'First Hour',
    price: 'Free',
    priceNote: 'No obligation',
    description: 'Not a sales call. A real hour of consulting where we dig into your challenges.',
    includes: [
      'One hour of focused consulting',
      'Initial assessment of your needs',
      'Actionable recommendations',
      'No strings attached',
    ],
    cta: 'Book Your Free Hour',
    highlighted: false,
    icon: Zap,
  },
  {
    name: 'Hourly',
    price: '£75',
    priceNote: 'per hour',
    description: 'Flexible support for specific questions or short projects.',
    includes: [
      'Book hours as you need them',
      'Phone, video, or in-person',
      'Follow-up notes included',
      'No minimum commitment',
    ],
    cta: 'Get Started',
    highlighted: false,
    icon: Clock,
  },
  {
    name: 'Day Rate',
    price: '£495',
    priceNote: 'save £105 vs hourly',
    description: 'A full day on-site or dedicated remote support.',
    includes: [
      'Full 8-hour day',
      'On-site or remote',
      'Hands-on implementation',
      'Action plan included',
    ],
    cta: 'Book a Day',
    highlighted: true,
    icon: Calendar,
  },
  {
    name: '5-Day Block',
    price: '£1,995',
    priceNote: 'save £480 vs daily',
    description: 'Ideal for bigger projects or ongoing weekly support.',
    includes: [
      'Five full days',
      'Use consecutively or spread out',
      'Priority scheduling',
      'Weekly check-ins included',
    ],
    cta: 'Buy 5 Days',
    highlighted: false,
    icon: Calendar,
  },
]

export default function ConsultingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-bronze-400 font-medium mb-4">Consulting Services</p>
            <h1 className="font-display text-4xl lg:text-5xl text-beige-50 leading-tight mb-6">
              Hands-on help for <em className="text-bronze-400">every</em> part of your shop
            </h1>
            <p className="text-lg text-beige-300 leading-relaxed mb-8">
              From opening day to ongoing operations, we bring practical expertise built from managing 12 stores, 
              160 team members, and 9 successful new store launches.
            </p>
            <p className="text-beige-400">
              Your first hour is free. No sales pitch, just real consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 lg:py-32 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-bronze-400 font-medium mb-4">Simple Pricing</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-6">
              Rates that work for <em>independent</em> retailers
            </h2>
            <p className="text-dark-600">
              We know high street margins are tight. Our pricing is designed to be accessible, not exclusive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${
                  pkg.highlighted 
                    ? 'bg-dark-900 text-beige-50 ring-2 ring-bronze-400' 
                    : 'bg-white border border-beige-200'
                }`}
              >
                <pkg.icon className={`mb-4 ${pkg.highlighted ? 'text-bronze-400' : 'text-bronze-400'}`} size={28} />
                <h3 className={`font-display text-xl mb-2 ${pkg.highlighted ? 'text-beige-50' : 'text-dark-900'}`}>
                  {pkg.name}
                </h3>
                <div className="mb-4">
                  <span className={`font-display text-3xl ${pkg.highlighted ? 'text-beige-50' : 'text-dark-900'}`}>
                    {pkg.price}
                  </span>
                  <span className={`text-sm ml-2 ${pkg.highlighted ? 'text-beige-400' : 'text-dark-500'}`}>
                    {pkg.priceNote}
                  </span>
                </div>
                <p className={`text-sm mb-6 ${pkg.highlighted ? 'text-beige-300' : 'text-dark-600'}`}>
                  {pkg.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {pkg.includes.map((item, i) => (
                    <li key={i} className={`flex items-start gap-2 text-sm ${pkg.highlighted ? 'text-beige-300' : 'text-dark-600'}`}>
                      <CheckCircle2 className={`mt-0.5 flex-shrink-0 ${pkg.highlighted ? 'text-bronze-400' : 'text-bronze-400'}`} size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/contact"
                  className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                    pkg.highlighted
                      ? 'bg-bronze-400 hover:bg-bronze-500 text-white'
                      : 'bg-beige-100 hover:bg-beige-200 text-dark-900'
                  }`}
                >
                  {pkg.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Store Launch Package */}
          <div className="bg-dark-900 rounded-lg p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-bronze-400 text-sm font-medium">Complete Package</span>
                <h3 className="font-display text-3xl text-beige-50 mt-2 mb-4">Store Launch Support</h3>
                <p className="text-beige-300 mb-6">
                  Opening a new store? We will handle everything from planning to launch day. A full month of dedicated support covering recruitment, training, merchandising, stock ordering, and operations setup.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Full month of dedicated support',
                    'Recruitment and team building',
                    'Complete staff training programme',
                    'Store layout and merchandising',
                    'Stock ordering and systems setup',
                    'Launch day management',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-beige-300 text-sm">
                      <CheckCircle2 className="text-bronze-400 mt-0.5 flex-shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-beige-400 text-sm mb-2">One-month engagement</p>
                <p className="font-display text-5xl text-beige-50 mb-2">£4,995</p>
                <p className="text-beige-400 text-sm mb-8">Everything you need to launch successfully</p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white px-8 py-4 rounded-lg font-medium transition-colors"
                >
                  Discuss Your Launch
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-beige-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-bronze-400 font-medium mb-4">What We Cover</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900">
              Every aspect of <em>retail operations</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="p-8 bg-white rounded-lg border border-beige-200"
              >
                <service.icon className="text-bronze-400 mb-6" size={32} />
                <h3 className="font-display text-2xl text-dark-900 mb-4">{service.title}</h3>
                <p className="text-dark-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-2">
                  {service.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-dark-600 text-sm">
                      <CheckCircle2 className="text-bronze-400 mt-0.5 flex-shrink-0" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 lg:py-32 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-bronze-400 font-medium mb-4">How We Work</p>
            <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-6">
              A straightforward process
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Free Hour', desc: 'We start with a free hour to understand your shop, your challenges, and your goals.' },
              { step: '02', title: 'Assessment', desc: 'If it makes sense to work together, we dig deeper and identify priorities.' },
              { step: '03', title: 'Plan', desc: 'We develop practical recommendations tailored to your specific situation.' },
              { step: '04', title: 'Support', desc: 'We help you implement changes and stick around to make sure they work.' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <span className="font-display text-5xl text-bronze-400">{item.step}</span>
                <h3 className="font-display text-xl text-dark-900 mt-4 mb-2">{item.title}</h3>
                <p className="text-dark-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section className="py-24 lg:py-32 bg-beige-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-bronze-400 font-medium mb-4">Our Track Record</p>
          <h2 className="font-display text-3xl lg:text-4xl text-dark-900 mb-12">
            Results that speak for themselves
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '10-15%', label: 'Sales Growth' },
              { value: '73%', label: 'Staff Retention' },
              { value: '12%', label: 'Footfall Increase' },
              { value: '9', label: 'Stores Opened' },
            ].map((stat, index) => (
              <div key={index}>
                <p className="font-display text-4xl text-bronze-400 mb-2">{stat.value}</p>
                <p className="text-dark-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-dark-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl text-beige-50 mb-6">
            Your first hour is <em className="text-bronze-400">free</em>
          </h2>
          <p className="text-beige-300 text-lg mb-10">
            Book a free hour of consulting. We will dig into your challenges and give you actionable advice, whether you work with us or not.
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