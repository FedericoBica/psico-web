// Convierte el contenido de un post escrito en texto plano a HTML.
// - Párrafos separados por una línea en blanco
// - Líneas que empiezan con "-", "•" o "*" → lista con viñetas
// - Líneas que empiezan con "1." o "1)" → lista numerada
// - Líneas cortas después de un texto que termina en ":" → lista con viñetas
// - Líneas cortas sin punto final o preguntas sueltas → subtítulo
// - Las líneas cortadas a la mitad (texto pegado de un PDF) se unen
// - Si el texto empieza repitiendo el título del post, se quita
// Si el contenido ya tiene HTML, se devuelve sin cambios.

const HTML_TAG = /<(p|h[1-6]|ul|ol|li|br|div|strong|em|blockquote)\b/i;
const BULLET = /^[-•*]\s+/;
const NUMBERED = /^(\d+)[.)]\s+/;

interface ListItem {
  type: 'ul' | 'ol';
  number: number;
  lines: string[];
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const isHeading = (text: string) =>
  text.length <= 100 && !/[.,;:]$/.test(text) && !/\d{6,}/.test(text);

const isShortLine = (line: string) => line.length <= 70 && !/\.$/.test(line);

// Une líneas cortadas a la mitad; respeta los saltos de línea intencionales.
const joinLines = (lines: string[]) =>
  lines.reduce((acc, line, i) => (i === 0 ? line : `${acc}${lines[i - 1].length >= 70 ? ' ' : '<br>'}${line}`), '');

const isQuestionHeading = (text: string) =>
  text.length <= 80 && /^¿.*\?$/.test(text);

const normalize = (text: string) => text.replace(/\s+/g, ' ').trim().toLowerCase();

// Quita las primeras líneas si repiten el título (puede venir cortado en varias líneas).
const removeTitle = (content: string, title: string) => {
  const target = normalize(title);
  if (!target) return content;

  const lines = content.split('\n');
  let start = '';
  for (let i = 0; i < Math.min(lines.length, 4); i++) {
    start = normalize(`${start} ${lines[i]}`);
    if (start === target) return lines.slice(i + 1).join('\n');
    if (!target.startsWith(start)) break;
  }
  return content;
};

export const formatPostContent = (content: string, title = ''): string => {
  if (!content) return '';
  if (HTML_TAG.test(content)) return content;

  const blocks = removeTitle(content.replace(/\r\n?/g, '\n'), title)
    .split(/\n\s*\n/)
    .map((block) => block.split('\n').map((line) => escapeHtml(line.trim())).filter(Boolean))
    .filter((lines) => lines.length > 0);

  const html: string[] = [];
  let openList: 'ul' | 'ol' | null = null;
  let previousEndsWithColon = false;

  const closeList = () => {
    if (openList) html.push(`</${openList}>`);
    openList = null;
  };

  const pushItems = (items: ListItem[]) => {
    for (const item of items) {
      if (openList !== item.type) {
        closeList();
        const start = item.type === 'ol' && item.number !== 1 ? ` start="${item.number}"` : '';
        html.push(`<${item.type}${start}>`);
        openList = item.type;
      }
      html.push(`<li>${item.lines.join(' ')}</li>`);
    }
  };

  for (const lines of blocks) {
    const text: string[] = [];
    const items: ListItem[] = [];

    for (const line of lines) {
      const bullet = line.match(BULLET);
      const numbered = line.match(NUMBERED);

      if (bullet) items.push({ type: 'ul', number: 0, lines: [line.replace(BULLET, '')] });
      else if (numbered) items.push({ type: 'ol', number: Number(numbered[1]), lines: [line.replace(NUMBERED, '')] });
      else if (items.length > 0) items[items.length - 1].lines.push(line);
      else text.push(line);
    }

    // Lista sin viñetas: líneas cortas después de "...:". Una pregunta corta la lista.
    if (text.length > 1 && items.length === 0 && previousEndsWithColon) {
      const questionIndex = text.findIndex(isQuestionHeading);
      const listLines = questionIndex === -1 ? text : text.slice(0, questionIndex);

      if (listLines.length > 1 && listLines.every(isShortLine)) {
        listLines.forEach((line) => items.push({ type: 'ul', number: 0, lines: [line] }));
        text.splice(0, listLines.length);
        pushItems(items);
        items.length = 0;
      }
    }

    if (text.length > 0) {
      closeList();

      if (text.length > 1 && isQuestionHeading(text[0])) {
        html.push(`<h2>${text.shift()}</h2>`);
      }

      const paragraph = joinLines(text);
      const heading = items.length === 0 && !paragraph.includes('<br>') && isHeading(paragraph);
      html.push(heading ? `<h2>${paragraph}</h2>` : `<p>${paragraph}</p>`);
    }

    pushItems(items);

    previousEndsWithColon = lines[lines.length - 1].endsWith(':');
  }

  closeList();
  return html.join('\n');
};
