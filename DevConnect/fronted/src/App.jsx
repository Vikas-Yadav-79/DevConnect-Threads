import { Button } from '@chakra-ui/button'
import { Container } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Header from './components/Header'; // Adjusted import statement
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';


function App() {

  return (

    <Container maxWidth={"620px"}>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/auth' element={<AuthPage/>}></Route>
        <Route path='/:username' element={<UserPage />}></Route>
        <Route path='/:username/post/:pid' element={<PostPage />}></Route>
      </Routes>
    </Container>
  )
}

export default App
