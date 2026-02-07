// Utility to format runtime minutes as "Xh Ym"
export function formatRuntime(minutes) {
  if (minutes == null || minutes === '') return ''
  const mins = Number(minutes)
  if (Number.isNaN(mins) || mins <= 0) return ''
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

export default formatRuntime
