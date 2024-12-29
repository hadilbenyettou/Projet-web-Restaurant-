

import { BrowserRouter as Router } from 'react-router-dom';
import Main from './components/Main';
import { AuthProvider } from './context/AuthContext'; // Import the AuthProvider

export default function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the Main component with AuthProvider */}
        <Main />
      </AuthProvider>
    </Router>
  );
}
