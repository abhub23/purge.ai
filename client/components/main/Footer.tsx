'use client';

import Link from 'next/link';
import { GithubIcon, LinkedinIcon, MailIcon, XIcon } from './logos';
import Image from 'next/image';

const ScrollY = () => {
  const scrollTarget = window.innerWidth > 1500 ? 460 : 200;
  window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
};

const Footer = () => {

  return (
    <footer className='bg-background border-t'>
      <div className='px-4 py-8 lg:py-8 lg:h-72'>
        <div className='grid gap-8 lg:mx-auto lg:max-w-[1200px] lg:w-full lg:flex lg:justify-between'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Image src={'/purgeailogo.webp'} alt='footer' height={30} width={30} />
              <span className='text-lg font-bold'>PurgeAI</span>
            </div>
            <p className='text-muted-foreground max-w-xs text-sm'>
              Building the future of AI driven PR Merges with modern tools and beautiful design.
            </p>
            <div className='flex h-5 w-5 space-x-4'>
              <Link
                href='https://github.com/abhub23/purge.ai'
                className='text-muted-foreground hover:text-foreground/85 transition-colors'
                target='_blank'
              >
              <GithubIcon className='size-5' />
              </Link>
              <Link
                href='https://x.com/abdullah_twt23'
                className='text-muted-foreground hover:text-foreground/85 transition-colors'
                target='_blank'
              >
              <XIcon className='size-5' />
              </Link>
              <Link
                href='https://www.linkedin.com/in/abdullah-mukri-84a56b220/'
                className='text-muted-foreground hover:text-foreground/85 transition-colors'
                target='_blank'
              >
              <LinkedinIcon className='size-5' />
              </Link>
              <Link
                href='https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com'
                className='text-muted-foreground hover:text-foreground/85 transition-colors'
                target='_blank'
              >
              <MailIcon className='size-5' />
              </Link>
            </div>
          </div>

          <div className='flex flex-col gap-8 lg:flex-row lg:gap-16'>
            {/* Product Links */}
            <div className='space-y-4'>
              <h3 className='font-semibold'>Product</h3>
              <ul className='space-y-3 text-sm'>
                <li>
                  <Link
                    href='/pricing'
                    className='text-muted-foreground hover:text-foreground/85 transition-colors'
                  >
                    Pricing
                  </Link>
                </li>
                <li
                  className='text-muted-foreground hover:text-foreground/85 cursor-pointer transition-colors'
                  onClick={() => window.open('https://abdullahtech.dev', '_blank')}
                >
                  Developer/Creator
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-muted-foreground hover:text-foreground/85 transition-colors'
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className='space-y-4'>
              <h3 className='font-semibold'>Resources</h3>
              <ul className='space-y-3 text-sm'>
                <li
                  className='text-muted-foreground hover:text-foreground/85 transition-colors hover:cursor-pointer'
                  onClick={ScrollY}
                >
                  Tutorial
                </li>
                <li>
                  <Link
                    href='https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com&su=PurgeAI%20Support%20Team'
                    className='text-muted-foreground hover:text-foreground/85 transition-colors'
                    target='_blank'
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com&su=PurgeAI%20Contact'
                    target='_blank'
                    className='text-muted-foreground hover:text-foreground/85 transition-colors'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className='text-muted-foreground flex h-18 items-center justify-center border-t pb-2 lg:pb-0 text-[12px] lg:h-16 lg:text-[14px]'>
        © 2025 PurgeAI. All rights reserved.
        <Link href={'/t&c'} className='hover:text-foreground/75 ml-2 underline transition-colors'>
          Terms & Conditions{' '}
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
