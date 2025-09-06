'use client'

import { useState } from 'react'

export default function About() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "What information do you need from clients to start a logo design project?",
      answer: "To create the perfect logo for your brand, I need to understand your business vision, target audience, brand personality, and any specific requirements you have. This includes your company name, industry, preferred colors, style preferences, and any existing brand guidelines. I also like to know about your competitors and what makes your business unique. The more context you provide, the better I can craft a logo that truly represents your brand."
    },
    {
      question: "What is your design process for logo creation?",
      answer: "My design process follows a structured approach: 1) Discovery & Research - I analyze your brand, industry, and competitors. 2) Concept Development - I create multiple initial concepts and sketches. 3) Design & Refinement - I develop the strongest concepts digitally and refine them based on your feedback. 4) Finalization - I provide you with the final logo in various formats (PNG, SVG, EPS) and color variations. 5) Brand Guidelines - I deliver a comprehensive style guide for consistent brand usage."
    },
    {
      question: "How many revisions are included in your logo design package?",
      answer: "I include up to 3 rounds of revisions in my standard logo design package. This ensures we can refine the design to perfectly match your vision while keeping the project timeline manageable. Each revision round includes feedback incorporation and design adjustments. If you need additional revisions beyond the included ones, we can discuss options for extended revision rounds."
    },
    {
      question: "What file formats will I receive with my final logo?",
      answer: "You'll receive your logo in multiple formats to ensure versatility across all applications: Vector formats (SVG, EPS, AI) for scalability, high-resolution PNG files with transparent backgrounds, JPG files for web use, and PDF files for print applications. I also provide different color variations including full color, black, white, and any specific color combinations you need for your brand."
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-12 sm:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Crafting Visual Identities That Tell Your Story
          </h1>
          <div className="prose prose-lg max-w-3xl mx-auto text-gray-600 leading-relaxed">
            <p className="mb-6">
              As a passionate logo designer based in Bengaluru, I specialize in creating clean, thoughtful visual identities that help businesses make a lasting impression. With over 5 years of experience in brand design, I understand that a logo is more than just a pretty picture—it&apos;s the foundation of your brand&apos;s visual language.
            </p>
            <p className="mb-6">
              My approach combines strategic thinking with creative execution. I dive deep into understanding your business, your values, and your target audience to create logos that not only look great but also communicate your brand&apos;s essence effectively. Whether you&apos;re a startup looking to establish your presence or an established company ready for a refresh, I&apos;m here to help you stand out in today&apos;s competitive market.
            </p>
            <p>
              Every project is a collaboration. I believe in working closely with my clients throughout the design process, ensuring that the final result not only meets but exceeds your expectations. Let&apos;s work together to create a visual identity that truly represents who you are and where you&apos;re going.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-12 sm:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      openFAQ === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
