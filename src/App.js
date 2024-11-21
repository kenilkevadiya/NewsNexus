// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import Login from './Login';
// import Register from './Register';
// import HomePage from './HomePage';
// import ArticlePage from './ArticlePage';
// import AddArticlePage from './AddArticlePage';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [email, setEmail] = useState('');

//   const handleLogin = (userEmail) => {
//     setIsAuthenticated(true);
//     setEmail(userEmail);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setEmail('');
//   };


//   return (
//     <Routes>
//       <Route path="/" element={<HomePage email={email} />} />
//       <Route path="/login" element={<Login onLogin={handleLogin} />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/add-article" element={<AddArticlePage email={email} />} />
//       <Route path="/article/:articleID" element={<ArticlePage/>} />
//     </Routes>
//   );
// }

// export default App;





import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import HomePage from './HomePage';
import ArticlePage from './ArticlePage';
import AddArticlePage from './AddArticlePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (userEmail) => {
    setIsAuthenticated(true);
    setEmail(userEmail);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail('');
  };

  return (
    <Routes>
      {/* If not authenticated, redirect to login */}
      <Route path="/" element={isAuthenticated ? <HomePage email={email} /> : <Navigate to="/login" />} />
      
      {/* Login Route */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      
      {/* Register Route */}
      <Route path="/register" element={<Register />} />
      
      {/* Add Article Route */}
      <Route path="/add-article" element={isAuthenticated ? <AddArticlePage email={email} /> : <Navigate to="/login" />} />
      
      {/* Article Page Route */}
      <Route path="/article/:articleID" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
