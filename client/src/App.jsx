import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainScreen/>}/>
        <Route path='login' element={<LoginScreen/>}/>
        <Route path='register' element={<RegisterScreen/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
