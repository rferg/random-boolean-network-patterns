export function converRgbToHex ({ red, green, blue }: { red: number, green: number, blue: number}): string {
    return `#${[red, green, blue].map(value => value.toString(16).padStart(2, '0')).join('')}`
}
