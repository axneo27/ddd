import AddTask from './components/AddTask';
import TasksList from './components/TasksList';

function App() {
  
  return (
    <>
      <div style={{  
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        }}>
        <h1>Tasks</h1>
        <AddTask></AddTask>
        <TasksList></TasksList>

      </div>
    </>
  )
}

export default App;
