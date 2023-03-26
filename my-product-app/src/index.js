import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import ProductDetail from './ProductDetail';
import Report from './Report'
import HomeHotrate from './HomeHotrate';
import Reportbrand from './Reportbrand';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<Home />} />
      <Route path="/product/:productId" element={<ProductDetail/>} />
      <Route path="report" element={<Report />} />
      <Route path="reportbrand" element={<Reportbrand />} />
      <Route path="homehot" element={<HomeHotrate />} />
     
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Login />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
