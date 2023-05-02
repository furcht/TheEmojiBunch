import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';
import '@/styles/reset.scss';
import '@/styles/global.scss';
import '@/styles/title.element.scss';
import '@/styles/tag.element.scss';
import '@/styles/selector.element.scss';
import '@/styles/loading.component.scss';
import '@/styles/emojiGroups.component.scss';
import '@/styles/emojiFilter.component.scss';
import '@/styles/emojiTiles.component.scss';
import '@/styles/viewPort.component.scss';
import '@/styles/menuBar.component.scss';

import { Rubik } from 'next/font/google';
const rubik = Rubik({
  weight: ['300', '600'],
  style: ['normal'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${rubik.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>The Emoji Bunch</title>
        <meta name="description" content="Explore and build your emoji library for your app or copy an emoji into your clipboard." />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}
