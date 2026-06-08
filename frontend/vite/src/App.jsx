import Chat from "./Chat"
import Entry from "./Entry"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const App = () => {
        
        return(
    <BrowserRouter>
    <Routes>
        <Route path="/" element = {<Entry/>}/>
        <Route path="/chat" element = {<Chat/>}/>
    </Routes>
    </BrowserRouter>
        )
}

export default App