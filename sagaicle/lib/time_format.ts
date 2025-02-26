const BORDER = 120;

function timeFormat(minute: number): string {
  // return minute < BORDER
  //   ? `${minute} min`
  //   : `${Math.floor(minute / 60)}h ${minute % 60}min`;
  return `${minute} 分`;
}

export default timeFormat;
