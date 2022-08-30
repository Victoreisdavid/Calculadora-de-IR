import Head from "next/head";
import style from "../styles/home.module.scss";
import calculator from "../utils/ir_calculator";
import { useEffect } from "react";

export default function Main() {
    useEffect(() => {
        const button = document.querySelector("button")

        button.addEventListener("click", () => {
            const salario = Math.max(0, document.querySelector("#salario")?.value || 0)
            const dependentes = document.querySelector("#dependentes")?.value || 0

            if(isNaN(salario)) {
                return alert("Valor de salário inválido")
            }
            if(isNaN(dependentes)) {
                return alert("Valor de dependentes inválido")
            }

            const imposto = Math.max(0, calculator.calcIR(salario, dependentes))
            const oliquota = calculator.calcAliquota(salario).aliquota
            const taxa = calculator.calcTaxa(salario)
            const desconto_dependentes = 189.59 * dependentes

            document.querySelector("#result").textContent = `R$ ${imposto.toFixed(2)}`
            document.querySelector("#oliquot").textContent = `${(oliquota * 100).toFixed(2)}%`
            document.querySelector("#tax").textContent = `R$ ${taxa.toFixed(2)}`  
            document.querySelector("#desconto").textContent = `R$ ${desconto_dependentes.toFixed(2)}`
        })
    }, [])

    return (
        <>
            <Head>
                <title>Calculadora de IRRF</title>
                <meta name="description" content="Calculadora de imposto de renda, rápido e fácil." />
            </Head>
            <div id={style.content}>
                <h1>Calculo de IRRF</h1> <br />
                <div className={style.container}>
                    <input type="text" id="salario" />
                    <div className={style.placeholder}>Salário</div>
                </div>
                <div className={style.container}>
                    <input type="text" id="dependentes" />
                    <div className={style.placeholder}>Dependentes</div>
                </div> <br />
                <button>Calcular</button>
                <div id={style.results}>
                    <br />
                    <h1>Resultados</h1>
                    <p>Oliquota: <strong><span id="oliquot" /></strong></p>
                    <p>Taxa: <strong><span id="tax" /></strong></p>
                    <p>Desconto por dependentes: <strong><span id="desconto" /></strong></p>
                    <p><strong>Imposto a ser pago: <span id="result" /></strong></p>
                </div>
            </div>
        </>
    )
}