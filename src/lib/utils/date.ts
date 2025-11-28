const formatter = Intl.DateTimeFormat(undefined, {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
});
export const formatDate = (date: Date) => formatter.format(date);
