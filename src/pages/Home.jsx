import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Home = () => {

    // vars
    const [books, setBooks] = useState([]);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    // page links
    const [pages, setPages] = useState({next: null, previous: null});
    // current page
    const [urlData, setUrlData] = useState("https://gutendex.com/books");

    // function to get data
    useEffect(() => {
        setDataIsLoaded(false);
        fetch(urlData)
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data here
            setBooks(data.results);
            setPages({next: data.next, previous: data.previous});
            setDataIsLoaded(true);

            console.log(data.results);
            console.log(data);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
    }, [urlData]); // do on url data change
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
                <p>Next</p>
                <p>{pages.next}</p>
                <p>Previous</p>
                <p>{pages.previous}</p>
            </div>
        </>
    )
}

export default Home