/**
 * starter-kit에 포함되어 있는 확장 프로그램들
 * import Document from '@tiptap/extension-document'
 * import Paragraph from '@tiptap/extension-paragraph'
 * import Text from '@tiptap/extension-text'
 * import Bold from '@tiptap/extension-bold'
 * import Strike from '@tiptap/extension-strike'
 */
import { Editor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useEditor = () => {
  const editor = ref<Editor | null>(null)
  const jsonContent = ref<any>(null)

  const createEditor = () => {
    return new Editor({
      extensions: [
        StarterKit.configure({
          history: {
            depth: 100
          }
        }),
        // HashtagCustomExtension,
        Image
      ],
      content:
        '한강 뛰고 와서 먹기 좋은 초간단 샐러드 추천해요. 저만의 식단인데, 일단 닭가슴살이랑 바나나 그리고 양배추 있으면 한끼 뚝딱이에요',
      onUpdate: ({ editor }) => {
        const json = editor.getJSON()
        jsonContent.value = json
        // console.log('jsonContent', jsonContent.value)
      },
      editorProps: {
        // attributes: {
        //   class: 'prose prose-sm focus:outline-none',
        //   'data-placeholder': '내용을 입력해보세요...'
        // }
        // handleKeyDown: (view, event) => {
        //   if (event.key === ' ') {
        //     const { state } = view
        //     const { from, to } = state.selection
        //     const textBefore = state.doc.textBetween(Math.max(0, from - 21), to, '\n', '\n')
        //     const hashtagMatch = findHashtagMatch(textBefore)
        //     if (hashtagMatch) {
        //       const fullMatch = hashtagMatch[0]
        //       const tag = hashtagMatch[1]
        //       const start = from - fullMatch.length
        //       const existingHashtags = extractHashtagsFromJSON(jsonContent.value)
        //       if (existingHashtags.includes(tag)) {
        //         view.dispatch(state.tr.delete(start, to))
        //         return true
        //       }
        //       try {
        //         const transaction = state.tr
        //           .delete(start, to)
        //           .insert(start, state.schema.nodes.hashtag.create({ tag }))
        //           .insert(start + 1, state.schema.text(' '))
        //         view.dispatch(transaction)
        //         return true
        //       } catch (error) {
        //         console.error('해시태그 생성 중 오류:', error)
        //       }
        //     }
        //   }
        //   return false
        // }
      }
    })
  }

  onMounted(() => {
    editor.value = createEditor()
  })

  onBeforeUnmount(() => {
    if (editor.value) {
      editor.value.destroy()
    }
  })

  return {
    editor,
    jsonContent
  }
}
