import {AppShell} from "@mantine/core";
import { NavBar } from './components/Navbar';
import { useLocalStorage } from "./hooks/useLocalStorage";
import {Home} from "./components/Home";
import {Footer} from "./components/Footer";

type ActiveView = 'home' | 'products' | 'about';

export default function App() {
  const [activeView, setActiveView] = useLocalStorage<ActiveView>('store-active-view', 'home');
  
  const renderMainContent = () => {
    switch (activeView) {
      case 'home':
        return <Home />;
    }
  };

  return (
    <AppShell>
      <div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal">

        <AppShell.Header>
          <NavBar activeView={activeView} onViewChange={setActiveView} />
        </AppShell.Header>
        
        <AppShell.Main>
          {renderMainContent()}
        </AppShell.Main>

        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </div>
    </AppShell>
    
  );
};
