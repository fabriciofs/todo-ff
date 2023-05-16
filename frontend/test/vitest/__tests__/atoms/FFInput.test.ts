import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils'
import FFInput from 'components/atoms/FFInput.vue'

import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
installQuasarPlugin()
describe('FFInput', () => {
  it('componente deve ser renderizado', () => {
    const wrapper = mount(FFInput, {
      props: {
        modelValue: 'Todo List'
      }
    })

    expect(wrapper.find('input').element.value).toBe('Todo List')
  })

  it('deve emitir update:modelValue quando o input for alterado', async () => {
    const wrapper = mount(FFInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('Todo List')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['Todo List'])
  })
})
