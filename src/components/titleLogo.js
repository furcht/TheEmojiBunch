import localFont from 'next/font/local'
const brady = localFont({ src: '../../public/brady.woff' })

export default function TitleLogo() {
    return (
        <h1 className={`e-title ${brady.className}`}>
            <span>The</span>
            <span>EmoJi</span>
            <span>Bunch</span>
        </h1>
    )
}