import { mount } from '@vue/test-utils'
import TODOList from 'components/molecules/TODO/TODOList.vue';
import { describe, expect, it } from 'vitest';

describe('TODOList', () => {
  it('renders correct number of todos', () => {
    const todos = [
      { id: '1', description: 'Todo 1', dueDate: new Date(), isDone: false },
      { id: '2', description: 'Todo 2', dueDate: new Date(), isDone: true },
    ]
    const wrapper = mount(TODOList, {
      props: {
        todos,
        todoEditing: null,
      },
    })

    expect(wrapper.findAll('li').length).toBe(todos.length)
  })

  it('emits correct event when todo is checked', async () => {
    const todos = [
      { id: '1', description: 'Todo 1', dueDate: new Date(), isDone: false },
    ]
    const wrapper = mount(TODOList, {
      props: {
        todos,
        todoEditing: null,
      },
    })

    await wrapper.findComponent({ name: 'FFCheckbox' }).trigger('click')
    expect(wrapper.emitted()).toHaveProperty('todo:check')
    expect((wrapper.emitted()['todo:check'] as Array<[typeof todos[0]]>)[0][0]).toEqual(todos[0])
  })

  it('emits correct event when todo is removed', async () => {
    const todos = [
      { id: '1', description: 'Todo 1', dueDate: new Date(), isDone: false },
    ]
    const wrapper = mount(TODOList, {
      props: {
        todos,
        todoEditing: null,
      },
    })

    await wrapper.get('[data-test="removeItem"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('todo:remove')
  })

})
