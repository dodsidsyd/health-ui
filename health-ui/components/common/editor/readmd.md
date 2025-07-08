1. TipTap에서 제공하는 <EditorContent></EditorContent>는 자동으로 class명으로 ProseMirror 할당됨.
<div class="ProseMirror">
  <p>Hello World!</p>
</div>

2.CSS 작업할 때, 주의하실 점
EditorContent 내부 요소들의 css를 수정할때는, :deep(.ProseMirror)를 써야 함!
Vue(SFC)에서는 <style scoped>를 쓰면 컴포넌트 바깥의 내부 DOM에 직접 접근할 수 없게 됨
따라서 Tiptap 내부(ProseMirror에서 만들어낸 DOM 구조)를 스타일링하려면 deep 선택자를 사용해야 함
