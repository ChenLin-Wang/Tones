const basicKeys: (keyof BasicInotonationSequence)[] = ["A", "B", "C", "D", "E", "F", "G"]
const inotonations: (keyof Inotonation)[] = ["Just", "Equal"]
export const allKeys: ((keyof BasicInotonationSequence) | string)[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
const octaves = [3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4]
var baseFreq = 220
export enum Key {
    "A" = 0, "A#" = 1, "Bb" = 1, "B" = 2, "C" = 3, "C#" = 4, "Db" = 4, "D" = 5, "D#" = 6, "Eb" = 6, "E" = 7, "F" = 8, "F#" = 9, "Gb" = 9, "G" = 10, "G#" = 11, "Ab" = 11
}
export var baseKey = Key.A

type Inotonation = {
    Just: FreqBlock,
    Equal: FreqBlock
}

interface Ins { [Key: number]: number; }

type FreqBlock = {
    basic: BasicInotonationSequence,
    basicFreqs?: BasicFreqs,
    intervals: Interval,
    dependedKey: keyof BasicInotonationSequence,
    offsetRatio: number,
}

type Interval = {
    ins: Ins,
    detect: boolean,
    seqs: number[],
    keyShiftSeqs: number[]
}

type BasicInotonationSequence = {
    A: [keyof BasicInotonationSequence, number],
    B: [keyof BasicInotonationSequence, number],
    C: [keyof BasicInotonationSequence, number],
    D: [keyof BasicInotonationSequence, number],
    E: [keyof BasicInotonationSequence, number],
    F: [keyof BasicInotonationSequence, number],
    G: [keyof BasicInotonationSequence, number],
}

type BasicFreqs = {
    A: number, B: number, C: number, D: number, E: number, F: number, G: number
}

type FreqEcof = [keyof BasicInotonationSequence, number]

const inotons: Inotonation = {
    Just: {
        basic: {
            A: ["A", 1],
            B: ["A", 1.125],
            C: ["A", 1.2],
            D: ["C", 9 / 8],
            E: ["C", 5 / 4],
            F: ["C", 4 / 3],
            G: ["C", 3 / 2],
        },
        intervals: {
            ins: {
                1: 16 / 15,       // minor second
                2: 9 / 8,         // major second
                3: 6 / 5,         // minor third
                4: 5 / 4,         // major third
                5: 4 / 3,         // perfect forth
                7: 3 / 2,         // perfect fifth
            },
            detect: true,
            seqs: [1, 2, 7, 5, 4, 3],
            keyShiftSeqs: [1, 2, 4, 3, 5, 7]
        },
        dependedKey: "A",
        offsetRatio: 1
    },
    Equal: {
        basic: {
            A: ["A", 1],
            B: ["A", Math.pow(2, 1 / 12)],
            C: ["A", Math.pow(2, 3 / 12)],
            D: ["C", Math.pow(2, 2 / 12)],
            E: ["C", Math.pow(2, 4 / 12)],
            F: ["C", Math.pow(2, 5 / 12)],
            G: ["C", Math.pow(2, 7 / 12)],
        },
        intervals: {
            ins: { 1: Math.pow(2, 1 / 12) },
            detect: false,
            seqs: [1],
            keyShiftSeqs: [1]
        },
        dependedKey: "A",
        offsetRatio: 1
    }
}

export const freqs = (tones: string[]): number[][] => {
    var res: number[][] = []
    var basicTones: number[] = []
    var semiTones: ({ oct: number, flap: boolean, tone: number } | null)[] = []
    for (const t of tones) {
        const tempK = t.slice(0, -1)
        const { flap, key } = toneShift(tempK)
        const octaveGap = Math.pow(2, parseInt(t[t.length - 1]) - octaves[Key[tempK as keyof typeof Key]])
        console.log(`${t.slice(0, -1)}, ${flap}, ${allKeys[key]}, ${Math.pow(2, parseInt(t[t.length - 1]) - octaves[Key[tempK as keyof typeof Key]])}`)
        if (basicKeys.includes(allKeys[key] as keyof BasicInotonationSequence)) {
            basicTones.push(key)
            var ts: number[] = []
            for (const inotName of inotonations) {
                if (!inotons[inotName].basicFreqs) return []
                const t = inotons[inotName].basicFreqs[allKeys[key] as keyof BasicFreqs]
                ts.push((flap ? t / 2 : t) * octaveGap)
            }
            res.push(ts)
            semiTones.push(null)
        } else {
            semiTones.push({ oct: octaveGap, flap: flap, tone: key })
            res.push([])
        }
    }

    for (const i in semiTones) {
        if (!semiTones[i]) continue
        const { oct, flap, tone: s } = semiTones[i]
        var ts: number[] = []
        for (const inoName of inotonations) {
            const inot = inotons[inoName]
            if (inot.intervals.detect) {
                var fitGap: number | null = null
                var fitTone: Key | null = null
                var gapI: number | null = null
                var minGap: number | null = null
                var minGapTone: Key | null = null
                for (const b of basicTones) {
                    const gap = s - b
                    if (minGap === null || minGap > gap) {
                        minGap = gap
                        minGapTone = b
                    }
                    for (var istr in (inot.intervals.seqs as number[])) {
                        const i = parseInt(istr)
                        const curI = inot.intervals.seqs[i]
                        if (gapI !== null && gapI === i) break
                        if (gap === (gap > 0 ? curI : - curI)) {
                            fitGap = gap
                            fitTone = b
                            gapI = i
                            break
                        }
                    }
                }
                if (fitGap && fitTone && inot.basicFreqs) {
                    ts.push(inot.basicFreqs[allKeys[fitTone] as keyof BasicFreqs] * (fitGap > 0 ? inot.intervals.ins[fitGap] : 1 / inot.intervals.ins[-fitGap]) / (flap ? 2 : 1) * oct)
                } else if (minGap && minGapTone && inot.basicFreqs) {
                    var freq = inot.basicFreqs[allKeys[minGapTone] as keyof BasicFreqs]
                    for (const i of minCombination(inot.intervals.seqs, Math.abs(minGap))) {
                        freq *= minGap > 0 ? inot.intervals.ins[i] : 1 / inot.intervals.ins[i]
                    }
                    ts.push(freq / (flap ? 2 : 1) * oct)
                }
            } else {
                if (inot.basicFreqs) {
                    ts.push(inot.intervals.ins[1] * inot.basicFreqs[allKeys[s - 1] as keyof BasicFreqs] / (flap ? 2 : 1) * oct)
                }
            }
        }
        res[i] = (ts)
    }
    return res
}

export const toneShift = (tone: string): { flap: boolean, key: Key } => {
    const key = tone as keyof typeof Key
    const gap = Key[key] - baseKey
    console.log(allKeys[baseKey])
    return gap >= 0 ? { flap: false, key: gap } : { flap: true, key: 12 + gap }
}

export const minCombination = (candidates: number[], target: number): number[] => {
    var ans: number[][] = []
    const f: number[][] = []
    const s: number[][] = []
    var t = 5
    var smallest: number | null = null
    const dfs = (target: number, combine: number[], idx: number) => {
        if (t === 0) return
        if (idx === candidates.length) return
        if (target === 0) {
            t--
            if (smallest === null) smallest = combine.length
            else if (combine.length < smallest) smallest = combine.length
            if (combine.includes(1)) f.push(combine)
            else if (combine.includes(2)) s.push(combine)
            else ans.push(combine)
            return
        }
        // 直接跳过
        dfs(target, combine, idx + 1)
        // 选择当前数
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [candidates[idx], ...combine], idx)
        }
    }
    dfs(target, [], 0)
    ans = ans.length > 0 ? ans : s.length > 0 ? s : f
    console.log(ans)
    return ans.filter(a => a.length === smallest).sort((a, b) => b[0] - a[0])[0]
}

