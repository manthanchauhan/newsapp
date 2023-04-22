import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {path: "/",element: <News pageSize={12} country={"in"}/>,},
  {path: "/business",element: <News pageSize={12} country={"in"} category={"business"}/>,},
  {path: "/entertainment",element: <News pageSize={12} country={"in"} category={"entertainment"}/>,},
  {path: "/health",element: <News pageSize={12} country={"in"} category={"health"}/>,},
  {path: "/science",element: <News pageSize={12} country={"in"} category={"science"}/>,},
  {path: "/sports",element: <News pageSize={12} country={"in"} category={"sports"}/>,},
  {path: "/technology",element: <News pageSize={12} country={"in"} category={"technology"}/>,},
]);

export default class App extends Component {
  render() {
    return (
      <div>
        <React.StrictMode>
          <Navbar/> 
          <RouterProvider router={router} />
        </React.StrictMode>
      </div>
    )
  }
}
