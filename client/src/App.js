import {useEffect,useState} from 'react';
import './App.css';
import Login from './Components/LoginWindow/Login';
import {LoginContext} from './Components/LoginWindow/LoginContext';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch} from "react-redux";
import { getPostsByPages } from './Redux/storeReducer';
import MainWindow from './Components/MainWindow/MainWindow';

function App() {
  const [context, setContext] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    // TEST API, it might be removed
    dispatch(getPostsByPages(1))
    fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
      console.log('API CONNECTION IS OK');
    }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
  });

  return (
    <Router>
      <LoginContext.Provider value={[context,setContext]}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainWindow />} />
      </Routes>
      </LoginContext.Provider>
    </Router>
  );
}

export default App;
