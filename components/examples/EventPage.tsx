import EventPage from '../EventPage';

export default function EventPageExample() {
  const handleLogout = () => {
    console.log('Logout clicked - would navigate to login page');
  };

  return <EventPage onLogout={handleLogout} />;
}