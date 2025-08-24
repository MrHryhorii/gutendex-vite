import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import {loadFavorites, removeFavorite} from "../localfav.js";

const Favorite = () => {

  const [books, setBooks] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

  const removeAll = () => {
    const data = loadFavorites();
    for(let i=0; i < data.length; i++)
    {
      removeFavorite(data[i].id);
    }
    setBooks(loadFavorites());
  }

  // function to get data
  useEffect(() => {
    const data = loadFavorites();
    if (data){
      setBooks(data);
      setDataIsLoaded(true);
    }          
  }, []);

  if (!dataIsLoaded) 
  {
    return (
        <div>
            <h1>Please wait some time....</h1>
        </div>
    );
  }

  return (
    <>
      {books.length > 0 ? (
        <div>
          {/* Header */}
          <div className="fav-header">
            <div className="controls" style={{ margin: 0 }}>
              <span className="title">List of <span className="badge">{books.length}</span> books</span>
              
              <button
                className="btn"
                onClick={() => {
                  if (confirm("Remove all favorite books?")) removeAll();
                }}
              >
                Remove all books
              </button>
            </div>
          </div>

          {/* List */}
          <ul className="fav-list">
            {books.map((book) => (
              <li key={book.id} className="fav-item">
                <Link className="fav-title" to={`/book/${book.id}`}>
                  {book.title}
                </Link>
                <button
                  className="btn btn--sm btn--ghost"
                  style={{ marginLeft: 10, marginBottom: 4 }}
                  onClick={() => {
                    if (confirm(`Remove “${book.title}” from favorites?`)) {
                      removeFavorite(book.id);
                      setBooks(loadFavorites());
                    }
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h1 className="title">Favorite books</h1>
          <p className="notice">You don’t have favorite books yet.</p>
        </div>
      )}
    </>
  )
}

export default Favorite