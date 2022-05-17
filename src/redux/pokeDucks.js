import axios from 'axios';

// constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

const OBTENER_POKEMONES_EXITO = 'OBTENER_POKEMONES_EXITO';
const SIGUIENTE_POKEMONES_EXITO = 'SIGUIENTE_POKEMONES_EXITO';
const ANTERIOR_POKEMONES_EXITO = 'ANTERIOR_POKEMONES_EXITO';
const DETALLE_POKEMON_EXITO = 'DETALLE_POKEMON_EXITO';

// reducer
export default function pokeReducer(state = dataInicial, action) {
    switch (action.type) {
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload };
        case SIGUIENTE_POKEMONES_EXITO:
            return {...state, ...action.payload };
        case ANTERIOR_POKEMONES_EXITO:
            return {...state, ...action.payload };
        case DETALLE_POKEMON_EXITO:
            return {...state, unPokemon: action.payload}
        default:
            return state;
    }
}

// acciones
export const obtenerPokemonesAccion = () => async (dispatch) => {

    if(localStorage.getItem('offset=0')){
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try{
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=15&offset=0');
        dispatch({
            type: OBTENER_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data));
    }catch(error){
        console.log(error);
    }
}

export const siguientePagina = () => async (dispatch, getState) => {
    const {next} = getState().pokemones;

    if(localStorage.getItem(next)){
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {
        const res = await axios.get(next);
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const paginaAnterior = () => async (dispatch, getState) => {
    const {previous} = getState().pokemones;

    if(localStorage.getItem(previous)){
        dispatch({
            type: ANTERIOR_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try {
        const res = await axios.get(previous);
        dispatch({
            type: SIGUIENTE_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data));
    } catch (error) {
        console.log(error);
    }
}

export const detallePokemon = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async(dispatch) => {

    if(localStorage.getItem(url)){
        dispatch({
            type: DETALLE_POKEMON_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        console.log("desde localStorage");
        return
    }

    try {
        console.log("desde la api");
        const res = await axios.get(url);
        dispatch({
            type: DETALLE_POKEMON_EXITO,
            payload: {
                nombre: res.data.name,
                alto: res.data.height,
                ancho: res.data.weight,
                imagen: res.data.sprites.front_default
            }
        })
        localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            alto: res.data.height,
            ancho: res.data.weight,
            imagen: res.data.sprites.front_default
        }));
    }catch (error){
        console.log(error);
    }
}