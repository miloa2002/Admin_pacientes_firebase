import { useContext } from "react"
import userContext from "../context/UserProvider"

const UseUser = () => {
    return useContext(userContext)
}

export default UseUser
