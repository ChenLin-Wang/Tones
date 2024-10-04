const basicKeys: (keyof BasicInotonationSequence)[] = ["A", "B", "C", "D", "E", "F", "G"]
export const inotonations: (keyof Inotonation)[] = ["Just", "Equal"]
export const allKeys: ((keyof BasicInotonationSequence) | string)[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
var relativeKeys = allKeys
const octaves = [3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4]
var relativeOctaves = octaves
var baseFreq = 220
export enum Key {
    "A" = 0, "A#" = 1, "Bb" = 1, "B" = 2, "C" = 3, "C#" = 4, "Db" = 4, "D" = 5, "D#" = 6, "Eb" = 6, "E" = 7, "F" = 8, "F#" = 9, "Gb" = 9, "G" = 10, "G#" = 11, "Ab" = 11
}
export var baseKey = Key.A

export type Inotonation = {
    Just: FreqBlock,
    Equal: FreqBlock
}

interface Ins { [Key: number]: number; }
interface InsDescription { [Key: number]: {name: string, relation: string}; }

type FreqBlock = {
    basic: BasicInotonationSequence,
    basicFreqs?: BasicFreqs,
    intervals: Interval,
    dependedKey: keyof BasicInotonationSequence,
    offsetRatio: number,
}

type Interval = {
    ins: Ins,
    insDescriptions: InsDescription,
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
                5: 4 / 3,         // perfect fourth
                6: 45 / 32,       // augmented fourth
                7: 3 / 2,         // perfect fifth
            },
            insDescriptions: {
                1: {name: "Minor-2", relation: "16/15"},
                2: {name: "Major-2", relation: "9/8"},
                3: {name: "Minor-3", relation: "6/5"},
                4: {name: "Major-3", relation: "5/4"},
                5: {name: "Perfect-4", relation: "4/3"},
                6: {name: "Augmented-4", relation: "45/32"},
                7: {name: "Perfect-5", relation: "3/2"},
            },
            detect: true,
            seqs: [1, 2, 6, 7, 5, 4, 3],
            keyShiftSeqs: [1, 2, 4, 3, 5, 6, 7]
        },
        dependedKey: "A",
        offsetRatio: 1
    },
    Equal: {
        basic: {
            A: ["A", 1],
            B: ["A", Math.pow(2, 2 / 12)],
            C: ["A", Math.pow(2, 3 / 12)],
            D: ["C", Math.pow(2, 2 / 12)],
            E: ["C", Math.pow(2, 4 / 12)],
            F: ["C", Math.pow(2, 5 / 12)],
            G: ["C", Math.pow(2, 7 / 12)],
        },
        intervals: {
            ins: { 1: Math.pow(2, 1 / 12) },
            insDescriptions: {1: {name: "Minor-2", relation: "2^(1/12)"}},
            detect: false,
            seqs: [1],
            keyShiftSeqs: [1]
        },
        dependedKey: "A",
        offsetRatio: 1
    }
}

export const isSemiTone = (tone: string) => tone.length < 2 ? false : "#b".includes(tone[1])
export const toMinor = (key: Key): Key => (key - 3) % 12
export const toMajor = (key: Key): Key => (key + 3) % 12
 
export const relativeNote = (note: string, withOctave: boolean = true): string => {
    if (!withOctave) return relativeKeys[Key[note as keyof typeof Key]]
    var oct = parseInt(note[note.length - 1])
    const name = note.slice(0, -1)
    const k = Key[name as keyof typeof Key]
    const rK = relativeKeys[k]
    const rO = relativeOctaves[k]
    const aO = octaves[k]
    oct -= (aO - rO)
    return `${rK}${oct}`
}

export const absoluteNote = (note: string): string => {
    var oct = parseInt(note[note.length - 1])
    const name = note.slice(0, -1)
    const k = relativeKeys.indexOf(name)
    const rK = allKeys[k]
    const rO = octaves[k]
    const aO = relativeOctaves[k]
    oct -= (aO - rO)
    return `${rK}${oct}`
}

// transfer the tone from piano absolute tone to key based
const toneShift = (tone: string, bk: Key = baseKey, goMajor: boolean = false): { flap: boolean, key: Key } => {
    const key = tone as keyof typeof Key
    const gap = Key[key] - bk - (goMajor ? 3 : 0)
    // console.log(`gap: ${gap}`)
    return gap >= 0 ? { flap: false, key: gap } : { flap: true, key: 12 + gap }
}

export const inotonationInit = (): void => {
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
    // console.log(inotons)
}

