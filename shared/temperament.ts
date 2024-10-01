const basicKeys: (keyof BasicInotonationSequence)[] = [ "A", "B", "C", "D", "E", "F", "G" ]
const inotonations: (keyof Inotonation)[] = ["Just", "Equal"]
var baseFreq = 440

type Inotonation = {
    Just: FreqBlock,
    Equal: FreqBlock
}

type FreqBlock = {
    basic: BasicInotonationSequence,
    basicFreqs?: BasicFreqs,
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
    A: number,
    B: number,
    C: number,
    D: number,
    E: number,
    F: number,
    G: number,
}

const inotons: Inotonation = {
    Just: {
        basic: {
            A: ["A", 1],
            B: ["A", Math.pow(2, 1/12)],
            C: ["A", Math.pow(2, 2/12)],
            D: ["C", Math.pow(2, 2/12)],
            E: ["C", Math.pow(2, 4/12)],
            F: ["C", Math.pow(2, 5/12)],
            G: ["C", Math.pow(2, 7/12)],
        },
    }, 
    Equal: {
        basic: {
            A: ["A", 1],
            B: ["A", 1.125],
            C: ["A", 1.2],
            D: ["C", 9/8],
            E: ["C", 5/4],
            F: ["C", 4/3],
            G: ["C", 3/2],
        }
    }
}

const freqs = (tones: [string]): number[] => {
    
    var res: number[] = []

    for (const t in tones) {
        const key = t.slice(0, -1)
        if (key in just) {
            // 全音

        }
    }


    return []
}

const updateBasicInotonations = (): void => {
    const updateJust = inotons.Just.basicFreqs === undefined
    const updateEqual = inotons.Equal.basicFreqs === undefined
    if (!updateJust && !updateEqual) return
    const just: BasicFreqs = {A: baseFreq, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0}
    const equal: BasicFreqs = {A: baseFreq, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0}
    for (const key in basicKeys) {
        if (key === "A") continue
        if (updateJust) {
            
        }
        if (updateEqual) {

        }
    }
}