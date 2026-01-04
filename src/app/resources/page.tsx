import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import { FileText, BookOpen, Download, Lock } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase'
import CheckoutButton from '@/components/CheckoutButton'
import DownloadButton from '@/components/DownloadButton'

export default async function ResourcesPage() {
  const user = await currentUser()
  
  // Fetch resources from database
  const { data: resources } = await supabaseAdmin
    .from('resources')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const freeResources = resources?.filter(r => r.price === 0) || []
  const paidResources = resources?.filter(r => r.price > 0) || []

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-bronze-400 font-medium mb-4">Resources</p>
            <h1 className="font-display text-4xl lg:text-5xl text-beige-50 leading-tight mb-6">
              Templates and guides for <em className="text-bronze-400">independent</em> retailers
            </h1>
            <p className="text-lg text-beige-300 leading-relaxed">
              Practical tools built from real retail experience. Download free resources or invest in our premium guides.
            </p>
          </div>
        </div>
      </section>

      {/* Login Banner for non-logged in users */}
      {!user && (
        <section className="bg-beige-100 border-b border-beige-200">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="text-bronze-400" size={20} />
                <p className="text-dark-700">
                  <span className="font-medium">Create a free account</span> to download resources and track your purchases.
                </p>
              </div>
              <Link 
                href="/sign-up"
                className="inline-flex items-center justify-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Free Resources */}
      <section className="py-16 lg:py-24 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-2xl lg:text-3xl text-dark-900 mb-4">
              Free Resources
            </h2>
            <p className="text-dark-600">
              Essential templates to get you started. Create a free account to download.
            </p>
          </div>

          {freeResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freeResources.map((resource) => (
                <div 
                  key={resource.id}
                  className="bg-white rounded-lg border border-beige-200 p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-beige-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-dark-400" size={24} />
                    </div>
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                      Free
                    </span>
                  </div>
                  
                  <h3 className="font-display text-lg text-dark-900 mb-2">{resource.title}</h3>
                  <p className="text-dark-600 text-sm mb-6 flex-grow">{resource.description}</p>
                  
                  {user ? (
                    <DownloadButton 
                      resourceId={resource.id}
                      resourceTitle={resource.title}
                      className="flex items-center justify-center gap-2 bg-dark-900 hover:bg-dark-800 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      <Download size={18} />
                      Download
                    </DownloadButton>
                  ) : (
                    <Link 
                      href="/sign-up"
                      className="flex items-center justify-center gap-2 bg-dark-900 hover:bg-dark-800 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      <Lock size={18} />
                      Sign Up to Download
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-beige-200 p-12 text-center">
              <FileText className="text-beige-300 mx-auto mb-4" size={48} />
              <p className="text-dark-500">No free resources available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Premium Resources */}
      <section className="py-16 lg:py-24 bg-beige-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="font-display text-2xl lg:text-3xl text-dark-900 mb-4">
              Premium Resources
            </h2>
            <p className="text-dark-600">
              In-depth guides and comprehensive templates for serious retailers.
            </p>
          </div>

          {paidResources.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paidResources.map((resource) => (
                <div 
                  key={resource.id}
                  className="bg-white rounded-lg border border-beige-200 p-6 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-bronze-400" size={24} />
                    </div>
                    {resource.is_popular && (
                      <span className="bg-bronze-100 text-bronze-600 text-xs font-medium px-3 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-display text-lg text-dark-900 mb-2">{resource.title}</h3>
                  <p className="text-dark-600 text-sm mb-4 flex-grow">{resource.description}</p>
                  
                  <div className="mb-6">
                    <span className="font-display text-2xl text-dark-900">£{resource.price}</span>
                  </div>
                  
                  {user ? (
                    <CheckoutButton
                      type="resource"
                      itemId={resource.id}
                      itemName={resource.title}
                      price={resource.price}
                      className="flex items-center justify-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white py-3 rounded-lg font-medium transition-colors"
                    >
                      Purchase
                    </CheckoutButton>
                  ) : (
                    <Link 
                      href="/sign-up"
                      className="flex items-center justify-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white py-3 rounded-lg font-medium transition-colors text-center"
                    >
                      Sign Up to Purchase
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-beige-200 p-12 text-center">
              <BookOpen className="text-beige-300 mx-auto mb-4" size={48} />
              <p className="text-dark-500">No premium resources available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Resources CTA */}
      <section className="py-16 lg:py-24 bg-dark-900">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl lg:text-3xl text-beige-50 mb-6">
            Need something specific?
          </h2>
          <p className="text-beige-300 mb-8">
            We can create custom templates, training materials, or operational guides tailored to your business.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center gap-2 btn-primary"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}