import './App.css';
import DiscordLogin from './components/DiscordLogin';
import GoogleLogin from './components/GoogleLogin';

function App() {
  return (
    <div className="App">
      <header>
        Social Logins
      </header>
      <section>
        <GoogleLogin />
        <DiscordLogin />
      </section>
    </div>
  );
}

export default App;
