// format.ts
function format(text: string, limit: number = 10): string {
  if (text.length <= limit) {
    return text;
  }
  return text.slice(0, limit) + "...";
}

export default format;
