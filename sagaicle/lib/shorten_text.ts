function shortenText(text: string, limit: number = 10): string {
  return text.length <= limit ? text : text.slice(0, limit - 1) + "...";
}

export default shortenText;
