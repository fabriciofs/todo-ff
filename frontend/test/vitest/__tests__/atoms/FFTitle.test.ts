import { mount } from '@vue/test-utils'
import FFTitle from 'components/atoms/FFTitle.vue';
import { describe, expect, it } from 'vitest';
describe('Atoms FFTitle', () => {
  it('renders the tag default', () => {
    const wrapper = mount(FFTitle, {
      slots: {
        default: 'TODO List',
      },
    })

    expect(wrapper.element.tagName).toBe('H1')
    expect(wrapper.text()).toBe('TODO List')
  })

  it('renders the correct tag when passed as prop', () => {
    const wrapper = mount(FFTitle, {
      props: {
        tag: 'h2',
      },
      slots: {
        default: 'TODO List',
      },
    })

    expect(wrapper.element.tagName).toBe('H2')
    expect(wrapper.text()).toBe('TODO List')
  })

  it('does not render invalid tag', () => {
    const wrapper = mount(FFTitle, {
      props: {
        tag: 'h7',
      },
      slots: {
        default: 'TODO List',
      },
    })

    expect(wrapper.element.tagName).toBe('H1')
    expect(wrapper.text()).toBe('TODO List')
  })
})
