import './App.css';
import Game from './components/Game';
function App() {
  const title = "Squadro ReactJS"
  return (
    <div className="App">
      <h1> {title} </h1>
      <Game/>
    </div>
  );
}

export default App;
