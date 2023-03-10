import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const SERVER = 'http://localhost:5000';

const AddPiso = () => {
const [id_edificio, setIdEdificio] = useState("");    
const [nombre, setNombre] = useState("");
const [descripcion, setDescripcion] = useState("");
const [estado, setEstado] = useState("1");

const [edificios, setEdificios] = useState([]);

const navigate = useNavigate();

const savePiso = async(e) => {
    e.preventDefault();
    try {
        await axios.post('http://localhost:5000/pisos',{
            id_edificio,
            nombre,
            descripcion,
            estado
        });
        navigate("/pisos/")
    } catch (error) {
        console.log(error);
    }
}

    useEffect(() => {
        fetch(`${SERVER}/edificios`)
            .then((response) => response.json())
            .then((data) => {
                setEdificios(data);
            })
            .catch((err) => console.log(err));
    }, []);

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={savePiso}>
               <div className="field">
                    <label className='label'>Id edificio</label>
                    <div className="control">
                            <select
                                name='edificio_id'
                                id=''
                                // disabled='disabled'
                                className='input'
                                onChange={(e) => {
                                    setIdEdificio(e.target.value);
                                }}
                            >
                                {edificios.map(({ id, nombre }) => {
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
                            onChange = {(e) => setNombre(e.target.value)} placeholder='Nombre' />
                    </div>
               </div>
               <div className="field">
                    <label className='label'>Descripcion </label>
                    <div className="control">
                        <input 
                            type="text" 
                            className='input' 
                            value={descripcion} 
                            onChange = {(e) => setDescripcion(e.target.value)} placeholder='descripcion' />
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
                    <button type='submit' className='button is-success'> Guardar</button>
               </div>
            </form>
        </div>
    </div>
  )
}

export default AddPiso;