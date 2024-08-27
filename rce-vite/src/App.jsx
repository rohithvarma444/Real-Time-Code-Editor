import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:teamID" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
