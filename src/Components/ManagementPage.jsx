import React, { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { auth, db } from '../firebaseConfig.js';
import './ManagementPage.css';
import { collection, addDoc, updateDoc, doc, deleteDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import editIcon from '../assets/edit.png'; // Path to the edit icon
import deleteIcon from '../assets/del.png'; // Path to the delete icon

const ManagementPage = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState("todo");
  const [currentUser, setCurrentUser] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [visibleHistories, setVisibleHistories] = useState({});

  const navigate = useNavigate();
  const tasksCollectionRef = collection(db, "tasks");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const q = query(tasksCollectionRef, orderBy("createdAt"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newTasks = { todo: [], inProgress: [], completed: [] };
        snapshot.forEach((doc) => {
          const task = { id: doc.id, ...doc.data() };
          if (task.userId === currentUser.uid) {
            newTasks[task.status]?.push(task);
          }
        });
        setTasks(newTasks);
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const addTask = async (e) => {
    e.preventDefault();

    if (newTaskTitle.trim() && currentUser) {
      try {
        const newTask = {
          title: newTaskTitle,
          status: selectedSection,
          createdAt: new Date().toISOString(),
          userId: currentUser.uid,
          history: [
            {
              action: "Created",
              date: new Date().toISOString(),
            },
          ],
        };

        if (editTaskId) {
          // Update existing task
          await updateDoc(doc(db, "tasks", editTaskId), {
            ...newTask,
            history: [
              ...newTask.history,
              {
                action: "Edited",
                date: new Date().toISOString(),
              },
            ],
          });
          setEditTaskId(null);
        } else {
          // Add new task
          await addDoc(tasksCollectionRef, newTask);
        }

        setNewTaskTitle("");
        setShowForm(false);
        console.log('Task added successfully');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    } else {
      console.warn('New task title is empty or user is not authenticated');
    }
  };

  const onDragEnd = useCallback(async (result) => {
    const { destination, source } = result;

    if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) return;

    const sourceSection = [...tasks[source.droppableId]];
    const [movedTask] = sourceSection.splice(source.index, 1);
    const destinationSection = [...tasks[destination.droppableId]];
    destinationSection.splice(destination.index, 0, movedTask);

    const taskDoc = doc(db, "tasks", movedTask.id);
    const newStatus = destination.droppableId;
    const updatedTask = {
      ...movedTask,
      status: newStatus,
      history: [
        ...movedTask.history,
        {
          action: `Moved to ${newStatus}`,
          date: new Date().toISOString(),
        },
      ],
    };

    try {
      await updateDoc(taskDoc, updatedTask);

      setTasks((prevTasks) => ({
        ...prevTasks,
        [source.droppableId]: sourceSection,
        [destination.droppableId]: destinationSection,
      }));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  }, [tasks]);

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));

      setTasks((prevTasks) => {
        const updatedTasks = { ...prevTasks };
        Object.keys(updatedTasks).forEach((section) => {
          updatedTasks[section] = updatedTasks[section].filter(task => task.id !== taskId);
        });
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleHistory = (taskId) => {
    setVisibleHistories(prevHistories => ({
      ...prevHistories,
      [taskId]: !prevHistories[taskId],
    }));
  };

  const handleEditTask = (task) => {
    setNewTaskTitle(task.title);
    setSelectedSection(task.status);
    setShowForm(true);
    setEditTaskId(task.id);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign Out Error:', error.message);
      });
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <h1 className="board-title">Manage your Projects</h1>
        <div className="board-container">
          <div className="section-grid">
            {["todo", "inProgress", "completed"].map((section) => (
              <Droppable droppableId={section} key={section}>
                {(provided) => (
                  <div
                    className="section"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h2 className="section-title">{section.toUpperCase()}</h2>
                    {tasks[section].map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="task-title">
                              {task.title}
                              <div className="task-actions">
                                <img
                                  src={editIcon}
                                  alt="Edit"
                                  className="action-icon"
                                  onClick={() => handleEditTask(task)}
                                />
                                <img
                                  src={deleteIcon}
                                  alt="Delete"
                                  className="action-icon"
                                  onClick={() => deleteTask(task.id)}
                                />
                              </div>
                            </div>
                            <button
                              className="history-button"
                              onClick={() => toggleHistory(task.id)}
                            >
                              {visibleHistories[task.id]
                                ? "Hide History"
                                : "Show History"}
                            </button>
                            {visibleHistories[task.id] && (
                              <div className="task-history">
                                <p className="history-title">History:</p>
                                <ul className="history-list">
                                  {task.history.map((entry, i) => (
                                    <li key={i}>
                                      {entry.action} -{" "}
                                      {new Date(entry.date).toLocaleString()}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <button
                      className="add-task-button"
                      onClick={() => {
                        setShowForm(true);
                        setSelectedSection(section);
                      }}
                    >
                      Add Task
                    </button>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editTaskId ? "Edit Task" : "Add New Task"}</h2>
            <form onSubmit={addTask}>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Task Title"
                required
              />
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <button type="submit">
                {editTaskId ? "Update Task" : "Add Task"}
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowForm(false);
                  setNewTaskTitle("");
                  setEditTaskId(null);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      
    </>
  );
};

export default ManagementPage;
