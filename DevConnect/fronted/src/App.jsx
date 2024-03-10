import { Button } from '@chakra-ui/button'
import { Container } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import Header from './components/Header'; // Adjusted import statement
import UserPage from './pages/UserPage';
import PostPage from './pages/PostPage';


function App() {

  return (

    <Container maxWidth={"620px"}>
      {/* <Userheader/> */}
      <Header />
      <Routes>
        <Route path='/:username' element={<UserPage />}></Route>
        <Route path='/:username/post/:pid' element={<PostPage />}></Route>
      </Routes>
    </Container>
  )
}

export default App
