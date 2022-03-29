import React from 'react';
import axios from 'axios'
// import { useState, useEffect } from 'react';
// import TacoComponent from './TacoComponent'

// export default function Movies() {
//     const [movie, setMovie] = useState({});
/*
useEffect (escrito asi) se ejecuta siempre
despues de renderizar (retornar) nuestro componente
*/
// useEffect(() => {
//     setTimeout(() => {
//         setTexto("Pasaron 3 segundos!!!");
//     }, 3000)
// })
/*
useEffect (escrito usando DEPENDENCIAS []) 
se ejecuta UNA SOLA VEZ al cargar el componente
esto es el equivalente a 
componentDidMount
*/
function search() {
    document.getElementById('submit').innerHTML = "LOADING..."
}

export default function FetchMovie(e) {

    // console.log(this.shows.name)
    axios.get(`http://api.tvmaze.com/search/shows?q=${search}`)
        .then(res => {
            console.log(res.data);
        }).onrejected(err => {
            console.log(err);
            console.log();



            return (
                <div>
                    {/* <form onSubmit={this.FetchMovie(e)}> */}
                    <input
                        className='inputSubmit'
                        id='submit'
                        type='text'
                        placeholder="Search"
                        show='show' />
                    {/* </form> */}
                    <button onclick={
                        FetchMovie(search())
                    }>Search</button>

                </div >
            )
        }



//     const movieAPI = `http://api.tvmaze.com/search/shows?q=${search}`;

//     async function getMovie() {
//         try {
//             const response = await axios.get(movieAPI);
//             setMovie(response.data);
//         } catch (error) {
//             alert("ocurrio un error");
//         }
//     }

//     useEffect(() => {
//         setTimeout(getMovie, 1500);
//     }, []);


//     // useEffect(
//     //     () => {
//     //         console.log("Hola desde el useEffect!!!")
//     //     }, [])
//     return (
//         < div className="container" >
//             <h1>Peticiones</h1>
//             <h2>useEffect</h2>
//             <h3>- Taco Fancy API -</h3>

//             {
//                 taco.condiment
//                     ? <TacoComponent taco={taco} />
//                     : <span>Estamos eligiendo el taco ideal para ti </span>
//             }

//         </div>
//     )
// }
