import { useEffect, useState } from 'react';
import './App.css'
import { useAppDispatch, useAppSelector } from './app/hooks'
import Button from './components/Button/Button';
import Note from './components/Note/Note';
import Popup from './components/Popup/Popup';
import { selectNotes } from './slices/notes'
import { createNote } from './slices/notes';
import { v4 as uuid } from 'uuid';
import { INotes, SortBy } from './types/notes';
import Search from './components/Search/Search';

function App() {
  const notes = useAppSelector(selectNotes)
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [sortType, setSortType] = useState<SortBy>('createdDate');
  const [sortedNotes, setSortedNotes] = useState<INotes[]>([])

  useEffect(() => {
    const newNotes = notes.filter((note) => {
      return note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.description.toLowerCase().includes(search.toLowerCase());
    });
    setSortedNotes(newNotes)
  }, [search])

  useEffect(() => {
    let sorted: INotes[] = [];
    if (sortType === 'title') {
      sorted = [...notes].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortType === 'createdDate') {
      sorted = [...notes].reverse();
    }

    if (search.length) {
      sorted = [...sorted].filter((note) => {
        return note.title.toLowerCase().includes(search.toLowerCase()) ||
          note.description.toLowerCase().includes(search.toLowerCase());
      });
    }
    setSortedNotes(sorted);
  }, [sortType, search, notes]);


  const createNoteClickHandler = () => {
    setIsOpen(true)
  }

  const clearPopup = () => {
    setDescription('');
    setTitle('');
  }

  const closePopup = () => {
    setIsOpen(false);
    clearPopup();
  }

  const createNoteHandler = () => {
    if (description && title) {
      dispatch(createNote({ description: description, title: title, id: uuid() }))
      setIsOpen(false);
      clearPopup();
    }
  }

  return (
    <div className='app-wrapper'>
      {notes.length && !sortedNotes.length
        ? notes.map(note => (
          <Note
            {...note}
          />
        ))
        : sortedNotes.length ? sortedNotes.map(note => (
          <Note
            {...note}
          />
        )) : <h2 style={{ marginBottom: '1rem' }}>You don't have any notes yet</h2>
      }
      <Button text='Create' onClick={createNoteClickHandler} />
      {isOpen &&
        <Popup
          setDescription={setDescription}
          setTitle={setTitle}
          onSubmit={createNoteHandler}
          closePopup={closePopup}
        />}
      <Search
        setSortType={setSortType}
        setQuery={setSearch}
        query={search} />
    </div>
  )
}

export default App
