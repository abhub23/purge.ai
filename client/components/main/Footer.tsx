'use client';

import Link from 'next/link';
import { GithubIcon, LinkedinIcon, MailIcon, XIcon } from './logos';
import Image from 'next/image';
import VideoDialog from './VideoDialog';

const Footer = () => {
  return (
    <footer className='rounded-t-3xl border-t border-white/10 bg-[#141413] text-[#f7f7f7]'>
      <div className='px-4 pt-10 pb-12 lg:h-84 lg:pt-10 lg:pb-8'>
        <div className='grid gap-8 lg:mx-auto lg:flex lg:w-full lg:max-w-300 lg:justify-between'>
          {/* Brand Section */}
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <Image src={'/purgeailogo.webp'} alt='footer' height={30} width={30} />
              <span className='text-lg font-bold'>PurgeAI</span>
            </div>
            <p className='max-w-xs text-sm text-[#a1a1a1] lg:text-base'>
              Building the future of AI driven PR Merges with modern tools and beautiful design.
            </p>
            <div className='flex h-5 w-5 space-x-4'>
              <Link
                href='https://github.com/abhub23/purge.ai'
                className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                target='_blank'
              >
                <GithubIcon className='size-5' />
              </Link>
              <Link
                href='https://x.com/abdullah_twt23'
                className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                target='_blank'
              >
                <XIcon className='size-5' />
              </Link>
              <Link
                href='https://www.linkedin.com/in/abdullah-mukri-84a56b220/'
                className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                target='_blank'
              >
                <LinkedinIcon className='size-5' />
              </Link>
              <Link
                href='https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com'
                className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
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
                    className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                  >
                    Pricing
                  </Link>
                </li>
                <li
                  className='cursor-pointer text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                  onClick={() => window.open('https://abdullahtech.dev', '_blank')}
                >
                  Developer/Creator
                </li>
                <li>
                  <Link
                    href='/about'
                    className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
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
                <li>
                  <VideoDialog
                    trigger={
                      <button
                        type='button'
                        className='cursor-pointer text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                      >
                        Tutorial
                      </button>
                    }
                  />
                </li>
                <li>
                  <Link
                    href='https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com&su=PurgeAI%20Support%20Team'
                    className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                    target='_blank'
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href='https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com&su=PurgeAI%20Contact'
                    target='_blank'
                    className='text-[#a1a1a1] transition-colors hover:text-[#f7f7f7]/85'
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <p className='mx-auto flex h-20 w-full max-w-300 items-center justify-center pb-2 text-[12px] text-[#a1a1a1] lg:h-20 lg:justify-start lg:pb-0 lg:text-[14px]'>
        © 2025 PurgeAI. All rights reserved.
        <Link href={'/t&c'} className='ml-2 underline transition-colors hover:text-[#f7f7f7]/75'>
          Terms & Conditions{' '}
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
