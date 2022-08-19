import "../styles/global.scss";

import Navbar from "../components/navbar";

export default function({ Component, pageProps }) {
    return (
        <>
            <Navbar />
            <Component {...pageProps} />
        </>
    )
}