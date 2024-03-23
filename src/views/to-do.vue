<script setup>
import { ref, computed } from 'vue'
import { useToDoStore } from '@/stores/toDoStore'
const toDoStore = useToDoStore()

const text = ref('')
const completed = ref(false)
const sort = ref('default')

// DESTRUCTURING METHODS FROM THE STORE
const { addTodo, setAllTodos, deleteTodo } = toDoStore

// GETTING TODOS FROM THE STORE
const todos = computed(() => {
  return toDoStore.todos
})

// ===================================
// FILTERING THE ARRAY WITH COMPLETED OR NOT
// ==================================
const filteredTodos = computed(() => {
  if (completed.value) {
    // SHALLOW CLONE OF THE ARRAY
    return [...todos.value].filter((todo) => todo.done)
  } else {
    return [...todos.value]
  }
})

// ============================
// SORTING  the filtered arrayy
// ============================
const sortedTodos = computed(() => {
  if (sort.value == 'z-a' || sort.value == 'a-z') {
    return [...filteredTodos.value].sort((a, b) => {
      const todoA = a.todo.toLowerCase()
      const todoB = b.todo.toLowerCase()
      return sort.value === 'a-z' ? todoA.localeCompare(todoB) : todoB.localeCompare(todoA)
    })
  } else {
    return filteredTodos.value
  }
})

// GETTING TODOS FROM LOCAL STORAGE
const allTodos = JSON.parse(localStorage.getItem('todos')) || []
setAllTodos(allTodos)

// ADD NEW TODO
function addTodoHandler() {
  addTodo(text.value)
  text.value = ''
}
</script>

<template>
  <main class="to-do">
    <section class="greeting">
      <h3 class="title">✍️ToDo Application</h3>
    </section>

    <div class="input-section">
      <section class="create-todo">
        <form @submit.prevent="addTodoHandler">
          <h3>What do you plan on doing🙂?</h3>
          <input type="text" placeholder="e.g. email your boss" v-model="text" />

          <input type="submit" value="Add todo" />
        </form>
      </section>
    </div>

    <div class="todo-section">
      <section class="filters">
        <div class="actions">
          <div>
            <input type="checkbox" id="done" v-model="completed" />
            <label for="done">filter completed </label>
          </div>
          <div>
            <label for="sort">sort </label>
            <select name="sort" id="sort" v-model="sort">
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
              <option value="default">default</option>
            </select>
          </div>
        </div>
      </section>
      <section class="todo-list">
        <h2 v-show="sortedTodos.length === 0">No Todos Here😞</h2>

        <div class="list">
          <div
            v-for="(todo, index) in sortedTodos"
            :class="`todo-item ${todo.done && 'done'}`"
            :key="index"
          >
            <label>
              <input type="checkbox" v-model="todo.done" />
            </label>

            <div class="todo-content">
              <input type="text" v-model="todo.todo" />
            </div>

            <div class="actions">
              <button class="delete" @click="deleteTodo(todo)">Delete</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>


<style scoped>
.to-do {
  max-width: 500px;
  margin: auto;
  padding: 0 24px;
}

section {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5em;
}

.greeting .title {
  text-align: center;
}

.greeting .title input {
  margin-left: 0.5rem;
  flex: 1 1 0%;
  min-width: 0;
}

.greeting .title,
.greeting .title input {
  color: white;
  font-size: 2rem;
  font-weight: 700;
}

.filters .actions div {
  color: white;
  display: flex;
  align-items: center;
}

.filters .actions label {
  margin: 0 20px;
}

.create-todo input[type='text'] {
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: black;
  background-color: whitesmoke;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1.5rem;
}

input[type='checkbox'] {
  height: 25px;
  width: 25px;
  color: green;
}

.create-todo input[type='submit'] {
  display: block;
  width: 100%;
  font-size: 1.125rem;
  padding: 1rem 1.5rem;
  color: #fff;
  background-color: green;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.create-todo input[type='submit']:hover {
  opacity: 0.75;
}

.todo-list .list {
  margin: 1rem 0;
}

.filters .actions,
.todo-list .todo-item {
  display: flex;
  align-items: center;
  background-color: #17181d;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--shadow);
  margin-bottom: 1rem;
}

.todo-item label {
  display: block;
  margin-right: 1rem;
  cursor: pointer;
}

.todo-item .todo-content {
  flex: 1 1 0%;
}

.todo-item .todo-content input {
  color: white;
  font-size: 1.125rem;
}

.todo-item .actions {
  display: flex;
  align-items: center;
}

.todo-item .actions button {
  display: block;
  padding: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.todo-item .actions button:hover {
  opacity: 0.75;
}

.todo-item .actions .edit {
  margin-right: 0.5rem;
  background-color: var(--primary);
}

.todo-item .actions .delete {
  background-color: var(--danger);
}

.todo-item.done .todo-content input {
  text-decoration: line-through;
  color: rgba(165, 165, 165, 0.752);
}

.input-section,
.todo-section {
  border: 1px solid rgb(47, 47, 47);
  border-radius: 10px;
  margin-top: 30px;
}
</style>