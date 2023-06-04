import { useState } from "react"
import { useNavigate } from "react-router-dom";
import UseUser from "../hook/UseUser";

const Form = () => {
    const [register, setRegister] = useState(false);
    const [error, setError] = useState("");

    const { logIn, SignUp, googleLogin } = UseUser();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const mail = e.target.email.value;
        const password = e.target.password.value;

        try {
            if (register) {
                await SignUp(mail, password);
            } else {
                await logIn(mail, password);
                navigate("/home")
            }
        } catch (error) {
            setError(error.code)
        }
    }

    const signGoogle = async() =>{
        await googleLogin()
        navigate("/home")
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-bold uppercase text-center text-purple-700">
                    {register ? " Registrate" : "Inicia sesión"}
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="email"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="password"
                        />
                    </div>

                    <div className="mt-6" type="submit">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            {register ? " Registrate" : "Inicia sesión"}
                        </button>

                    </div>
                </form>
                <button onClick={signGoogle} className="w-full mt-5 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Ingresar con Google
                </button>

                {error && <p className="bg-red-700 rounded-md mt-5 px-4 py-2 text-white">{error}</p>}

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    {register ? " Ya tienes una cuenta?" : "No tienes una cuenta?"}{" "}
                    <button
                        className="font-medium text-purple-600 hover:underline"
                        onClick={() => setRegister(!register)}
                    >
                        {register ? " Inicia sesión" : "Registrate"}
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Form
