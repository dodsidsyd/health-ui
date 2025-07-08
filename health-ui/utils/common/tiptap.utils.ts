import { Node } from '@tiptap/core'

export interface HashtagOptions {
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    hashtag: {
      insertHashtag: (tag: string) => ReturnType
    }
  }
}

// 해시태그 확장 커스텀 노드
export const HashtagCustomExtension = Node.create<HashtagOptions>({
  name: 'hashtag',
  group: 'inline',
  inline: true,
  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {}
    }
  },

  addAttributes() {
    return {
      tag: {
        default: ''
      }
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-hashtag]',
        getAttrs: (element: any) => ({
          tag: element.getAttribute('data-hashtag')
        })
      }
    ]
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      {
        'data-hashtag': node.attrs.tag,
        class: 'hashtag',
        ...this.options.HTMLAttributes,
        ...HTMLAttributes
      },
      `#${node.attrs.tag}`
    ]
  },

  addCommands() {
    return {
      insertHashtag:
        (tag: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { tag }
          })
        }
    }
  }
})

/**
 * JSON 문서에서 해시태그를 추출하는 함수
 */
export const extractHashtagsFromJSON = (jsonDoc: any): string[] => {
  const hashtags: string[] = []

  const traverse = (node: any) => {
    if (node.type === 'hashtag' && node.attrs?.tag) {
      hashtags.push(node.attrs.tag)
    }

    if (node.content) {
      node.content.forEach((childNode: any) => traverse(childNode))
    }
  }

  if (jsonDoc && jsonDoc.content) {
    jsonDoc.content.forEach((node: any) => traverse(node))
  }

  return [...new Set(hashtags)] // 중복 제거
}

/**
 * 해시태그 패턴을 매칭하는 정규식
 */
export const HASHTAG_REGEX = /#([^\s#]+)$/

/**
 * 텍스트에서 해시태그 패턴을 찾는 함수
 */
export const findHashtagMatch = (text: string) => {
  return text.match(HASHTAG_REGEX)
}
