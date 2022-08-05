function formatDateString(date: string) {
  let dt = new Date(Date.parse(date));
  const padL = (nr:number, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

  let today = new Date()

  if (today.toDateString() === dt.toDateString()) {
    return `امروز ${
        padL(dt.getHours())}:${
        padL(dt.getMinutes())}`
  }

  return `${
    dt.getFullYear()}-${
      padL(dt.getMonth()+1)}-${
      padL(dt.getDate())} ${
      padL(dt.getHours())}:${
      padL(dt.getMinutes())}`
}

export { formatDateString};
