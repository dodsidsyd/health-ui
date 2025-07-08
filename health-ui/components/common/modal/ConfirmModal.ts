import { type App, createApp, h } from 'vue'
import { default as ConfirmModalView } from './ConfirmModal.vue'
import type { ConfirmModalProps } from '@/types/common/modal.type'

let modalApp: App<Element> | undefined
let resolvePromise: (value: any) => void

const open = async (props: ConfirmModalProps) => {
  return new Promise(resolve => {
    resolvePromise = resolve

    if (!modalApp) {
      modalApp = createApp({
        render: () =>
          h(ConfirmModalView, {
            ...props,
            isVisible: true,
            onClose: hide,
            onCancel: async (value: boolean) => {
              await resolvePromise(value)
              await hide()
            },
            onConfirm: async (value: boolean) => {
              await resolvePromise(value)
              await hide()
            }
          })
      })
      const div = document.createElement('div')
      document.body.appendChild(div)
      modalApp.mount(div)
    }
  })
}

const hide = () => {
  return new Promise(resolve => {
    if (modalApp) {
      modalApp?.unmount()
      modalApp = undefined
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

const ConfirmModal = {
  open,
  hide
}

export default ConfirmModal
