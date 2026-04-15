/**
 * แปลง Unix Timestamp String เป็น Format DD/MM/YYYY HH:mm
 * @param timestampStr - "1776246243"
 */
export const formatTimestamp = (timestampStr: string): string => {
  const seconds = parseInt(timestampStr, 10);
  
  if (isNaN(seconds)) return "Invalid Date";

  // JavaScript Date ใช้ milliseconds (s * 1000)
  const date = new Date(seconds * 1000);

  // ใช้ Intl.DateTimeFormat เพื่อความแม่นยำและอ่านง่าย
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date).replace(',', '');
};