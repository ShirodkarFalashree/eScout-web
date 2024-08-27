import { useState } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Main from './components/main/Main';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <Main toggleSidebar={toggleSidebar} />
    </div>
  );
}

export default App;