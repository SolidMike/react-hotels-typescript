import './App.css'
import { HotelList, Filter } from './components'

function App() {
    return (
        <div className="App">
            <header className=""></header>
            <div className="wrapper">
                <aside className="filter">
                    <Filter />
                </aside>

                <HotelList />
            </div>
        </div>
    )
}

export default App
