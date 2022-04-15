import logo from './logo.svg';
import './App.css';
import NeuralNetwork from './NeuralNetwork';
import Canvas from './Canvas';

function App() {
  return (
    <div className='App'>
      <header>
        <p>Trained Path finder</p>
      </header>
      <NeuralNetwork></NeuralNetwork>
      <Canvas/>
    </div>
  );
}

export default App;
