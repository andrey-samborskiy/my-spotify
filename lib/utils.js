const convertMsToMinSec = (durationInMs) => {
    const durationInS = durationInMs / 1000;
    const minutes = Math.floor(durationInS / 60)
    const seconds = Math.round(durationInS % 60)
    return `${ minutes }:${seconds < 10 ? '0' + seconds : seconds}`
}

export {
    convertMsToMinSec
}
