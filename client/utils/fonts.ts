import { Bricolage_Grotesque, Host_Grotesk } from 'next/font/google';

const Bricolage_font = Bricolage_Grotesque({
  subsets: ['latin'],
});

const Host_Grotesk_font = Host_Grotesk({
  subsets: ['latin'],
});

export const Bricolage = Bricolage_font.className;
export const HostGrotesk = Host_Grotesk_font.className;
