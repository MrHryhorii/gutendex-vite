import React from 'react'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Home = () => {

    // vars
    const [books, setBooks] = useState([]);
    const [dataIsLoaded, setDataIsLoaded] = useState(false);
    // page links
    const [pages, setPages] = useState({next: null, previous: null});
    // book count
    const [count, setCount] = useState(0);
    // current page
    const [urlData, setUrlData] = useState("https://gutendex.com/books");
    // search link for name
    const [nameLink, setNameLink] = useState("");


    // category
    const categories = ["Fiction", "Mystery", "Thriller", "Romance", "Fantasy", "Morality", "Society", "Power", "Justice", "Adventure", "Tragedy", "War", "Philosophy"];
    // category helper
    const byCategory = (c) => {
        let tag = c.trim();
        setUrlData("https://gutendex.com/books?search=" + tag);
    };
    // create category buttons
    const catButtons = () => {
        return (
            <div>
                <button onClick={() => {
                        byCategory("");
                        setCat("All");
                    }
                    }>All</button>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => {
                            byCategory(cat);
                            setCat(cat);
                            }
                        }
                        >{cat}</button>
                    ))
                }
            </div>
        );
    };
    // show category result
    const [cat, setCat] = useState("All");

    
    // function to get data
    useEffect(() => {
        setDataIsLoaded(false);
        fetch(urlData)
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data here
            setBooks(data.results);
            setPages({next: data.next, previous: data.previous});
            setCount(data.count);
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
                        value={nameLink}
                        onChange={e => setNameLink(e.target.value)}
                    />
                    <button onClick={() => setUrlData("https://gutendex.com/books?search=" + nameLink.trim().toLowerCase())}>Find!</button>
                </div>
                {/* Category menu */}
                <p>Category menu</p>
                {catButtons()}
                
                {/* BOOKS */}
                {/* Array with return data */}
                <p>Book List: {cat} - {count}, On page - {books.length}</p>
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
            </div>
        </>
    )
}

export default Home