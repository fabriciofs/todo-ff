import { mount } from '@vue/test-utils'
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-vitest'
import { describe, expect, it } from 'vitest';
import TODOList from 'components/molecules/TODO/TODOList.vue'

installQuasarPlugin()

describe('TODOList', () => {
  it('Componente deve renderizar a quantidade correta de todos', () => {
    const todos = [
      { id: '1', description: 'Todo 1', dueDate: new Date(), isDone: false },
      { id: '2', description: 'Todo 2', dueDate: new Date(), isDone: false },
      { id: '3', description: 'Todo 3', dueDate: new Date(), isDone: false }
    ]
    const wrapper = mount(TODOList, {
      props: {
        todos,
        todoEditing: null
      }
    })
    expect(wrapper.findAll('li').length).toBe(todos.length)
  })

  it('Remover item do todoList', async () => {
    const todos = [
      { id: '1', description: 'Todo 1', dueDate: new Date(), isDone: false },
      { id: '2', description: 'Todo 2', dueDate: new Date(), isDone: false },
      { id: '3', description: 'Todo 3', dueDate: new Date(), isDone: false }
    ]
    const wrapper = mount(TODOList, {
      props: {
        todos,
        todoEditing: null
      }
    })
    await wrapper.get('[data-test="removeItem"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('todo:remove')
  })
})
