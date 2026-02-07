const timeFormat = (minutes) => {
    if (minutes == null) return ''
    const mins = Number(minutes)
    if (Number.isNaN(mins)) return ''
    const hrs = Math.floor(mins / 60);
    const minutesRemainder = mins % 60;
    if (hrs > 0) return `${hrs}h ${minutesRemainder}m`;
    return `${minutesRemainder}m`;
};

export default timeFormat;