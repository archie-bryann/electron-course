import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState({} as any);

  // @ts-ignore
  // window.electron.getStaticData();

  useEffect(() => {
    // window.electron.subscribeStatistics((stats) => {
    //   setStats(stats);
    //   return {}; // Return empty object to satisfy the type requirement
    // })

    const unsubStats = window.electron.subscribeStatistics((stats) => {
      console.log(stats)
    })

    const unsubView = window.electron.subscribeChangeView((view) => console.log(view));

    return () => {
      unsubStats();
      unsubView();
    }

  }, [])

  return (
    <>
    <header>
      <button id = "close"
      onClick = {() => window.electron.sendFrameAction("CLOSE")}
      >Close</button> &nbsp;
      <button id = "minimize" onClick = {() => window.electron.sendFrameAction("MINIMIZE")}>Minimize</button> &nbsp;
      <button id = "maximize" onClick = {() => window.electron.sendFrameAction("MAXIMIZE")}>Maximize</button>
    </header>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
