// utils/dateFormat.ts
export function formatCustomDate(dateString: string): string {
  const date = new Date(dateString.replace(' ', 'T')); // Ensure ISO format

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12

  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;

  return `${month}/${day}/${year} - ${hours}:${minutesStr}${ampm}`;
}
