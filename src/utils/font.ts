import { Roboto, Rubik } from 'next/font/google';

// for heading
export const rubik_init = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-rubik',
});

// for paragraph
export const roboto_init = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
  variable: '--font-roboto',
});

export const roboto = roboto_init.variable;
export const rubik = rubik_init.variable;
