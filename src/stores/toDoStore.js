import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useToDoStore = defineStore('ToDo', () => {
  // ===========
  // STATE
  // ===========
  const todos = ref([])

  // ===========
  // ACTIONS
  // =========
  function setAllTodos(payload) {
    todos.value = payload
  }

  function addTodo(text) {
    if (text.trim() === '') {
      return
    }

    todos.value.unshift({
      todo: text,
      done: false
    })
  }

  function deleteTodo(todo) {
    todos.value = todos.value.filter((x) => x !== todo)
  }

  // =========== WATHCERS ===========
  // WATCHING THE TODOS STATE SO WE CAN STORE IT IN LOCALSTORAGE
  watch(
    todos,
    (newTodoValue) => {
      localStorage.setItem('todos', JSON.stringify(newTodoValue))
    },
    { deep: true }
  )

  return { todos, addTodo, setAllTodos, deleteTodo }
})
