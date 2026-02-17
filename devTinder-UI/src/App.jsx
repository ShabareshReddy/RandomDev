import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import LandingPage from "./pages/landingPage/LandingPage";
import AuthRedirectHandler from "./components/AuthRedirectHandler";
function App() {
  return (
    <>
      <Provider store={appStore}>

        {/* Global Auth Redirect Handler */}
        <AuthRedirectHandler />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Requests />} />
          </Route>
        </Routes>

      </Provider>

    </>
  );
}

export default App;














// import React from 'react'
// import LandingLayout from './layouts/LandingLayout'
// import MainLayout from './layouts/MainLayout'
// import { Routes, Route } from 'react-router-dom'
// import LandingPage from './pages/landingPage/LandingPage'
// import Login from './pages/auth/Login'
// import Signup from './pages/auth/Signup'
// // import Feed from './pages/mainPage/Feed'
// // import Profile from './pages/mainPage/Profile'
// // import Connections from './pages/mainPage/Connections'
// // import Requests from './pages/mainPage/Requests'
// const App = () => {
//   return (
//     <div>
//       <Routes>
//         <Route element={<LandingLayout />}>
//           <Route path='/' element={<LandingPage />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/signup' element={<Signup />} />
//         </Route >

//         {/* <Route element={<MainLayout />}>
//           <Route path='/feed' element={<Feed />} />
//           <Route path='/profile' element={<Profile />} />
//           <Route path='/connections' element={<Connections />} />
//           <Route path='/requests' element={<Requests />} />
//         </Route> */}
//       </Routes>
//     </div>
//   )
// }

// export default App
