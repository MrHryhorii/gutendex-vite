import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import {loadFavorites} from "../localfav.js";

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

      if (!dataIsLoaded) {
        return (
            <div>
                <h1>Please wait some time....</h1>
            </div>
        );
      }
      else{
        if(!books){
          return (
            <div>
                <h1>You do not have favorite books</h1>
            </div>
          );
        }
      }

  return (
    <>
      <div>Favorite</div>
      <p>Book List: {books.length}</p>
        <ul>
            {
                books.map(book => (
                    <li key={book.id}>
                        <Link to={`/book/${book.id}`}>
                            {book.title}
                        </Link>
                    </li>
                ))
            }
        </ul> 
    </>
  )
}

export default Favorite