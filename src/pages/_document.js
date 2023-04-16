import { Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'
import Image from 'next/image'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-neutral-100 py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div>
              <Link
                className="my-1 mr-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
                href="/">
                <Image
                  className="mr-2"
                  src="/todoIcon.png"
                  height={10}
                  width={100}
                  alt=""
                />
                <span className="font-medium dark:text-neutral-200">Todo App</span>
              </Link>
            </div>
            <div className='flex'>
              <div className='mr-2'>
                <Link href="/users/login">Login</Link>
              </div>
              <Link href="/users/register">Register</Link>
            </div>
          </div>
        </nav>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
