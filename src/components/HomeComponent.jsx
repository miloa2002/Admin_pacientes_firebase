import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import UseUser from "../hook/UseUser"
import PatientsList from "./PatientsList";
import {addDoc, collection, doc, getFirestore, updateDoc} from "firebase/firestore"
import { firebaseApp } from "../firebase/firebaseConfig";
import { getPatients } from "../api/api";

export const firestore = getFirestore(firebaseApp)

const HomeComponent = () => {
    const { auth, globalUser } = UseUser();
    const {email} = globalUser;

    const [arrayPatients, setArrayPatients] = useState([]);

    const [nombrePaciente, setNombrePaciente] = useState("")
    const [sintomas, setSintomas] = useState("")
    const [tel, setTel] = useState("")

    const [edit, setEdit] = useState(false)

    const [selectId, setSelectId] = useState("")

    const newUserEdit = {
        nombrePaciente: nombrePaciente,
        sintomas: sintomas,
        tel: tel
    }

    
    const getPatientsData = async ()=>{
        try {
            const data = await getPatients(email);
            const docs = [];
            data.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setArrayPatients(docs)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPatientsData();
    }, [])


    const handleSubmit = async(e) =>{
        e.preventDefault();


        if(selectId){

            const docRef = doc(firestore, "users", email, "pacientes", selectId);

            try {
                await updateDoc(docRef, newUserEdit)
                await getPatientsData()
            } catch (error) {
                console.log(error);
            }

        }else{

            const newUser = {
                nombrePaciente,
                sintomas,
                tel
            }
    
            const docRef = collection(firestore, "users", email, "pacientes");
    
            try {
                setArrayPatients([...arrayPatients, newUser])
                await addDoc(docRef, newUser);
                await getPatientsData()
    
                setNombrePaciente("")
                setSintomas("")
                setTel("")
            } catch (error) {
                console.log(error);
            }
        }

    }

    
    const handleEditar = (id) =>{
        const patient = arrayPatients.find(arrayPatient => arrayPatient.id === id);
        setNombrePaciente(patient.nombrePaciente)
        setSintomas(patient.sintomas)
        setTel(patient.tel)
        
        setSelectId(id)
        setEdit(true)
    }



    return (
        <>
            <div className="bg-purple-700 p-8 text-white md:flex items-center justify-between">
                <div>
                    <h2 className="text-3xl">Administra tus <span className="font-bold">pacientes</span></h2>
                    <p>Bienvenido: <span className="font-bold">{email}</span></p>
                </div>
                <button className="font-medium text-white hover:underline" onClick={() => signOut(auth)}>Cerrar sesión</button>
            </div>

            <div className="md:flex justify-between items-center mt-12">
                <form className="mt-6 w-1/2 mx-auto" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Nombre paciente
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="name"
                            value={nombrePaciente}
                            onChange={e => setNombrePaciente(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="sintomas"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Sintomas
                        </label>
                        <input
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="sintomas"
                            value={sintomas}
                            onChange={e => setSintomas(e.target.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label
                            htmlFor="number"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Telefono de contacto
                        </label>
                        <input
                            type="tel"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            id="tel"
                            value={tel}
                            onChange={e => setTel(e.target.value)}
                        />
                    </div>

                    <div className="mt-6" type="submit">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            {edit ? "Editar paciente" : "Crear paciente"}
                        </button>

                    </div>
                </form>
                <div className="lg:max-w-lg w-1/2 mx-auto">
                    <h2 className="text-center font-bold text-2xl mb-4 text-purple-600">
                        {arrayPatients.length == 0 ? "Comienza a administrar tus pacientes" : "Administra tus citas"}
                    </h2>
                    <PatientsList arrayPatients={arrayPatients} setArrayPatients={setArrayPatients} email={email} getPatientsData={getPatientsData} handleEditar={handleEditar}/> 
               </div>
            </div>
        </>
    )
}

export default HomeComponent
