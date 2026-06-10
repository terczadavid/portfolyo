export function cn(...inputs: (string | Record<string, boolean | undefined | null> | undefined | null | false)[]): string {
  const classes: string[] = []
  inputs.forEach(val => {
    if (typeof val === 'string') classes.push(val)
    else if (val && typeof val === 'object') {
      Object.entries(val).forEach(([key, value]) => { if (value) classes.push(key) })
    }
  })
  return classes.join(' ')
}