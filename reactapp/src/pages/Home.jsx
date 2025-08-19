// import React from "react";
// import { Link } from "react-router-dom";
// import "../styles/Home.css";

// function Home() {
//   return (
//     <div className="home-page">
//       <h1>Welcome to Expense Management System</h1>
//       <p>Track, submit, and approve expenses with ease.</p>
//       <div className="home-buttons">
//         <Link to="/login">
//           <button>Login</button>
//         </Link>
//         <Link to="/register">
//           <button>Register</button>
//         </Link>
//         {/* <div className="nav-right">
//         <Link to="/admin">
//           <button>Admin</button>
//           </Link>
//         </div> */}
//       </div>
//     </div>
//   );
// }

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <div className="floating-shapes">
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="circle"></span>
        <span className="triangle"></span>
        <span className="triangle"></span>
      </div>

      <h1 className="hero-heading">Welcome to Expense Management System</h1>
      <p className="hero-text">Track, submit, and approve expenses with ease.</p>
      
      <div className="home-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
