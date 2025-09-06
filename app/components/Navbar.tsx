'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-transparent backdrop-blur-md shadow-sm transition-all duration-300">
      <div className={`mx-auto transition-all duration-300 ${
        isScrolled 
          ? 'mx-8 mt-4 rounded-2xl bg-white/80 px-12' 
          : 'mx-0 mt-0 rounded-none bg-white/80 px-12 sm:px-16 lg:px-24'
      }`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex-shrink-0 focus:outline-none rounded-md transition-transform duration-200 hover:scale-105"
            >
              <Image
                src="/logo.svg"
                alt="Designiga Logo"
                width={150}
                height={150}
                className="w-30 h-30"
              />
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-200 focus:outline-none rounded-md"
              >
                Projects
              </a>
              <a
                href="/about"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-200 focus:outline-none rounded-md"
              >
                About
              </a>
              <a
                href="https://wa.me/917019310914"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white hover:bg-gray-800 px-3 py-2 text-base font-medium transition-colors duration-200 focus:outline-none rounded-md flex items-center gap-2"
              >
                <Image
                  src="/whatsapp-icon.svg"
                  alt="WhatsApp"
                  width={16}
                  height={16}
                  className="w-4 h-4 filter brightness-0 invert"
                />
                Contact
              </a>
            </div>
          </div>

          {/* Mobile menu button and contact */}
          <div className="md:hidden flex items-center gap-2">
            {/* WhatsApp Contact Button */}
            <a
              href="https://wa.me/917019310914"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-md bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-colors duration-200"
            >
              <Image
                src="/whatsapp-icon.svg"
                alt="WhatsApp Contact"
                width={20}
                height={20}
                className="w-5 h-5 filter brightness-0 invert"
              />
            </a>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-lg font-medium transition-colors duration-200 focus:outline-none rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="/about"
            className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-lg font-medium transition-colors duration-200 focus:outline-none rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
        </div>
      </div>
    </nav>
  )
}
