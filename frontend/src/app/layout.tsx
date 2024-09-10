

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './component/sidebar'
import { SessionProvider } from '@/app/component/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Login from '@/app/component/Login'
import ClientProvider from './component/ClientProvider'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chat NestAI',
  description: 'Create by sohail',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  // console.log(session)
  return (
    <html lang="en">
      <body className={inter.className} >
        
        <SessionProvider session={session}>
        {!session ?(
         <Login/>
        ):(
         
        <div className='flex'>
          <div className='bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[08rem] lg:max-w'>
            <Sidebar/>
          </div>

          <ClientProvider/>

          <div className='flex-1 bg-[#343541]'>
            {children}
          </div>
        </div>
        )}
        </SessionProvider>
      </body>
    </html>
  )
}
