import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import {onToggle, isInList, removeFavorite} from "../localfav.js";

const Detail = () => {

    const { id } = useParams();
    const urlData = "https://gutendex.com/books/";

    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    const [book, setBook] = useState({});

    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [lang, setLang] = useState("");
    const [summaries, setSummaries] = useState("");

    const [favBtn, setFavBtn] = useState(false);

    // get string with author names
    const getAuthors = (book) => {
        let names = "";
        const arr = book.authors || [];
        if (!arr.length) return '---';

        for(let i = 0; i < arr.length; i++)
        {
            names += arr[i].name;

            if(i + 1 < arr.length){
                names += '; ';
            }
            else{
                names += '.';
            }
        }

        return names;
    };
    // get categories
    const getCategories = (book) => {
        let category = "";
        const arr = book.bookshelves || [];
        if (!arr.length) return '---';

        for(let i = 0; i < arr.length; i++)
        {
            category += arr[i];

            if(i + 1 < arr.length){
                category += '; ';
            }
            else{
                category += '.';
            }
        }

        return category;
    }
    // get languages
    const getLanguages = (book) => {
        let lang = "";
        const arr = book.languages || [];
        if (!arr.length) return '---';

        for(let i = 0; i < arr.length; i++)
        {
            lang += arr[i];

            if(i + 1 < arr.length){
                lang += ', ';
            }
            else{
                lang += '.';
            }
        }

        return lang;
    }
    // get summaries
    const getSummaries = (book) => {
        let summ = "";
        const arr = book.summaries || [];
        if (!arr.length) return '---';

        for(let i = 0; i < arr.length; i++)
        {
            summ += arr[i];

            if(i + 1 < arr.length){
                summ += '; ';
            }
            else{
                summ.trim();
                if(summ)
                {
                    if (summ.slice(-1) != '.')
                    {
                        summ += '.';
                    }
                }
                else{
                    summ = "---";
                }
            }
        }

        return summ;
    }

    // read link
    const readUrl =
    book.formats?.["text/html; charset=utf-8"] ||
    book.formats?.["text/html"] ||
    book.formats?.["text/plain; charset=utf-8"] ||
    book.formats?.["text/plain; charset=us-ascii"] ||
    book.formats?.["text/plain"] || "";

    // download link
    const downloadUrl =
    book.formats?.["application/epub+zip"] ||
    book.formats?.["application/x-mobipocket-ebook"] ||
    book.formats?.["application/octet-stream"] ||
    readUrl;

    // function to get data
    useEffect(() => {
        setDataIsLoaded(false);
        fetch(urlData + id)
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data here
            setBook(data);
            setAuthor(getAuthors(data));
            setCategory(getCategories(data));
            setLang(getLanguages(data));
            setSummaries(getSummaries(data));

            setFavBtn(isInList(data.id));

            setDataIsLoaded(true);
        })
        .catch(error => {
            // Handle any errors
            console.error('Error:', error);
        });
    }, [id]); // repeat on id is changed

    // while we are waiting
    if (!dataIsLoaded) {
        return (
            <div>
                <h1>Please wait some time....</h1>
            </div>
        );
    }

    // If we do not have a book with this id
    if (!book) return <p>Book not found.</p>;

    // Main Content
    return (
        <>
            {/* Head */}
            <div className="book-head">
                <h1 className="title">{book.title}</h1>
                <div className="controls head-actions">
                    {favBtn ? (
                    <button className="btn" onClick={() => { removeFavorite(book.id); setFavBtn(v => !v); }}>
                        Remove from favorite
                    </button>
                    ) : (
                    <button className="btn" onClick={() => { onToggle(book); setFavBtn(v => !v); }}>
                        Add to favorite
                    </button>
                    )}

                    {readUrl && (
                    <a className="btn" href={readUrl} target="_blank" rel="noreferrer">Read</a>
                    )}
                    {downloadUrl && (
                    <a className="btn" href={downloadUrl} target="_blank" rel="noreferrer">Download</a>
                    )}
                </div>
            </div>
            {/* Two-column body */}
            <div className="book-body">
                <div className="book-media">
                    {book.formats?.["image/jpeg"] ? (
                    <img className="cover" src={book.formats["image/jpeg"]} alt={`Cover of ${book.title}`} />
                    ) : (
                    <div className="notice">No cover</div>
                    )}
                </div>

                <div className="book-meta">
                    <p><b>Author:</b> {author}</p>
                    <p><b>Number of downloads:</b> {book.download_count}</p>
                    <p><b>Category:</b> {category}</p>
                    <p><b>Language:</b> {lang}</p>
                </div>
            </div>
            {/* Summary */}
            <div style={{ marginTop: 16 }}>
                <p><b>Summaries:</b> {summaries}</p>
            </div>
        </>
    )
}

export default Detail