export const getFreqs = (tones: string[]): {fs: number[], rels: ({based: string, r: string[]})[]}[] => {
    var res: {fs: number[], rels: {based: string, r: string[]}[]}[] = []
    var basicTones: { oct: number, flap: boolean, tone: number }[] = []
    var semiTones: ({ oct: number, flap: boolean, tone: number } | null)[] = []
    for (const t of tones) {
        const tempK = t.slice(0, -1)
        const { flap, key } = toneShift(tempK)
        const nOct = parseInt(t[t.length - 1])
        const oOct = octaves[Key[tempK as keyof typeof Key]]
        const octDistance = nOct - oOct
        console.log("key: " + allKeys[key])
        // console.log(`${t.slice(0, -1)}, ${flap}, ${allKeys[key]}, ${Math.pow(2, parseInt(t[t.length - 1]) - octaves[Key[tempK as keyof typeof Key]])}`)
        if (basicKeys.includes(allKeys[key] as keyof BasicInotonationSequence)) {
            var ts: number[] = []
            for (const inotName of inotonations) {
                if (!inotons[inotName].basicFreqs) return []
                const t = inotons[inotName].basicFreqs[allKeys[key] as keyof BasicFreqs]
                ts.push((flap ? t / 2 : t) * Math.pow(2, octDistance))
                // console.log(inotonations)
            }
            basicTones.push({oct: octDistance, flap: flap, tone: key})
            res.push({fs: ts, rels: []})
        } else {
            semiTones.push({ oct: octDistance, flap: flap, tone: key })
            res.push({fs: [], rels: []})
        }
    }
    // console.log("basics")
    // console.log(basicTones)

    for (const i in semiTones) {
        if (!semiTones[i]) continue
        const { oct, flap, tone: s } = semiTones[i]
        var ts: number[] = []
        var rels: {based: string, r: string[]}[] = []
        for (const inoName of inotonations) {
            const inot = inotons[inoName]
            const bFs = inot.basicFreqs as BasicFreqs
            if (inot.intervals.detect) {
                var gapI: number | null = null
                var fitGap: number | null = null
                var fitTone: Key = Key.A
                var fit_transUp: boolean | null = null
                var maxGap: number | null = null
                var maxGapTone = Key.A
                var maxGap_transUp: boolean | null = null
                var curTransUp: boolean | null = null
                for (const { oct: basOct, flap: basFlap, tone: b } of basicTones) {
                    const octTransGap = oct - basOct
                    if (Math.abs(octTransGap) >= 2) continue
                    var gap: number
                    if (octTransGap > 0) { gap = s - b + 12; curTransUp = false }
                    else if (octTransGap < 0) { gap = b + 12 - s; curTransUp = true}
                    else { gap = s - b; curTransUp = null }
                    if (maxGap === null || maxGap > gap) {
                        maxGap = gap
                        maxGapTone = b
                        maxGap_transUp = curTransUp
                    }
                    for (var istr in (inot.intervals.seqs as number[])) {
                        const i = parseInt(istr)
                        const curI = inot.intervals.seqs[i]
                        if (gapI !== null && gapI === i) break
                        if (gap === (gap > 0 ? curI : - curI)) {
                            fitGap = gap
                            fitTone = b
                            fit_transUp = curTransUp
                            gapI = i
                            break
                        }
                    }
                }
                console.log("-------------")
                console.log(`fitGap: ${fitGap}, fitTone: ${fitTone}, fitTransUp: ${fit_transUp}`)
                console.log(`maxGap: ${maxGap}, maxGapTone: ${maxGapTone}, maxGapTransUp: ${maxGap_transUp}`)
                console.log("-------------")
                if (fitGap) {
                    // console.log(fit_transUp)
                    const bf = bFs[allKeys[fitTone] as keyof BasicFreqs] / (flap ? 2 : 1) * Math.pow(2, oct)
                    const delta = (fitGap > 0 ? inot.intervals.ins[fitGap] : 1 / inot.intervals.ins[-fitGap])
                    ts.push( fit_transUp === null ? bf * delta : fit_transUp ? (bf * 2 / delta) : (bf / 2 * delta) )
                    const des = inot.intervals.insDescriptions[Math.abs(fitGap)]
                    rels.push({based: allKeys[fitTone], r: [des.name + "(" + des.relation + ")"]})
                } else if (maxGap) {
                    var delta = 1
                    var des: string[] = []
                    for (const i of minCombination(inot.intervals.seqs, Math.abs(maxGap))) {
                        delta *= maxGap > 0 ? inot.intervals.ins[i] : 1 / inot.intervals.ins[i]
                        const d = inot.intervals.insDescriptions[i]
                        des.push(d.name + "(" + d.relation + ")")
                    }
                    const bf = bFs[allKeys[maxGapTone] as keyof BasicFreqs]  / (flap ? 2 : 1) * Math.pow(2, oct)
                    ts.push( maxGap_transUp === null ? bf * delta : maxGap_transUp ? (bf * 2 / delta) : (bf / 2 * delta) )
                    rels.push({based: allKeys[maxGapTone], r: des})
                } else {
                    ts.push(inot.intervals.ins[1] * bFs[allKeys[s - 1] as keyof BasicFreqs] / (flap ? 2 : 1) * Math.pow(2, oct))
                    const des = inot.intervals.insDescriptions[1]
                    rels.push({based: allKeys[s - 1], r: [des.name + "(" + des.relation + ")"]})
                }
            } else {
                ts.push(inot.intervals.ins[1] * bFs[allKeys[s - 1] as keyof BasicFreqs] / (flap ? 2 : 1) * Math.pow(2, oct))
                const des = inot.intervals.insDescriptions[1]
                rels.push({based: allKeys[s - 1], r: [des.name + "(" + des.relation + ")"]})
            }
        }
        res[i] = {fs: ts, rels: rels}
    }
    return res
}

export const keyShift = (key: Key): void => {
    // console.log(`to ${allKeys[key]}`)
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

    const noChangeKeys = allKeys.slice(0, 12 - key)
    const changingKeys = allKeys.slice(12 - key)
    var octs = octaves.slice(0, 12 - key)
    const tempOct: number[] = []
    for (var i = 0; i < key; i++) tempOct.push(3)
    relativeOctaves = tempOct.concat(octs)
    relativeKeys = changingKeys.concat(noChangeKeys)
    baseKey = key
}

const minCombination = (candidates: number[], target: number): number[] => {
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
        dfs(target, combine, idx + 1)
        if (target - candidates[idx] >= 0) {
            dfs(target - candidates[idx], [candidates[idx], ...combine], idx)
        }
    }
    dfs(target, [], 0)
    ans = ans.length > 0 ? ans : s.length > 0 ? s : f
    // console.log(ans)
    return ans.filter(a => a.length === smallest).slice().sort((a, b) => b[0] - a[0])[0]
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