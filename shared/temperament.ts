const basicKeys: (keyof BasicInotonationSequence)[] = ["A", "B", "C", "D", "E", "F", "G"]
const inotonations: (keyof Inotonation)[] = ["Just", "Equal"]
var baseFreq = 440

enum Key {
    "A", "A#", "Bb", "B", "C", "C#", "Db", "D", "D#", "Eb", "E", "F", "F#", "Gb", "G", "G#", "Ab"
}

type Inotonation = {
    Just: FreqBlock,
    Equal: FreqBlock
}

type FreqBlock = {
    basic: BasicInotonationSequence,
    intervals: Intervals
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

type Intervals = {
    mn2: number,
    mj2: number,
    mn3: number,
    mj3: number,
    pe5: number,
}

type FreqEcof = [keyof BasicInotonationSequence, number]

const inotons: Inotonation = {
    Just: {
        basic: {
            A: ["A", 1],
            B: ["A", Math.pow(2, 1 / 12)],
            C: ["A", Math.pow(2, 2 / 12)],
            D: ["C", Math.pow(2, 2 / 12)],
            E: ["C", Math.pow(2, 4 / 12)],
            F: ["C", Math.pow(2, 5 / 12)],
            G: ["C", Math.pow(2, 7 / 12)],
        },
        intervals: {
            mn2: 16/15,
            mj2: 9/8,
            mn3: 6/5,
            mj3: 5/4,
            pe5: 3/2,
        }
    },
    Equal: {
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
            mn2: Math.pow(2, 1/12),
            mj2: Math.pow(2, 2/12),
            mn3: Math.pow(2, 3/12),
            mj3: Math.pow(2, 4/12),
            pe5: Math.pow(2, 7/12)
        }
    }
}

const freqs = (tones: [string], key: Key): number[] => {

    var res: number[] = []

    for (const t in tones) {
        const key = t.slice(0, -1)
        if (key in just) {
            // 全音

        }
    }


    return []
}