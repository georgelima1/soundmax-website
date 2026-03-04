"use client";

import { useEffect, useMemo, useState } from "react";

import ptMessages from "@/messages/pt.json";
import enMessages from "@/messages/en.json";

type Locale = "pt" | "en";
type Mode = "consumidor" | "instalador";
type AmpKey = "k6" | "k9" | "k25" | "k50";

const SIZES_MM2 = [2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];

const AMP_PRESETS: Record<AmpKey, { name: string; pmax: number; breaker: [number, number] }> = {
    k6: { name: "K6", pmax: 6000, breaker: [32, 16] },
    k9: { name: "K9", pmax: 9000, breaker: [40, 25] },
    k25: { name: "K25", pmax: 25000, breaker: [100, 63] },
    k50: { name: "K50", pmax: 50000, breaker: [125, 100] },
};

function parseAmpKeyFromSlug(raw: string | null | undefined): AmpKey {
    const v = (raw || "").toLowerCase().trim();
    if (v.startsWith("k6")) return "k6";
    if (v.startsWith("k9")) return "k9";
    if (v.startsWith("k25")) return "k25";
    if (v.startsWith("k50")) return "k50";
    return "k25";
}

function pickSize(mm2Needed: number) {
    for (const s of SIZES_MM2) if (s >= mm2Needed) return s;
    return SIZES_MM2[SIZES_MM2.length - 1];
}

/**
 * MODO B — Cabo curto / musical (calibrado para ficar próximo do manual em 220V, FP=1, η=0,94)
 */
function cableShortMusicalMono(I: number) {
    const aPerMm2 = I >= 95 ? 7 : I >= 47 ? 5 : 3;
    return pickSize(I / aPerMm2);
}
function cableShortMusicalTri(Iphase: number) {
    const aPerMm2 = Iphase >= 50 ? 9 : 3;
    return pickSize(Iphase / aPerMm2);
}

function fmt(x: number) {
    return Number.isFinite(x) ? x.toFixed(2) : "—";
}

function KV({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-xs text-white/70">{label}</div>
            <div className="font-mono text-lg">{value}</div>
        </div>
    );
}

