export const getDayFromDate = date => {
  if (!date || isNaN(new Date(date).getTime())) {
    return '';
  }
  return new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
};

export function formatDate(input) {
  console.log('Formatting date:', input);
  if (!input || isNaN(new Date(input).getTime())) {
    return ['', ''];
  }
  const date = new Date(input);

  const weekday = date.toLocaleDateString('en-US', {
    weekday: 'long',
  });

  const day = date.getDate();
  const month = date
    .toLocaleDateString('en-US', {
      month: 'long',
    })
    .toLowerCase();

  const year = date.getFullYear();

  return [weekday, `${day} ${month} ${year}`];
}
