export const Login = () => {
  const handleLogin = () => {
    window.location.replace(import.meta.env.VITE_COGNITO_AUTH_ENDPOINT);
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};
