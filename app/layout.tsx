import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ProjectProvider } from './contexts/ProjectContext'

const lato = Lato({ 
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato'
})

export const metadata: Metadata = {
  title: 'Designiga',
  description: 'A Next.js application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lato.variable} font-lato min-h-screen flex flex-col`}>
        <ProjectProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </ProjectProvider>
      </body>
    </html>
  )
}
