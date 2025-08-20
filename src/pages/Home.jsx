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
    // search link for name
    const [nameLink, setNameLink] = useState("");

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
                {/* Next and Previous buttons */}
                <div>
                    {pages.previous && (
                        <button onClick={() => setUrlData(pages.previous)}>Previous</button>
                    )}
                    {pages.next && (
                        <button onClick={() => setUrlData(pages.next)}>Next</button>
                    )}
                </div>
                {/* Search field and button */}
                <div>
                    <input
                        placeholder="Search…"
                        onChange={e => setNameLink("https://gutendex.com/books?search=" + e.target.value.toLowerCase())}
                    />
                    <button onClick={() => setUrlData(nameLink)}>Find!</button>
                </div>
                 {/* Array with return data */}
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