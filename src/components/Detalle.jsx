import { useSelector } from "react-redux";

const Detalle = () => {

    const pokemon = useSelector(store => store.pokemones.unPokemon);

    return pokemon ? (
        <div className="card mt-4 text-center">
            <div className="card-body">
                <img src={pokemon.imagen} alt="pokemon" className="img-fluid"/>
                <div className="card-title text-uppercase">{pokemon.nombre}</div>
                <p className="card-text">Alto: {pokemon.alto} | Ancho: {pokemon.ancho}</p>
            </div>
        </div>
    ): null
}

export default Detalle;