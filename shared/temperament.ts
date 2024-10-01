const basicKeys: (keyof BasicInotonationSequence)[] = ["A", "B", "C", "D", "E", "F", "G"]
const inotonations: (keyof Inotonation)[] = ["Just", "Equal"]
const allKeys: ((keyof BasicInotonationSequence) | string)[] = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
var baseFreq = 220
export enum Key {
    "A" = 0, "A#" = 1, "Bb" = 1, "B" = 2, "C" = 3, "C#" = 4, "Db" = 4, "D" = 5, "D#" = 6, "Eb" = 6, "E" = 7, "F" = 8, "F#" = 9, "Gb" = 9, "G" = 10, "G#" = 11, "Ab" = 11
}
export var baseKey = Key.A
var dependedKey: keyof BasicInotonationSequence = "A"
var offsetRatio = 1

type Inotonation = {
    Just: FreqBlock,
    Equal: FreqBlock
}

interface Ins { [Key: number]: number; }

type FreqBlock = {
    basic: BasicInotonationSequence,
    basicFreqs?: BasicFreqs
    intervals: Interval,
}

type Interval = {
    ins: Ins,
    detect: boolean,
    seqs: number[]
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

type BasicFreqs = { A: number, B: number, C: number, D: number, E: number, F: number, G: number }

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
                1: 16/15,       // minor second
                2: 9/8,         // major second
                3: 6/5,         // minor third
                4: 5/4,         // major third
                5: 4/3,         // perfect forth
                7: 3/2,         // perfect fifth
            },
            detect: true,
            seqs: [7, 5, 4, 3, 2, 1]
        }
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
            ins: { 1: Math.pow(2, 1/12) },
            detect: false,
            seqs: [1]
        }
    }
}

const freqs = (tones: [string]): number[] => {
    var res: number[] = []
    // for (const t in tones) {
    //     const key = t.slice(0, -1)
    //     if (key in just) {
    //         // 全音

    //     }
    // }
    return []
}

const getKeyTransferRatio = (key: Key, freqs: BasicFreqs, intervals: Interval): number => {

    if (allKeys[key] in freqs) {
        




    } else {
        if (intervals.detect) {
            if (key in intervals.ins) {
                return intervals.ins[key]
            } else {
                return 0
            }
        } else {
            return Math.pow(intervals.ins[1], key)
        }
    }
}

export const minCombination = (candidates: number[], target: number): number[] => {
    const ans: number[][] = []
    var t = 5
    var smallest = candidates.length
    const dfs = (target: number, combine: number[], idx: number) => {
        if (t === 0) return
        if (idx === candidates.length) return
        if (target === 0) {
            t--
            if (combine.length < smallest) smallest = combine.length
            ans.push(combine)
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
    return ans.filter(a => a.length === smallest).sort((a, b) => b[0] - a[0])[0]
}

export const updateBasicInotonations = (key: Key): void => {
    if (baseKey === key || baseKey === null) return
    var ratio: number
    var offset: number
    if (allKeys[key] in inotons.Just.basic) {
        const k = allKeys[key] as keyof BasicInotonationSequence
        ratio = getBasicRatioOfKey(inotons.Just.basic, k) / (getBasicRatioOfKey(inotons.Just.basic, dependedKey) * offsetRatio)
        dependedKey = k
        offsetRatio = 1
        // offset = key -
    } else {
        const gap = key - Key[dependedKey]
        const combs = minCombination(inotons.Just.intervals.seqs, gap)
        var ratio = 1
        for (const r of combs) {
            ratio *= inotons.Just.intervals.ins[r]
        }
        offsetRatio = ratio
        ratio /= offsetRatio
    }   



    baseKey = key
}

export const init = (): void => {
    var basicFs: BasicFreqs[] = []
    for (const name of inotonations) {
        basicFs.push({A: baseFreq, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0})
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
}

const getBasicRatioOfKey = (freqRatios: BasicInotonationSequence, target: keyof BasicInotonationSequence): number => {
    var basedKey = target
    var ratio = 1
    while(true) {
        const curSeq = freqRatios[basedKey]
        basedKey = curSeq[0]
        if (basedKey === basicKeys[0]) break
        ratio *= curSeq[1]
    }
    return ratio
}