export const updateBasicInotonations = (key: Key): void => {
    console.log(`to ${allKeys[key]}`)
    if (baseKey === key || baseKey === null) return
    for (const i of inotonations) {
        const ino = inotons[i]
        var ratio: number

        if (allKeys[key] in ino.basic) {
            const k = allKeys[key] as keyof BasicInotonationSequence
            ratio = getBasicRatioOfKey(ino.basic, k) / (getBasicRatioOfKey(ino.basic, ino.dependedKey) * ino.offsetRatio)
            // console.log(`dependedkey: ${dependedKey}`)
            ino.dependedKey = k
            ino.offsetRatio = 1
        } else {
            const gap = key - Key[ino.dependedKey]
            var old: number
            if (ino.intervals.detect) {
                const combs = minCombination(ino.intervals.keyShiftSeqs, Math.abs(gap))
                // console.log(`comb: ${combs} ${ino.intervals.seqs}--${Math.abs(gap)}`)
                ratio = 1
                for (const r of combs) {
                    ratio = gap > 0 ?
                        (r > 0 ? (ratio * ino.intervals.ins[r]) : (ratio / ino.intervals.ins[r])) :
                        (r > 0 ? (ratio / ino.intervals.ins[r]) : (ratio * ino.intervals.ins[r]))
                }
                old = ratio
                // console.log(`ratio: ${ratio} ${offsetRatio}`)
            } else {
                ratio = Math.pow(ino.intervals.ins[1], gap)
                old = ratio
            }
            ratio /= ino.offsetRatio
            ino.offsetRatio = old
        }
        if (ino.basicFreqs) {
            for (const i in basicKeys) {
                ino.basicFreqs[basicKeys[i]] *= ratio
            }
        }
    }
    // console.log(inotons)
    baseKey = key
}

export const init = (): void => {
    baseKey = Key.A
    var basicFs: BasicFreqs[] = []
    for (const name of inotonations) {
        inotons[name].dependedKey = "A"
        inotons[name].offsetRatio = 1
        basicFs.push({ A: baseFreq, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 })
    }
    for (const key of basicKeys) {
        if (key === "A") continue
        for (const i in inotonations) {
            const freqEcof = inotons[inotonations[i]].basic[key]
            basicFs[i][key] = basicFs[i][freqEcof[0]] * freqEcof[1]
        }
    }
    for (const i in basicFs) {
        inotons[inotonations[i]].basicFreqs = basicFs[i]
    }
    console.log(inotons)
}

const getBasicRatioOfKey = (freqRatios: BasicInotonationSequence, target: keyof BasicInotonationSequence): number => {
    var basedKey = target
    var ratio = 1
    while (true) {
        const curSeq = freqRatios[basedKey]
        basedKey = curSeq[0]
        ratio *= curSeq[1]
        if (basedKey === basicKeys[0]) break
    }
    // console.log(`${target} ${ratio}`)
    return ratio
}