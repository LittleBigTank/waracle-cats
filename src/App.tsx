import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home.page';
import UploadPage from './pages/upload.page';
import UserPage from './pages/user.page';
import './styles/app.scss';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/upload' element={<UploadPage />} />
        <Route path='/user' element={<UserPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
