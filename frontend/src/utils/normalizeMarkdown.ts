/**
 * Fixes common LLM markdown mistakes so fenced code and paragraphs parse correctly
 * (e.g. code on the same line as ```lang, or a closing fence written as `` `).
 */
export function normalizeMarkdownForDisplay(text: string): string {
  let s = text;

  // Broken closing fence: `` then optional spaces/tabs then `  (meant to be ```)
  for (let i = 0; i < 4; i++) {
    s = s.replace(/``[ \t]*`/g, '```');
  }

  // Opening fence with language (or none) then more code on the *same line* — parsers need a newline after the info string.
  // Use only horizontal whitespace so we never split ```python\nrealcode incorrectly.
  s = s.replace(/```[ \t]*([A-Za-z0-9+#.-]{0,32})[ \t]+([^\n`][^\n]*)/g, (full, lang: string, rest: string) => {
    const L = String(lang).trim();
    const tail = String(rest).trimStart();
    if (!tail) return full;
    return (L.length > 0 ? '```' + L : '```') + '\n' + tail;
  });

  // Closing ``` stuck on the same line as code, followed by prose (capitalized word, e.g. "Let me")
  s = s.replace(/((?:\)|\]|\}|>|'|"|`|\.|!|\?|\d))\s+(```)(\s*)([A-Z][a-zA-Z]*)/g, '$1\n$2\n\n$4');

  // Stray single backtick sandwiched between ``` and spaces (e.g. ``` ` Let)
  s = s.replace(/```([ \t]+)`([ \t]+)/g, '```$2');

  return s;
}
