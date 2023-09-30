import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {ClerkProvider} from "@clerk/nextjs"
import Topbar from '@/components/shared/topbar'
import LeftSidebar from '@/components/shared/leftsidebar'
import RightSidebar from '@/components/shared/rightsidebar'
import Bottombar from '@/components/shared/bottombar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Threads',
  description: 'Next.js Threads Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

            <main className="flex flex-row">
              <LeftSidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">
                  {children}
                </div>
              </section>
              <RightSidebar />
            </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>
  )
}
