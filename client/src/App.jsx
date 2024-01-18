import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainScreen from './components/MainScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import { AuthContextProvider } from './context/auth';

function App() {
  return (
      <BrowserRouter>
        <AuthContextProvider key={'auth-context-provider'}>
        <Routes>
          <Route path='/' element={<MainScreen />} />
          <Route path='login' element={<LoginScreen />} />
          <Route path='register' element={<RegisterScreen />} />
        </Routes>
        </AuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
