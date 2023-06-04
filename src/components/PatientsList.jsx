import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "./HomeComponent";

const PatientsList = ({ arrayPatients, setArrayPatients, email, getPatientsData, handleEditar }) => {

  const handleEliminar = async(id) =>{
    if (!id) {
      console.error("El id es nulo o indefinido");
      return;
    }

    const docRef = doc(firestore, "users", email, "pacientes", id);
    try {
      await getPatientsData();
      setArrayPatients(arrayPatients.filter(
        (arrayPatient) => arrayPatient.id !== id)
      )
      await deleteDoc(docRef)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="overflow-y-scroll h-96">
      {arrayPatients.map((arrayPatient) => (
      <div className="py-12 w-96 mx-auto px-4 shadow-md" key={arrayPatient.id}>
        {" "}
        <div className="space-y-2">
          {" "}
          <p className="text -2xl font-bold">Nombre del paciente: <span className="font-normal">{arrayPatient.nombrePaciente}</span></p>
            <p className="text -2xl font-bold">
              Sintomas del paciente: <span className="font-normal">{arrayPatient.sintomas}</span>
          </p>
            <p className="text -2xl font-bold">Telefono de contacto: <span className="font-normal">{arrayPatient.tel}</span> </p>
        </div>
        <div className="mt-5">
            <button className="bg-red-600 mr-5 py-1 px-3 text-white rounded-md hover:bg-red-700" onClick={()=>handleEliminar(arrayPatient.id)}>Eliminar</button>
            <button className="bg-blue-600 mr-5 py-1 px-3 text-white rounded-md hover:bg-blue-700" onClick={() => handleEditar(arrayPatient.id)}>Editar</button>
        </div>
      </div>
      ))}
    </div>
  );
};

export default PatientsList;
