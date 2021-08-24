import {useEffect, useState} from 'react'
import { fetchCharacters } from '../../../services/marvelAPI';
import { CONSTANT_VARIABLES } from '../../../config/constants';
import Loading from '../../core/loading/Loading';

//css
import CharactersCSS from "./Characters.module.css";
import Pagination from '../../core/pagination/Pagination';

const characterInput = {
    name: "",
    offset: "0",
    limit: "18",
    total: 0,
    currentPage: 1
}

const Characters = () => {
    const [searchInput, setSearchInput] = useState(characterInput)
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=> {
        getCharacters(searchInput);
    },[])


    const getCharacters = async (params) => {
        const {name, offset, limit} = params;
        const newParams = {name, offset, limit};
        setIsLoading(true);
        const response = await fetchCharacters(newParams);
        const {results, status, total} = response;

        if(status === 200) {
            const newCharacters = results.map((result) => {
                const {id, name, description, thumbnail, urls} = result;
                const details = urls.find((url) => url.type === "detail")
                const character = {id, name, description, thumbnail, details};
                return character;
            })
            setCharacters(newCharacters);
            setSearchInput({... searchInput, total});
        } else {

        }

        setIsLoading(false);
    }

    const searchClick = (params) => {
        searchInput.offset = 0;
        searchInput.currentPage = 1;
        getCharacters(params);
    }

    const changePage = (pagenumber) => {
        const offset = pagenumber === 1? 0 : Number(searchInput.limit) * (pagenumber - 1);
        searchInput.offset = offset;
        getCharacters(searchInput);
    }


    return (
        <>
            <h3 className="title">Marvel Characters List</h3>
            <section className={`${CharactersCSS.searchContainer}`}>
                <input type="text" 
                    className={`${CharactersCSS.upperCase} form-control`} 
                    placeholder="TYPE CHARACTER HERE..." 
                    id="characterName"
                    name="characterName"
                    value={searchInput.name} 
                    onChange={(e) => setSearchInput({...searchInput, name: e.target.value})}/>
                <button className="btn btn-primary" onClick={() => searchClick(searchInput)}>Search</button>
            </section>
            <div className="row">
                {isLoading && <Loading/>}
                {characters.map((character)=> {
                    return <div key={character.id} className="col-lg-2">
                        <CharacterCard  {... character}/>
                    </div>
                })}
            </div>
            <div className={`${CharactersCSS.paginationContainer}`}>
                <Pagination key={searchInput.total} {...searchInput} sendPageNumber={(pagenumber) => changePage(pagenumber)}/>
            </div>
        </>

    )
}

const CharacterCard = ({id, name, description, thumbnail, details}) => {
    const {path, extension} = thumbnail;
    const imageURL = `${path}/portrait_fantastic.${extension}`;
    
    return (
        <>
            <div className={`card ${CharactersCSS.cardCharacter}`}>
                <a  className={`${CharactersCSS.overlayRedHover}`} href={details.url} target="_blank">
                    <h1>See <br/>More</h1>
                </a>
                <div className={`${CharactersCSS.imgContainer}`}>
                    <img src={imageURL} alt={name} loading={"lazy"}/>
                </div>
                <div className={`${CharactersCSS.cardTextContainer}`}>
                    <h6>{name}</h6>
                    <p>{description? description : CONSTANT_VARIABLES.infoUnavailable}</p>
                </div>
            </div>


        </>
    );
}

export default Characters
