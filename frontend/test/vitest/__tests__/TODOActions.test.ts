import { mount } from '@vue/test-utils'
import TODOActions from 'components/pages/todo/TODOActions.vue';
import { describe, expect, it } from 'vitest';

describe('TodoControlButtons', () => {
  it('should mount the component', () => {
    const wrapper = mount(TODOActions, {
      props: {
        todo: {
          edit: false,
          isDone: false,
        },
      },
    })

    expect(wrapper.vm).toBeTruthy()
  })

  it('should emit the correct events when buttons are clicked', async () => {
    const wrapper = mount(TODOActions, {
      props: {
        todo: {
          edit: false,
          isDone: false,
        },
      },
    })

    // Test the remove button
    await wrapper.find('[title="remover item"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('remove:todo')

    // Test the edit button
    await wrapper.find('[title="editar item"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('edit:todo')

    // Switch to edit mode and test the save button
    await wrapper.setProps({ todo: { edit: true, isDone: false } })
    await wrapper.find('[title="salvar item"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('save:todo')
  })
})
