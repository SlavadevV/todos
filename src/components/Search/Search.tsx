import './style.css'
import { ReactComponent as Magnifier } from '../../svg/magnifier.svg'
import Input from '../Input/Input'
import { useState, ChangeEvent, Dispatch, FC } from 'react';
import { SortBy } from '../../types/notes';
import { ReactComponent as SortTitle } from '../../svg/alphabet-sort.svg'
import { ReactComponent as Clock } from '../../svg/clock.svg'

interface ISearchProps {
    query: string;
    setQuery: Dispatch<React.SetStateAction<string>>;
    setSortType: Dispatch<React.SetStateAction<SortBy>>;
}

const Search: FC<ISearchProps> = ({ query, setQuery, setSortType }) => {
    const [isSearch, setIsSearch] = useState(false);

    const searchClickHandler = () => {
        setIsSearch(!isSearch)
    }

    const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    const sortByTitleHandler = () => {
        setSortType('title')
    }

    const sortByDateHandler = () => {
        setSortType('createdDate')
    }

    return (
        <div data-testid={"search"} className={'searchWrapper'}>
            <div className={'searchIcon'} onClick={searchClickHandler}><Magnifier /></div>
            <div className={`searchInput ${isSearch ? 'searchOpen' : ''}`}>
                <Input data-testid={"search-input"} value={query} onChange={searchHandler} />
                <span onClick={sortByTitleHandler}><SortTitle /></span>
                <span onClick={sortByDateHandler}><Clock className={'icons'} /></span>
            </div>
        </div>
    )
}

export default Search
