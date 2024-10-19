import react from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import MessageWelcomePage from './MessageWelcomePage';
import MessageUser from './MessageUser';

function App() {
 

  return (
    <Router>
    
        <Routes>
          <Route path="/" element={<MessageWelcomePage/>} />
          <Route path='/MainMessage' element={<MessageUser/>}/>
        </Routes>
      
    </Router>
  )
}

export default App
