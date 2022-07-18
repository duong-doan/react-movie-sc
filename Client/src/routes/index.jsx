import React from 'react';
import { Route, Routes } from 'react-router-dom';
import routes from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        {routes.map((route, i) => {
          return (
            <Route
              key={i}
              path={route.path}
              exact={route.exact}
              element={route.component}
            />
          );
        })}
      </Routes>
      <div>
        <ToastContainer
          position='top-right'
          // autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </div>
    </>
  );
}

export default App;
