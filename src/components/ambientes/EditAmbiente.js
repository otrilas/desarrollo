import React , {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate , useParams} from 'react-router-dom';
const SERVER = 'http://localhost:5000';

const EditAmbiente = () => {
const [id_piso, setIdPiso] = useState("");
const [id_tipo_ambiente, setIdTipoAmbiente] = useState("");
const [nombre, setNombre] = useState("");
const [descripcion, setDescripcion] = useState("");
const [estado, setEstado] = useState("1");

const [pisos, setPisos] = useState([]);
const [tipoambientes, setTipoAmbientes] = useState([]);
const navigate = useNavigate();
const {id} = useParams();

useEffect(() => {
    getAmbienteById();
},[]);

const updateAmbiente = async(e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:5000/ambientes/${id}`,{
            id_piso,
            id_tipo_ambiente,
            nombre,
            descripcion,
            estado
        });
        navigate("/ambientes/")
    } catch (error) {
        console.log(error);
    }
}

const getAmbienteById = async () => {
    const response = await axios.get(`http://localhost:5000/ambientes/${id}`);
    setIdPiso(response.data.id_piso);
    setIdTipoAmbiente(response.data.id_tipo_ambiente);
    setNombre(response.data.nombre);
    setDescripcion(response.data.descripcion);
    setEstado(response.data.estado);
}
useEffect(() => {
    fetch(`${SERVER}/pisos`)
        .then((response) => response.json())
        .then((data) => {
            setPisos(data);
        })
        .catch((err) => console.log(err));
    
    fetch(`${SERVER}/tipoambientes`)
        .then((response) => response.json())
        .then((data) => {
            setTipoAmbientes(data);
        })
        .catch((err) => console.log(err));
}, []);

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateAmbiente}>
               <div className="field">
                    <label className='label'>Id Piso </label>
                    <div className="control">
                            <select
                                name='piso_id'
                                id=''
                                className='input'
                                onChange={(e) => {
                                    setIdPiso(e.target.value);
                                }}
                            >
                                {pisos.map(({ id, nombre }) => {
                                    return (
                                        <option key={id} value={id}>
                                            {nombre}
                                        </option>
                                    );
                                })}
                            </select>
                    </div>
               </div>
               <div className="field">
                    <label className='label'>Id Tipo Ambiente </label>
                    <div className="control">
                            <select
                                name='tipoambiente_id'
                                id=''
                                className='input'
                                onChange={(e) => {
                                    setIdTipoAmbiente(e.target.value);
                                }}
                            >
                                {tipoambientes.map(({ id, nombre }) => {
                                    return (
                                        <option key={id} value={id}>
                                            {nombre}
                                        </option>
                                    );
                                })}
                            </select>
                    </div>
               </div>
               <div className="field">
                    <label className='label'>Nombre </label>
                    <div className="control">
                        <input 
                            type="text" 
                            className='input' 
                            value={nombre} 
                            onChange = {(e) => setNombre(e.target.value)} 
                            placeholder='Nombre' />
                    </div>
               </div>
               <div className="field">
                    <label className='label'>Descripcion </label>
                    <div className="control">
                        <input 
                            type="text" 
                            className='input' 
                            value={descripcion} 
                            onChange = {(e) => setDescripcion(e.target.value)} placeholder='Descripcion' />
                    </div>
               </div>

               <div className="field">
                    <label className='label'>Estado </label>
                    <div className="control">
                        <div className="select isfullwidth" >
                            <select value={estado} onChange = {(e) => setEstado(e.target.value)}>
                                <option value="1">Activo</option>
                                <option value="0">Desactivo</option>
                            </select>
                        </div>
                    </div>
               </div>

               <div className="field">
                    <button type='submit' className='button is-success'> UPDATE</button>
               </div>
            </form>
        </div>
    </div>
  )
}

export default EditAmbiente;