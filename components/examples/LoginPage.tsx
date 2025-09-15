import LoginPage from '../LoginPage';

export default function LoginPageExample() {
  const handleLogin = () => {
    console.log('Login successful - would navigate to event page');
  };

  return <LoginPage onLogin={handleLogin} />;
}