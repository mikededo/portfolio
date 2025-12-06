import type { Root } from 'mdast';
import type { Plugin } from 'unified';

import { visit } from 'unist-util-visit';

const ALERT_REGEX = /^::(info|tip|success|warning|caution)::/i;

const blockquote: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'blockquote', (node) => {
    const firstParagraph = node.children.find((n) => n.type === 'paragraph');
    if (!firstParagraph || firstParagraph.type !== 'paragraph') {
      return;
    }

    const firstNode = firstParagraph.children[0];
    if (firstNode?.type !== 'text') {
      return;
    }

    const match = firstNode.value.match(ALERT_REGEX);
    if (!match) {
      return;
    }

    const alertType = match[1].toLowerCase();
    const textAfterAlert = firstNode.value.replace(ALERT_REGEX, '').replace(/^\n+/, '');
    if (textAfterAlert) {
      firstNode.value = textAfterAlert;
    } else {
      firstParagraph.children = firstParagraph.children.slice(
        firstParagraph.children[1]?.type === 'break' ? 2 : 1
      );
    }

    node.data = {
      hName: 'blockquote',
      hProperties: { className: [alertType] }
    };
  });
};

export default blockquote;
