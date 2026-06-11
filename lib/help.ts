export function formatDate(dateString: Date | string | null) {
  if (dateString === null) return '';
  const date = new Date(dateString);

  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const month = months[date.getUTCMonth()];

  return `${day} ${month} ${year}`;
}
