import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import {loadFavorites, removeFavorite} from "../localfav.js";

const Favorite = () => {

  const [books, setBooks] = useState([]);
  const [dataIsLoaded, setDataIsLoaded] = useState(false);

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
      {
        books.length > 0 ? 
        (
          <div>
            <div>Favorite</div>
            <p>Book List: {books.length}</p>
              <ul>
                  {
                      books.map(book => (
                          <li key={book.id}>
                              <Link to={`/book/${book.id}`}>
                                  {book.title}
                              </Link>
                              <button onClick={() => {removeFavorite(book.id); setBooks(loadFavorites());}}>Remove</button>
                          </li>
                      ))
                  }
              </ul>
          </div>
        ) :
        (
          <div>
            <h1>You do not have favorite books</h1>
          </div>
        )
      }
    </>
  )
}

export default Favorite