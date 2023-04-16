import { createRoot } from 'react-dom/client';
import Todo from './App/App';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(
    <Todo />
);