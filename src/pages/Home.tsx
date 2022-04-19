import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }

    if (tasks.find(item => item.title === newTaskTitle)) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const itemStatusChecked = tasks.map(task => task.id === id ? {
      ...task,
      done: !task.done
    } : task)

    setTasks(itemStatusChecked)
  }

  function handleRemoveTask(id: number) {
    const removeTask = tasks?.filter(item => item.id !== id)
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        { text: "Sim", onPress: () =>  setTasks(removeTask) }
      ]
    );
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const itemEditItem = tasks.map(task => task.id === taskId ? {
      ...task,
      title: taskNewTitle
    } : task)

    setTasks(itemEditItem)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})