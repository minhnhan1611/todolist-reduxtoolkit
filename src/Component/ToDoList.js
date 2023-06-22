import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, completeTask, fetchTasks } from '../Redux/taskSlice';

export default function ToDoList() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const loading = useSelector((state) => state.tasks.loading);

    const taskRef = useRef();

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddTask = () => {
        const taskText = taskRef.current.value;
        if (taskText === '') {
            return;
        }
        dispatch(addTask(taskText));
        taskRef.current.value = '';
    };

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const handleCompleteTask = (id) => {
        dispatch(completeTask(id));
    };

    const renderTaskToDo = () => {
        return tasks
            .filter((task) => !task.status)
            .map((task) => (
                <tr key={task.id}>
                    <td>{task.taskName}</td>
                    <td className="flex justify-end">
                        <button
                            className="btn btn-danger m-2"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-success m-2"
                            onClick={() => handleCompleteTask(task.id)}
                        >
                            Complete
                        </button>
                        <h4 className="mr-2 flex items-center">Task Not Completed</h4>
                    </td>
                </tr>
            ));
    };

    const renderTaskCompleted = () => {
        return tasks
            .filter((task) => task.status)
            .map((task) => (
                <tr key={task.id}>
                    <td>{task.taskName}</td>
                    <td className="flex justify-end mr-4">
                        <button
                            className="btn btn-danger m-2"
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            Delete
                        </button>
                        <button
                            className="btn btn-success m-2 mr-3"
                            onClick={() => handleCompleteTask(task.id)}
                        >
                            Rely Complete
                        </button>
                        <h4 className="mr-2 flex items-center">Task Completed</h4>
                    </td>
                </tr>
            ));
    };

    return (
        <div className="container">
            <h3 className="text-3xl text-center font-bold mt-6">To Do List</h3>
            <div className="my-12 text-center">
                <input
                    className="mx-4 border-2 border-sliver-600 p-1 rounded rounded-xl"
                    placeholder="Task..."
                    type="text"
                    ref={taskRef}
                />
                <button
                    onClick={handleAddTask}
                    className="bg-gray-300 border-2 border-gray-700 p-1 rounded rounded-xl hover:bg-gray-300/75"
                >
                    Add Task
                </button>
            </div>

            {loading ? (
                <p>Loading tasks...</p>
            ) : (
                <>
                    <h1>Tasks Not Completed</h1>
                    <table className="table-auto border-2 w-full">
                        <thead>{renderTaskToDo()}</thead>
                    </table>

                    <h1>Completed Tasks</h1>
                    <table className="table-auto border-2 w-full">
                        <thead>{renderTaskCompleted()}</thead>
                    </table>
                </>
            )}
        </div>
    );
}
