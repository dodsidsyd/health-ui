// @ts-check
import {createConfigForNuxt} from '@nuxt/eslint-config'
import prettierPlugin from 'eslint-plugin-prettier'

// 유연하게 커스터마이징할 수 있는 방식
export default createConfigForNuxt({}).prepend({
  plugins: {
    prettier: prettierPlugin
  },
}).override('nuxt/typescript/rules',{
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-empty': ['error', { 'allowEmptyExports': true }], // export { } 허용
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off', // any 타입 허용
    '@typescript-eslint/no-unused-vars': 'off', // 미사용 변수 경고 끄기
    'no-unused-vars': 'off', // 일반 JS/Vue 파일의 미사용 변수 경고 끄기
    'vue/no-multiple-template-root': 'off',
    'no-undef': 'off',
    'vue/html-self-closing': ['error',{
      html: {
        void: 'always',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        tabWidth: 2,
        trailingComma: 'none',
        printWidth: 120,
        bracketSpacing: true,
        arrowParens: 'avoid',
        endOfLine: 'auto'
      }
    ]
  }
}).append({
  // override 메서드 내부의 rules에서 나머지는 적용 되는데,
  // 아래 규칙은 적용 안돼서 명시적으로 규칙 설정
  files: ['**/*.vue'],
  rules: {
    'vue/no-multiple-template-root': 'off', // 여러 루트 태그 허용, vue3에서는 필요없는 eslint 규칙
    'vue/valid-template-root': 'off' // vue3에서는 필요없는 eslint 규칙
  }
})
