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
    // error message
    const [error, setError] = useState("");


    // category
    const categories = ["Fiction", "Mystery", "Thriller", "Romance", "Fantasy", "Morality", "Society", "Power", "Justice", "Adventure", "Tragedy", "War", "Philosophy"];
    // category helper
    const byCategory = (c) => {
        let tag = c.trim();
        setUrlData(tag ? `https://gutendex.com/books?search=${tag}` : "https://gutendex.com/books");
    };
    // show category result
    const [cat, setCat] = useState("All");
    // create category buttons
    const catButtons = () => {
        return (
            <div className="chips">
                <button 
                    className="chip"
                    aria-pressed={cat === "All"}
                    onClick={() => {
                        byCategory("");
                        setCat("All");
                    }
                    }>All</button>
                {categories.map(name => (
                    <button
                        className="chip"
                        aria-pressed={cat === name}
                        key={name}
                        onClick={() => {
                            byCategory(name);
                            setCat(name);
                            }
                        }
                        >{name}</button>
                    ))
                }
            </div>
        );
    };
    

    
    // function to get data
    useEffect(() => {
        setDataIsLoaded(false);
        setError("");
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
            setError("Failed to load books. Please try again.");
        });
    }, [urlData]); // do on url data change
    // no data content
    if (error) return <p>{error}</p>;
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
            <div>
                <div className="toolbar">
                {/* Next and Previous buttons */}
                <div className="controls">
                    <button className="btn" disabled={!pages.previous} onClick={() => setUrlData(pages.previous)}>Previous</button>
                    <button className="btn" disabled={!pages.next} onClick={() => setUrlData(pages.next)}>Next</button>
                </div>
                {/* Search field and button */}
                <div className="controls">
                    <input
                        className="input"
                        placeholder="Search…"
                        value={nameLink}
                        onChange={e => setNameLink(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const q = nameLink.trim().toLowerCase();
                                setUrlData(q ? `https://gutendex.com/books?search=${q}` : "https://gutendex.com/books");
                            }
                        }}
                    />
                    <button className="btn" onClick={() => {
                        const q = nameLink.trim().toLowerCase();
                        setUrlData(q ? `https://gutendex.com/books?search=${q}` : "https://gutendex.com/books");
                    }}>Find!</button>
                </div>
                </div>
                {/* Number with result data */}
                <p className="notice">Results: {new Intl.NumberFormat().format(count)} (showing {books.length})</p>
                {/* Category menu */}
                {catButtons()}
                
                {/* BOOKS */}
                {/* Array with return data */}
                {!books.length && (
                    <p className="notice">No books found. Try another query or category.</p>
                )}
                <ul className="list">
                    {
                        books.map(book => (
                            <li key={book.id}>
                                <Link to={`/book/${book.id}`}>
                                    {book.title}
                                </Link>
                                {Array.isArray(book.authors) && book.authors.length > 0 && (
                                    <span className="notice"> — {book.authors.map(a => a?.name).filter(Boolean).join('; ')}</span>
                                )}
                            </li>
                        ))
                    }
                </ul>                
            </div>
        </>
    )
}

export default Home