import { mount, VueWrapper } from '@vue/test-utils'
import TODOList from 'components/pages/todo/TODOList.vue';
import { describe, expect, it } from 'vitest';
interface TodoItem {
  id: string;
  description: string;
  isDone: boolean;
  edit: boolean;
  dueDate: string;
}

describe('TodoList', () => {
  it('should mount the component TODOList', () => {
    const wrapper: VueWrapper<any> = mount(TODOList, {
      props: {
        todos: [
          {
            id: '1',
            description: 'Test todo',
            isDone: false,
            edit: false,
            dueDate: '2023-05-11',
          },
        ] as TodoItem[],
      },
      global: {
        stubs: {
          FFCalendar: true,
        },
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render the input for edit', () => {
    const wrapper: VueWrapper<any> = mount(TODOList, {
      props: {
        todos: [
          {
            id: '1',
            description: 'Test todo',
            isDone: false,
            edit: true,
            dueDate: '2023-05-11',
          },
        ] as TodoItem[],
      },
      global: {
        stubs: {
          FFCalendar: true,
        },
      },
    })

    const qInput = wrapper.find('.q-mr-sm')
    expect(qInput.exists()).toBe(true)
  })
})
