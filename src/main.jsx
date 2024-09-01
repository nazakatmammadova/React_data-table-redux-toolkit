import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.css"
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { Provider } from 'react-redux'
import {store} from "./redux/store.jsx"

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
