import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tasksComplete, setTasksComplete] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    !newTaskTitle ? "" : (setTasks([...tasks, { id: Math.random(), title: newTaskTitle, isComplete: false }]))
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    tasks.map((task) => {
      if (id == task.id) {
        task.isComplete = true;
        setTasksComplete([...tasksComplete, task]);
        tasks.splice(tasks.indexOf(task), 1)
      }
    })
    setTasks([...tasks])
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    tasks.map((task) => {
      if (id == task.id) {
        tasks.splice(tasks.indexOf(task), 1);
      }
    })
    setTasks([...tasks])
  }
  function handleRemoveCompleteTask(id: number) {
    // Remova uma task da listagem pelo ID
    tasksComplete.map((task) => {
      if (id == task.id) {
        tasksComplete.splice(tasksComplete.indexOf(task), 1);
      }
    })
    setTasks([...tasks])
  }

  return (
    <div className="task-list-wrapper">
      <section className="task-list container">
        <header>
          <h2>Minhas tasks</h2>

          <div className="input-group">
            <input
              type="text"
              placeholder="Adicionar nova task"
              onChange={(e) => setNewTaskTitle(e.target.value)}
              value={newTaskTitle}
            />
            <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
              <FiCheckSquare size={16} color="#fff" /> <span className="add-task-button-mobile">Adiconar nova task</span>
            </button>
          </div>
        </header>

        <main>
          <ul>
            {tasks.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                      onClick={() => handleToggleTaskCompletion(task.id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                  <FiTrash size={16} />
                </button>
              </li>
            ))}

          </ul>
        </main>
      </section>
      <section className="task-list task-list-completed container">
        <header>
          <h2>Minhas tasks concluidas</h2>
        </header>

        <main>
          <ul>
            {tasksComplete.map(task => (
              <li key={task.id}>
                <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      readOnly
                      checked={task.isComplete}
                    />
                    <span className="checkmark"></span>
                  </label>
                  <p>{task.title}</p>
                </div>

                <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveCompleteTask(task.id)}>
                  <FiTrash size={16} />
                </button>
              </li>
            ))}

          </ul>
        </main>
      </section>
    </div>
  )
}