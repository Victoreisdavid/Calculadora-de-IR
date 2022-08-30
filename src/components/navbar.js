import style from "../styles/navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav id={style.navbar}>
            <Link href="https://imposto-de-renda.vercel.app/"><a target="_blank">Como calcular</a></Link>
        </nav>
    )
}