import { UserProvider } from "./context/UserProvider"
import Login from "./pages/Login"
import Router from "./router/Router"

function App() {
  return (
    <UserProvider>
      <Router>
        <Login />
      </Router>
    </UserProvider>
  )
}

export default App
