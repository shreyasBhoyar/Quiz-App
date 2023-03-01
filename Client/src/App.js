import { BrowserRouter,Route,Routes } from 'react-router-dom';
import AdminDashBoard from './components/adminDashboard';
import CreateQuiz from './components/createQuiz';
import QuizStats from './components/QuizStats';
import ErrorPage from './components/ErrorPage';
import EditQuiz from './components/EditQuiz';
import UserQuiz from "./components/userQuiz"
import ResultPage from './components/userResult';
import './App.css';
import Header from './components/Header';


const App=()=> {
  return (
  <>
  <Header />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminDashBoard/>} />
      <Route path="/quiz/create" element = {<CreateQuiz />} />
      <Route path="/quiz/report/:id" element = {<QuizStats />} />
      <Route path="/quiz/:id" element={<EditQuiz />} />
      <Route path="/quiz/preview/:id" element={<UserQuiz />} />
      <Route path="/user/quiz/:id" element={<UserQuiz />} />
      <Route path="/user/result/:id" element={<ResultPage />} />
      <Route path="*" element = {<ErrorPage />} />
    </Routes>
    </BrowserRouter>
    </>
    
  );
}

export default App;
