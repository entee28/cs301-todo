import "./css/login.css";

export const Login = () => {
  const handleLogin = () => {
    window.location.replace(import.meta.env.VITE_COGNITO_AUTH_ENDPOINT);
  };

  const handleSignup = () => {
    window.location.replace(import.meta.env.VITE_COGNITO_SIGNUP_ENDPOINT);
  }

  return (
    <>
    <div className="container">
      <div className="login-banner row">
        {/* logo-banner start */}
        <div className="logo-todo col-md-6 bg-dark position-relative">
          <h2 className="position-absolute text-white logo-text">TodoGenie</h2>
          <img className="w-100" src="./images/logoTodo.png" alt="Logo Todo" />
        </div>
        {/* logo-banner end */}

        {/* todo website introduction start */}
        <div className="col-md-6 align-self-center ps-md-5">
          <h1 className="mb-3 fw-bold">An Intuitive To-do Website</h1>
          <p className="text-white mb-3">Welcome to TodoGenie, the ultimate online productivity tool for managing your tasks and staying organized. With our user-friendly interface, you can effortlessly create, edit, and organize tasks, set due dates and reminders, and track your progress with ease. Start your journey to increased productivity today with TodoGenie!</p>
          <button className="w-100 mb-3" onClick={handleLogin}>Get Started</button>
          <div className="text-center">
            <a href="#" className="text-warning text-decoration-underline" onClick={handleSignup}>Don't have an ancount? Sign up</a>
          </div>
        </div>
        {/* todo website introduction end */}
      </div>
    </div>
    </>
  );
};
