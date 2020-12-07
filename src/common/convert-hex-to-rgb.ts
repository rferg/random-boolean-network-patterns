export function convertHexToRgb (hex: string): { red: number, green: number, blue: number} {
    if (!hex) { return { red: 0, green: 0, blue: 0 } }
    const [red, green, blue] = hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (_, rString, gString, bString) => `#${rString}${rString}${gString}${gString}${bString}${bString}`)
        ?.substring(1)
        ?.match(/.{2}/g)
        ?.map(x => parseInt(x, 16)) ?? [0, 0, 0]
    return { red, green, blue }
}
