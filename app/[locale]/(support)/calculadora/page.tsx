"use client";

import { useSearchParams } from "next/navigation";
import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";
import CalculatorWidget from "@/components/calculatorWidget";

type Locale = "pt" | "en";

export default function CalculadoraPage({ params }: { params: { locale: Locale } }) {
    const locale: Locale = params.locale === "en" ? "en" : "pt";
    const messages = locale === "en" ? enMessages : ptMessages;

    const sp = useSearchParams();
    const amp = sp.get("amp"); // k6.0 / k9.0 / k25.0 / k50.0

    const t = (messages as any).calculatorPage;

    return (
        <section className="container-wrap section">
            <header>
                <h1 className="section-title">{t?.title ?? "Calculadora"}</h1>
                <p className="section-sub !max-w-full">{t?.subtitle ?? ""}</p>
            </header>
            <div className="mt-8">
                <CalculatorWidget locale={locale} initialAmpSlug={amp} />
            </div>
        </section>
    );
}