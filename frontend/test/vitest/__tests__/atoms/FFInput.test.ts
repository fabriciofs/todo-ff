import { mount } from '@vue/test-utils'
import FFInput from 'components/atoms/FFInput.vue';
import { describe, expect, it } from 'vitest';

describe('FFInput', () => {
  it('renders the input component', () => {
    const wrapper = mount(FFInput, {
      props: {
        modelValue: 'Initial value',
      },
    })

    expect(wrapper.find('input').element.value).toBe('Initial value')
  })

  it('emits update:modelValue event when input changes', async () => {
    const wrapper = mount(FFInput, {
      props: {
        modelValue: '',
      },
    })

    const input = wrapper.find('input')
    await input.setValue('New value')

    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['New value'])
  })
})
