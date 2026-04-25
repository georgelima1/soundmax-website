'use client';

import { useEffect, useMemo, useState } from 'react';

import ptMessages from '@/messages/pt.json';
import enMessages from '@/messages/en.json';

type Locale = 'pt' | 'en';
type Mode = 'consumidor' | 'instalador';
type AmpKey = 'k6' | 'k9' | 'k25' | 'k50';
type AmpSelection = AmpKey | '';

const SIZES_MM2 = [2.5, 4, 6, 10, 16, 25, 35, 50, 70, 95, 120, 150, 185, 240];

const AMP_PRESETS: Record<
  AmpKey,
  { name: string; pmax: number; breaker: [number, number] }
> = {
  k6: { name: 'K6', pmax: 6000, breaker: [32, 16] },
  k9: { name: 'K9', pmax: 9000, breaker: [40, 25] },
  k25: { name: 'K25', pmax: 25000, breaker: [100, 63] },
  k50: { name: 'K50', pmax: 50000, breaker: [125, 100] }
};

function parseAmpKeyFromSlug(raw: string | null | undefined): AmpSelection {
  const v = (raw || '').toLowerCase().trim();
  if (v.startsWith('k6')) return 'k6';
  if (v.startsWith('k9')) return 'k9';
  if (v.startsWith('k25')) return 'k25';
  if (v.startsWith('k50')) return 'k50';
  return '';
}

function pickSize(mm2Needed: number) {
  for (const s of SIZES_MM2) if (s >= mm2Needed) return s;
  return SIZES_MM2[SIZES_MM2.length - 1];
}

function normalizeExpression(input: string) {
  return input
    .toLowerCase()
    .replace(/,/g, '.')
    .replace(/×/g, '*')
    .replace(/x/g, '*')
    .replace(/\s+/g, '');
}

function evaluateExpression(input: string): number | null {
  const expr = normalizeExpression(input);

  if (!expr) return 0;

  // só permite números, operadores e parênteses
  if (!/^[0-9+\-*/().]+$/.test(expr)) return null;

  try {
    const tokens = expr.match(/(\d+(\.\d+)?)|[()+\-*/]/g);
    if (!tokens) return null;

    const output: string[] = [];
    const ops: string[] = [];
    const prec: Record<string, number> = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };

    for (const token of tokens) {
      if (/^\d+(\.\d+)?$/.test(token)) {
        output.push(token);
      } else if (token in prec) {
        while (
          ops.length &&
          ops[ops.length - 1] in prec &&
          prec[ops[ops.length - 1]] >= prec[token]
        ) {
          output.push(ops.pop()!);
        }
        ops.push(token);
      } else if (token === '(') {
        ops.push(token);
      } else if (token === ')') {
        while (ops.length && ops[ops.length - 1] !== '(') {
          output.push(ops.pop()!);
        }
        if (!ops.length) return null;
        ops.pop();
      }
    }

    while (ops.length) {
      const op = ops.pop()!;
      if (op === '(' || op === ')') return null;
      output.push(op);
    }

    const stack: number[] = [];

    for (const token of output) {
      if (/^\d+(\.\d+)?$/.test(token)) {
        stack.push(Number(token));
      } else {
        const b = stack.pop();
        const a = stack.pop();
        if (a == null || b == null) return null;

        switch (token) {
          case '+':
            stack.push(a + b);
            break;
          case '-':
            stack.push(a - b);
            break;
          case '*':
            stack.push(a * b);
            break;
          case '/':
            if (b === 0) return null;
            stack.push(a / b);
            break;
          default:
            return null;
        }
      }
    }

    if (stack.length !== 1) return null;

    const result = stack[0];
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
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
  return Number.isFinite(x) ? x.toFixed(2) : '—';
}

function KVCompact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] text-white/60">{label}</div>
      <div className="font-mono text-sm text-white/85">{value}</div>
    </div>
  );
}

