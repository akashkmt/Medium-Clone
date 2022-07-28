import * as ReactDOM from 'react-dom/client';
import App from './App';
import BorwserRouter, { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
<BrowserRouter>
<App />
</BrowserRouter>
  );

