const replaceLinks = (text: string): string => text.replace(
  /%link \[(.*?)\]\((.*?)\)%/g,
  '<a href="$2" target="_blank" rel="noreferrer noopener" class="text-yellow hover:underline">($1)[$2]</a>'
);

const replaceHeader = (text: string): string => text.replace(
  /%title (.*?)%/g,
  '<span class="italic text-blue">$1</span>'
);

const replaceComments = (text: string): string => text.replace(
  /%comment (.*?)%/g,
  '<span class="text-overlay2 italic">&lt;!-- $1 --&gt;</span>'
);

const replaceClasses = (text: string): string => text.replace(
  /%class \[(.*?)\]\((.*?)\)%/g,
  '<span class="$1">$2</span>'
);

const chain = (value: string, ...fns: ((value: string) => string)[]): string =>
  fns.reduce((acc, fn) => fn(acc), value);

/**
 * This a small parser to simplify the strings defined in the content of each
 * section. Overegenieernig? Probably!
 *
 * Here's the definition of the syntax:
 * - Links => %link [<link-text>](<link-url>)%
 * - Italic => %italic <text>%
 * - Comment => %comment <text>%
 * - Class/Classes => %class [<class-name(s)>](<text>)%
 */
export const parseContent = (content: string): string => chain(
  content,
  replaceLinks,
  replaceHeader,
  replaceComments,
  replaceClasses
);