function KVHighlight({
  label,
  value,
  badge,
}: {
  label: string;
  value: string;
  badge?: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs text-white/70 font-semibold">{label}</div>
        {badge ? (
          <span className="text-[11px] px-2 py-0.5 rounded-full border border-white/10 bg-black/30 text-white/70">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-1 font-mono text-2xl leading-tight tracking-tight">
        {value}
      </div>
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
  const messages = locale === 'en' ? enMessages : ptMessages;
  const t = (messages as any).calculatorWidget;

  const initialAmpKey = useMemo<AmpSelection>(
    () => parseAmpKeyFromSlug(initialAmpSlug),
    [initialAmpSlug]
  );

  const [mode, setMode] = useState<Mode>('consumidor');
  const [musicPctStr, setMusicPctStr] = useState('0.40');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // inputs
  const [pout, setPout] = useState('');
  const [eff, setEff] = useState(0.94);
  const [v1, setV1] = useState(220);
  const [vll, setVll] = useState(220);

  // instalador
  const [pf, setPf] = useState(1.0);
  const [ampModel, setAmpModel] = useState<AmpSelection>(initialAmpKey);
  const [pmax, setPmax] = useState(
    initialAmpKey ? AMP_PRESETS[initialAmpKey].pmax : 0
  );

  // gerador
  const [genPf, setGenPf] = useState(0.8);
  const [headroom, setHeadroom] = useState(1.2);

  useEffect(() => {
    setAmpModel(initialAmpKey);
    setPmax(initialAmpKey ? AMP_PRESETS[initialAmpKey].pmax : 0);
  }, [initialAmpKey]);

  useEffect(() => {
    setPmax(ampModel ? AMP_PRESETS[ampModel].pmax : 0);
  }, [ampModel]);

  useEffect(() => {
    if (mode !== 'instalador') {
      setShowAdvanced(false);
    }
  }, [mode]);

  const preset = ampModel ? AMP_PRESETS[ampModel] : null;

  const res = useMemo(() => {
    const musicPct = parseFloat(musicPctStr);
    const pfUsed = mode === 'instalador' ? pf : 1.0;
    const poutCalculated = evaluateExpression(pout);

    const ok =
      poutCalculated !== null &&
      poutCalculated >= 0 &&
      eff > 0 &&
      v1 > 0 &&
      vll > 0 &&
      pfUsed > 0 &&
      musicPct > 0 &&
      genPf > 0 &&
      headroom > 0;

    if (!ok) return null;

    // pela potência em uso
    const Pin = poutCalculated / eff;
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
    const hasAmpPreset = !!preset && pmax > 0;

    const PinMax = hasAmpPreset ? pmax / eff : 0;
    const I1Max = hasAmpPreset ? PinMax / (v1 * pfUsed) : 0;
    const I3Max = hasAmpPreset ? PinMax / (Math.sqrt(3) * vll * pfUsed) : 0;

    const I1Avg = hasAmpPreset ? I1Max * musicPct : null;
    const I3Avg = hasAmpPreset ? I3Max * musicPct : null;

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
      monoCableAvg: I1Avg !== null ? cableShortMusicalMono(I1Avg) : null,
      triCableAvg: I3Avg !== null ? cableShortMusicalTri(I3Avg) : null,

      monoBreakerManual: preset?.breaker[0] ?? null,
      triBreakerManual: preset?.breaker[1] ?? null,
    };
  }, [
    mode,
    musicPctStr,
    pout,
    eff,
    v1,
    vll,
    pf,
    genPf,
    headroom,
    pmax,
    preset,
  ]);

  return (
    <div className="card p-6">
      <div className="mb-4">
        <label className="block text-xs text-white/70 mb-1">
          {t.modeLabel}
        </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
          className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
        >
          <option value="consumidor">{t.modeCustomer}</option>
          <option value="instalador">{t.modeInstaller}</option>
        </select>
      </div>

      {/* INPUTS */}
      <div className="space-y-4 mb-4">
        <div>
          <div className="text-sm font-semibold">{t.inputsTitle}</div>
          <div className="text-white/70 text-sm mt-1">{t.inputsSubtitle}</div>
        </div>

        <div>
          <label className="block text-xs text-white/70 mb-1">
            {t.poutLabel}
          </label>
          <input
            value={pout}
            onChange={(e) => setPout(e.target.value)}
            placeholder="Ex.: 4x1500+8x400+16x100"
            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
          />
          <div className="mt-1 text-xs text-white/50">
            {pout
              ? evaluateExpression(pout) !== null
                ? `= ${evaluateExpression(pout)} W RMS`
                : 'Expressão inválida'
              : t.poutHint}
          </div>
        </div>
        <div>
          <label className="block text-xs text-white/70 mb-1">
            {t.musicPctLabel}
          </label>
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

        {mode === 'instalador' && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="text-xs text-white/50 hover:text-white/80 underline underline-offset-4 w-fit flex justify-end"
            >
              {showAdvanced ? t.showLess : t.showMore}
            </button>
          </div>
        )}

        {mode === 'instalador' && showAdvanced && (
          <div className="rounded-2xl border border-white/10 bg-black/10 p-4 space-y-4">
            <div className="text-xs font-semibold text-white/60 uppercase tracking-[0.16em]">
              {t.advancedTitle}
            </div>

            {/* tensões */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {t.v1Label}
                </label>
                <input
                  type="number"
                  value={v1}
                  onChange={(e) => setV1(parseFloat(e.target.value || '0'))}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {t.vllLabel}
                </label>
                <input
                  type="number"
                  value={vll}
                  onChange={(e) => setVll(parseFloat(e.target.value || '0'))}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                />
              </div>
            </div>

            {/* eficiência */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {t.effLabel}
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={eff}
                  onChange={(e) => setEff(parseFloat(e.target.value || '0'))}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                />
              </div>

              {mode === 'instalador' && (
                <div>
                  <label className="block text-xs text-white/70 mb-1">
                    {t.pfLabel}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={pf}
                    onChange={(e) => setPf(parseFloat(e.target.value || '1'))}
                    className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                  />
                  <div className="mt-1 text-xs text-white/40">{t.pfHint}</div>
                </div>
              )}
            </div>

            {/* gerador */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {t.genPfLabel}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={genPf}
                  onChange={(e) =>
                    setGenPf(parseFloat(e.target.value || '0.8'))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                />
              </div>

              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {t.headroomLabel}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={headroom}
                  onChange={(e) =>
                    setHeadroom(parseFloat(e.target.value || '1.2'))
                  }
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/20"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OUTPUTS */}
      <div className="space-y-4">
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-sm font-semibold">{t.genTitle}</div>

          {/* Destaques */}
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <KVHighlight
              label={t.genMusic} // "Gerador sugerido (mínimo)" ou equivalente
              value={res ? `${fmt(res.kvaMusic)} kVA` : '—'}
              badge={t?.highlightBadgeMin ?? 'MÍNIMO'}
            />
            <KVHighlight
              label={t.genInterval}
              value={
                res ? `${fmt(res.kvaMusic)} → ${fmt(res.kvaTotal)} kVA` : '—'
              }
              badge={t?.highlightBadgeRange ?? 'INTERVALO'}
            />
          </div>

          {/* Menos destaque */}
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <KVCompact
              label={t.genMax}
              value={res ? `${fmt(res.kvaTotal)} kVA` : '—'}
            />
            <KVCompact
              label={t.genRange}
              value={res ? `${fmt(res.kva30)} a ${fmt(res.kva60)} kVA` : '—'}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="text-sm font-semibold">{t.musicTitle}</div>

          {/* Destaques */}
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <KVHighlight
              label={t.musicMono}
              value={res ? `${fmt(res.I1Music)} A` : '—'}
              badge={t?.highlightBadgeMusic ?? 'MÉDIO'}
            />
            <KVHighlight
              label={t.musicTri}
              value={res ? `${fmt(res.I3Music)} A/fase` : '—'}
              badge={t?.highlightBadgeMusic ?? 'MÉDIO'}
            />
          </div>

          {/* Menos destaque */}
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <KVCompact
              label={t.rangeMono}
              value={res ? `${fmt(res.I1_30)} a ${fmt(res.I1_60)} A` : '—'}
            />
            <KVCompact
              label={t.rangeTri}
              value={res ? `${fmt(res.I3_30)} a ${fmt(res.I3_60)} A/fase` : '—'}
            />
          </div>
          <div className="text-sm font-semibold mt-3">{t.contTitle}</div>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <KVCompact
                label={t.contMono}
                value={res ? `${fmt(res.I1)} A` : '—'}
              />
              <KVCompact
                label={t.contTri}
                value={res ? `${fmt(res.I3)} A/fase` : '—'}
              />
            </div>
          </div>
        </div>

        {mode === 'instalador' && (
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="text-sm font-semibold">{t.instTitle}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-xs text-white/70 mb-1">
                  {t.ampLabel}
                </label>
                <select
                  value={ampModel}
                  onChange={(e) => setAmpModel(e.target.value as AmpSelection)}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 bg-black/30"
                >
                  <option value="" disabled>
                    {t.selectAmpPlaceholder}
                  </option>
                  <option value="k6">K6</option>
                  <option value="k9">K9</option>
                  <option value="k25">K25</option>
                  <option value="k50">K50</option>
                </select>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="text-xs text-white/70 font-semibold">
                  {t.instMono}
                </div>
                <div className="mt-2 space-y-2">
                  <KVCompact
                    label={t.instAvgCurrent}
                    value={res?.I1Avg !== null && res?.I1Avg !== undefined ? `${fmt(res.I1Avg)} A` : '—'}
                  />
                  <KVCompact
                    label={t.instBreaker}
                    value={
                      res?.monoBreakerManual
                        ? `${res.monoBreakerManual} A`
                        : '—'
                    }
                  />
                  <KVCompact
                    label={t.instCable}
                    value={res?.monoCableAvg ? `${res.monoCableAvg} mm²` : '—'}
                  />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                <div className="text-xs text-white/70 font-semibold">
                  {t.instTri}
                </div>
                <div className="mt-2 space-y-2">
                  <KVCompact
                    label={t.instAvgCurrent}
                    value={res?.I3Avg !== null && res?.I3Avg !== undefined ? `${fmt(res.I3Avg)} A/fase` : '—'}
                  />
                  <KVCompact
                    label={t.instBreaker}
                    value={res ? `${res.triBreakerManual} A` : '—'}
                  />
                  <KVCompact
                    label={t.instCable}
                    value={res?.triCableAvg ? `${res.triCableAvg} mm²` : '—'}
                  />
                </div>
              </div>
            </div>

            <div className="text-xs text-white/70 mt-3">{t.instFootnote}</div>
          </div>
        )}
      </div>
    </div>
  );
}