export default function CalculatorWidget({
    locale,
    initialAmpSlug,
}: {
    locale: Locale;
    initialAmpSlug?: string | null;
}) {
    const messages = locale === "en" ? enMessages : ptMessages;
    const t = (messages as any).calculatorWidget;

    const initialAmpKey = useMemo<AmpKey>(() => parseAmpKeyFromSlug(initialAmpSlug), [initialAmpSlug]);

    const [mode, setMode] = useState<Mode>("consumidor");
    const [musicPctStr, setMusicPctStr] = useState("0.40");

    // inputs
    const [pout, setPout] = useState(0);
    const [eff, setEff] = useState(0.94);
    const [v1, setV1] = useState(220);
    const [vll, setVll] = useState(220);

    // instalador
    const [pf, setPf] = useState(1.0);
    const [ampModel, setAmpModel] = useState<AmpKey>(initialAmpKey);
    const [pmax, setPmax] = useState(AMP_PRESETS[initialAmpKey].pmax);

    // gerador
    const [genPf, setGenPf] = useState(0.8);
    const [headroom, setHeadroom] = useState(1.2);

    useEffect(() => {
        setAmpModel(initialAmpKey);
        setPmax(AMP_PRESETS[initialAmpKey].pmax);
    }, [initialAmpKey]);

    useEffect(() => {
        setPmax(AMP_PRESETS[ampModel].pmax);
    }, [ampModel]);

    const breakerPreset = AMP_PRESETS[ampModel].breaker;

    const res = useMemo(() => {
        const musicPct = parseFloat(musicPctStr);
        const pfUsed = mode === "instalador" ? pf : 1.0;

        const ok =
            pout >= 0 &&
            eff > 0 &&
            v1 > 0 &&
            vll > 0 &&
            pfUsed > 0 &&
            musicPct > 0 &&
            genPf > 0 &&
            headroom > 0 &&
            pmax > 0;

        if (!ok) return null;

        // pela potência em uso
        const Pin = pout / eff;
        const I1 = Pin / (v1 * pfUsed);
        const I3 = Pin / (Math.sqrt(3) * vll * pfUsed);

        const I1Music = I1 * musicPct;
        const I3Music = I3 * musicPct;

        const I1_30 = I1 * 0.3;
        const I1_60 = I1 * 0.6;
        const I3_30 = I3 * 0.3;
        const I3_60 = I3 * 0.6;

        // gerador
        const kvaTotal = (Pin / (1000 * genPf)) * headroom;
        const kvaMusic = kvaTotal * musicPct;
        const kva30 = kvaTotal * 0.3;
        const kva60 = kvaTotal * 0.6;

        // instalador (pela potência máxima do amp)
        const PinMax = pmax / eff;
        const I1Max = PinMax / (v1 * pfUsed);
        const I3Max = PinMax / (Math.sqrt(3) * vll * pfUsed);

        const I1Avg = I1Max * musicPct;
        const I3Avg = I3Max * musicPct;

        return {
            I1,
            I3,
            I1Music,
            I3Music,
            I1_30,
            I1_60,
            I3_30,
            I3_60,

            kvaTotal,
            kvaMusic,
            kva30,
            kva60,

            I1Avg,
            I3Avg,
            monoCableAvg: cableShortMusicalMono(I1Avg),
            triCableAvg: cableShortMusicalTri(I3Avg),

            monoBreakerManual: breakerPreset[0],
            triBreakerManual: breakerPreset[1],
        };
    }, [mode, musicPctStr, pout, eff, v1, vll, pf, genPf, headroom, pmax, breakerPreset]);

    return (
        <div className="card p-6">
            <div className="grid md:grid-cols-2 gap-6">
                {/* INPUTS */}
                <div className="space-y-4">
                    <div>
                        <div className="text-sm font-semibold">{t.inputsTitle}</div>
                        <div className="text-white/70 text-sm mt-1">{t.inputsSubtitle}</div>
                    </div>

                    <div>
                        <label className="block text-xs text-white/70 mb-1">{t.poutLabel}</label>
                        <input
                            value={pout}
                            onChange={(e) => setPout(parseFloat(e.target.value || "0"))}
                            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-white/70 mb-1">{t.modeLabel}</label>
                            <select
                                value={mode}
                                onChange={(e) => setMode(e.target.value as Mode)}
                                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                            >
                                <option value="consumidor">{t.modeCustomer}</option>
                                <option value="instalador">{t.modeInstaller}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs text-white/70 mb-1">{t.musicPctLabel}</label>
                            <select
                                value={musicPctStr}
                                onChange={(e) => setMusicPctStr(e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                            >
                                <option value="0.30">{t.musicPct30}</option>
                                <option value="0.40">{t.musicPct40}</option>
                                <option value="0.50">{t.musicPct50}</option>
                                <option value="0.60">{t.musicPct60}</option>
                            </select>
                        </div>
                    </div>

                    {/* eficiência + tensões */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-white/70 mb-1">{t.v1Label}</label>
                            <input
                                type="number"
                                value={v1}
                                onChange={(e) => setV1(parseFloat(e.target.value || "0"))}
                                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <label className="block text-xs text-white/70 mb-1">{t.vllLabel}</label>
                            <input
                                type="number"
                                value={vll}
                                onChange={(e) => setVll(parseFloat(e.target.value || "0"))}
                                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-white/70 mb-1">{t.effLabel}</label>
                            <input
                                type="number"
                                step="0.001"
                                value={eff}
                                onChange={(e) => setEff(parseFloat(e.target.value || "0"))}
                                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                            />

                        </div>
                        <div className="hidden sm:block" />
                    </div>

                    {mode === "instalador" && (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-white/70 mb-1">{t.pfLabel}</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={pf}
                                        onChange={(e) => setPf(parseFloat(e.target.value || "1"))}
                                        className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                                    />
                                </div>
                                <div className="text-xs text-white/70 flex items-end">{t.pfHint}</div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-white/70 mb-1">{t.ampLabel}</label>
                                        <select
                                            value={ampModel}
                                            onChange={(e) => setAmpModel(e.target.value as AmpKey)}
                                            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/30"
                                        >
                                            <option value="k6">K6</option>
                                            <option value="k9">K9</option>
                                            <option value="k25">K25</option>
                                            <option value="k50">K50</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-white/70 mb-1">{t.pmaxLabel}</label>
                                        <input
                                            type="number"
                                            value={pmax}
                                            onChange={(e) => setPmax(parseFloat(e.target.value || "0"))}
                                            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/30"
                                        />
                                    </div>
                                </div>

                                <div className="text-xs text-white/70 mt-3">{t.installerNote}</div>
                            </div>
                        </>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-white/70 mb-1">{t.genPfLabel}</label>
                            <input
                                type="number"
                                step="0.01"
                                value={genPf}
                                onChange={(e) => setGenPf(parseFloat(e.target.value || "0.8"))}
                                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-white/70 mb-1">{t.headroomLabel}</label>
                            <input
                                type="number"
                                step="0.01"
                                value={headroom}
                                onChange={(e) => setHeadroom(parseFloat(e.target.value || "1.2"))}
                                className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                            />
                        </div>
                    </div>
                </div>

                {/* OUTPUTS */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-sm font-semibold">{t.musicTitle}</div>
                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                            <KV label={t.musicMono} value={res ? `${fmt(res.I1Music)} A` : "—"} />
                            <KV label={t.musicTri} value={res ? `${fmt(res.I3Music)} A/fase` : "—"} />
                            <KV label={t.rangeMono} value={res ? `${fmt(res.I1_30)} a ${fmt(res.I1_60)} A` : "—"} />
                            <KV label={t.rangeTri} value={res ? `${fmt(res.I3_30)} a ${fmt(res.I3_60)} A/fase` : "—"} />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-sm font-semibold">{t.contTitle}</div>
                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                            <KV label={t.contMono} value={res ? `${fmt(res.I1)} A` : "—"} />
                            <KV label={t.contTri} value={res ? `${fmt(res.I3)} A/fase` : "—"} />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="text-sm font-semibold">{t.genTitle}</div>
                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                            <KV label={t.genMusic} value={res ? `${fmt(res.kvaMusic)} kVA` : "—"} />
                            <KV label={t.genMax} value={res ? `${fmt(res.kvaTotal)} kVA` : "—"} />
                            <KV label={t.genInterval} value={res ? `${fmt(res.kvaMusic)} → ${fmt(res.kvaTotal)} kVA` : "—"} />
                            <KV label={t.genRange} value={res ? `${fmt(res.kva30)} a ${fmt(res.kva60)} kVA` : "—"} />
                        </div>
                    </div>

                    {mode === "instalador" && (
                        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                            <div className="text-sm font-semibold">{t.instTitle}</div>

                            <div className="grid sm:grid-cols-2 gap-3 mt-3">
                                <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                                    <div className="text-xs text-white/70 font-semibold">{t.instMono}</div>
                                    <div className="mt-2 space-y-2">
                                        <KV label={t.instAvgCurrent} value={res ? `${fmt(res.I1Avg)} A` : "—"} />
                                        <KV label={t.instBreaker} value={res ? `${res.monoBreakerManual} A` : "—"} />
                                        <KV label={t.instCable} value={res ? `${res.monoCableAvg} mm²` : "—"} />
                                    </div>
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                                    <div className="text-xs text-white/70 font-semibold">{t.instTri}</div>
                                    <div className="mt-2 space-y-2">
                                        <KV label={t.instAvgCurrent} value={res ? `${fmt(res.I3Avg)} A/fase` : "—"} />
                                        <KV label={t.instBreaker} value={res ? `${res.triBreakerManual} A` : "—"} />
                                        <KV label={t.instCable} value={res ? `${res.triCableAvg} mm²` : "—"} />
                                    </div>
                                </div>
                            </div>

                            <div className="text-xs text-white/70 mt-3">{t.instFootnote}</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}