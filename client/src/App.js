
import './App.css';
import Post from './components/post';
import Header from './components/header';
import { Route , Routes } from 'react-router-dom';
import Layout from './components/layout';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { UserContextProvider } from './components/userContext';
import CreatePost from './pages/CreatePost';

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path='/'  element={<Layout/>}>
        <Route index element={<IndexPage/>}/>
        <Route path={'/login'} element={<LoginPage/>}/>
        <Route path={'/register'} element={<RegisterPage/>}/>
        <Route path={'/logo'} element={<div>behen ke lundd logo dikh ni ra kya</div>}/>
        <Route path={'/create'} element={<CreatePost/>}/>
      </Route>
        
          
       
      
      
    </Routes>
    </UserContextProvider>
  );
}

export default App;
