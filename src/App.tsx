import Stoplight from './components/Stoplight';

export default function App() {
  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">A LITTLE REACT IN MOTION</p>
        <h1>Stoplight</h1>
        <p className="subtitle">Three lights. One continuous rhythm.</p>
      </header>
      <Stoplight />
      <footer className="app-footer">An 8-second cycle, on repeat.</footer>
    </main>
  );
}
