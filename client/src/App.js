import './App.css';
import { Route, Routes } from 'react-router-dom';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Weather/>}></Route>
     </Routes>
    </div>
  );
}

export default App;
