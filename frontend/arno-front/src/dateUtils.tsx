function formatDateString(date: string) {
  let d = new Date(Date.parse(date));

  return d.toLocaleString("en-US", {
  });
}
export { formatDateString };
