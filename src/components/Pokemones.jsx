import { useDispatch, useSelector } from "react-redux";
import { obtenerPokemonesAccion, siguientePagina, paginaAnterior, detallePokemon } from "../redux/pokeDucks";
import Detalle from './Detalle';

const Pokemones = () => {
    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.results);
    const next = useSelector(store => store.pokemones.next);
    const previous = useSelector(store => store.pokemones.previous);

    return (
        <div className="row">
            <div className="col-md-6">
                <h3>Lista de pokemones</h3>
                <br />
                <div className="d-flex justify-content-between">
                    {
                        pokemones.length === 0 &&
                        <button onClick={() => dispatch(obtenerPokemonesAccion())} className="btn btn-dark">Get pokemones</button>
                    }

                    {
                        next &&
                        <button onClick={() => dispatch(siguientePagina())} className="btn btn-success">Siguiente página</button>
                    }

                    {
                        previous &&
                        <button onClick={() => dispatch(paginaAnterior())} className="btn btn-success">Pagina anterior</button>
                    }
                </div>
                <ul className="list-group mt-3">
                    {
                        pokemones.map(item => (
                            <li key={item.name} className="list-group-item text-uppercase">
                                {item.name}
                                <button
                                    className="btn btn-danger btn-sm float-end"
                                    onClick={()=> dispatch(detallePokemon(item.url))}
                                >
                                    Info
                                </button>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-md-6">
                <h3>Detalle pokemon</h3>
                <Detalle/>
            </div>
        </div>
    );
}

export default Pokemones;
