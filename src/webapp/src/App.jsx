import './App.css';
import { Routes, Route } from 'react-router-dom';

import SignIn from './pages/signin';
import ProctorSignIn from './pages/proctor_signin';
import ProctorCreateExam from './pages/proctor_create_exam';

function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="proctor" element={<ProctorSignIn />} />
          <Route path="proctor/create_exam" element={<ProctorCreateExam />} />
        </Routes>
      </div>
    </>
  )
}

export default App
