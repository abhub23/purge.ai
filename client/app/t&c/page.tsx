'use client';

import { HostGrotesk } from '@/utils/fonts';
import { motion } from 'motion/react';
import { Animation, Transition } from '@/animations/Animation';
import { cn } from '@/lib/utils';
import Footer from '@/components/main/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const sections = [
  {
    number: '01',
    label: 'Acceptance',
    points: [
      'By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement.',
      'The use of this website is subject to the following terms of use which you acknowledge and accept by browsing this site.',
    ],
  },
  {
    number: '02',
    label: 'Content & Usage',
    points: [
      'The content of the pages of this website is for your general information and use only. It is subject to change without notice.',
      'This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics.',
      'Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.',
    ],
  },
  {
    number: '03',
    label: 'Liability & Warranties',
    points: [
      'Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website.',
      'Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable.',
      'The service is provided without any warranties, express or implied. We are not responsible for any damages, including data loss, service interruptions, or inaccurate results arising from your use of the service.',
    ],
  },
  {
    number: '04',
    label: 'Third-Party Links',
    points: [
      'From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information.',
    ],
  },
  {
    number: '05',
    label: 'Availability & Changes',
    points: [
      'We aim to maintain a 99.9% uptime but do not guarantee uninterrupted or error-free service. We may perform maintenance or experience outages that affect availability. Additionally, we reserve the right to modify, remove, or discontinue features or services at any time, with or without notice.',
    ],
  },
];

export default function Terms() {
  return (
    <section className={cn('bg-background text-foreground', HostGrotesk)}>
      <div className="mx-auto flex w-full max-w-4xl flex-col px-6 py-20 lg:py-28">
        {/* Badge & Hero */}
        <motion.div {...Animation} transition={Transition(0.15)} className="text-center">
          <span className="mb-6 inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // Terms & Conditions
          </span>

          <motion.h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Terms, decoded.
            <br />
            <span className="text-muted-foreground">Legalese, purged.</span>
          </motion.h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-2xl font-mono text-xs uppercase tracking-widest">
            tldr — don't abuse the service, uptime isn't guaranteed, third-party links are on you.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="mt-16 w-full">
          {sections.map((section, idx) => (
            <motion.div
              key={section.number}
              {...Animation}
              transition={Transition(0.2 + idx * 0.06)}
              className="group grid gap-3 border-t border-border/40 py-8 sm:grid-cols-[180px_1fr] sm:gap-8 lg:gap-16"
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                {section.number} / {section.label}
              </div>
              <ul className="space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-muted-foreground lg:text-base">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          <div className="border-t border-border/40" />
        </div>

        {/* CTA */}
        <motion.div
          {...Animation}
          transition={Transition(0.5)}
          className="mt-20 flex flex-col items-center gap-6 text-center"
        >
          <span className="inline-block font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // Questions?
          </span>
          <h2 className="text-2xl font-bold tracking-tight lg:text-3xl">
            The docs are clear, but our inbox is open.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:text-base">
            If any of these terms feel unclear, or you just want to talk shop, reach out.
          </p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row">
            <Button
              variant='outline'
              size='lg'
              className='cursor-pointer rounded-4xl lg:h-12 lg:px-6 lg:text-lg'
              asChild
            >
              <Link
                href='https://mail.google.com/mail/?view=cm&to=abdullahmukri25@gmail.com&su=PurgeAI%20Support%20Team'
                target='_blank'
              >
                Contact Support
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </section>
  );
}
