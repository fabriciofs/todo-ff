import { api } from 'boot/axios'

export const createTodo = async (todo) => {
  const { data } = await api.post('/todos', todo)
  return data
}

export const removeTodo = async (id) => {
  const { data } = await api.delete(`/todos/${id}`)
  return data
}

export const getAllTodo = async () => {
  const { data } = await api.get('/todos')
  return data
}

export const updateTodo = async (todo) => {
  const { data } = await api.put(`/todos/${todo.id}`, todo)
  return data
}
