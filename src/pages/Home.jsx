import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Home = () => {

    // vars
    const [books, setBooks] = useState([]);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    // function to get data
    useEffect(() => {
        fetch('https://gutendex.com/books')
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data here
            setBooks(data.results);
            setDataIsLoaded(true);

            console.log(data.results);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
    }, []);
    // no data content
    if (!dataIsLoaded) {
        return (
            <div>
                <h1>Please wait some time....</h1>
            </div>
        );
    }

    // show if we have data
    return (
        <>
            <div>Home</div>
            <div>
                <p>Book List</p>
                <ul>
                    {books.map(book => (
                    <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Home