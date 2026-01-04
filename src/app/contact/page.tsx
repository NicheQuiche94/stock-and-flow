'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 bg-dark-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-bronze-400 font-medium mb-4">Get in Touch</p>
            <h1 className="font-display text-4xl lg:text-5xl text-beige-50 leading-tight mb-6">
              Let us talk about <em className="text-bronze-400">your</em> shop
            </h1>
            <p className="text-lg text-beige-300 leading-relaxed">
              Whether you are ready to work together or just want to pick our brains, 
              we would love to hear from you. No hard sell, just honest conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-beige-100 border-b border-beige-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-beige-200">
              <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center">
                <Mail className="text-bronze-400" size={24} />
              </div>
              <div>
                <p className="font-medium text-dark-900">Email</p>
                <p className="text-bronze-400">hello@stockandflow.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-beige-200">
              <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center">
                <Phone className="text-bronze-400" size={24} />
              </div>
              <div>
                <p className="font-medium text-dark-900">Phone</p>
                <p className="text-bronze-400">+44 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg border border-beige-200">
              <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center">
                <MapPin className="text-bronze-400" size={24} />
              </div>
              <div>
                <p className="font-medium text-dark-900">Location</p>
                <p className="text-bronze-400">United Kingdom</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-24 bg-beige-50">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-lg border border-beige-200 p-8 lg:p-12">
            <h2 className="font-display text-2xl text-dark-900 mb-2">Send us a message</h2>
            <p className="text-dark-600 mb-8">
              Tell us a bit about your shop and what you would like to discuss. We will get back to you within 24 hours.
            </p>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-bronze-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-bronze-400" size={32} />
                </div>
                <h3 className="font-display text-2xl text-dark-900 mb-2">Message sent</h3>
                <p className="text-dark-600 mb-6">Thanks for reaching out. We will be in touch soon.</p>
                <button
                  onClick={() => {
                    setIsSubmitted(false)
                    setName('')
                    setEmail('')
                    setBusiness('')
                    setMessage('')
                  }}
                  className="text-bronze-400 font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Your name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900 placeholder-dark-400"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900 placeholder-dark-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">Your business</label>
                  <input
                    type="text"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900 placeholder-dark-400"
                    placeholder="Shop name and location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900 placeholder-dark-400 resize-none"
                    placeholder="Tell us about your shop and what you would like to discuss..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white px-8 py-4 rounded-lg font-medium transition-colors w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 bg-beige-100">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <h2 className="font-display text-3xl text-dark-900 mb-12 text-center">
            What to expect
          </h2>
          <div className="space-y-8">
            {[
              { title: 'A real conversation', desc: 'Not a sales pitch. We will listen to your challenges and share honest thoughts on how we might help.' },
              { title: 'No obligation', desc: 'Our initial conversations are always free. If we are not the right fit, we will tell you and try to point you in a better direction.' },
              { title: 'Quick response', desc: 'We aim to respond to all enquiries within 24 hours on working days.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 bg-bronze-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-display text-lg text-dark-900 mb-1">{item.title}</h3>
                  <p className="text-dark-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}