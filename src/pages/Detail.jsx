import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

const Detail = () => {

    const { id } = useParams();
    const urlData = "https://gutendex.com/books/";

    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    const [book, setBook] = useState({});

    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [lang, setLang] = useState("");

    // get string with author names
    const getAuthors = (book) => {
        let names = "";
        const arr = book.authors;

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
        const arr = book.bookshelves;

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
        const arr = book.languages;

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
            <div>Detail</div>
            <p><b>Title:</b> {book.title}</p>
            <img src={book.formats["image/jpeg"]} alt="Cover" />
            <p><b>Author:</b> {author}</p>
            <p><b>Number of downloads:</b> {book.download_count}</p>
            <p><b>Category:</b> {category}</p>
            <p><b>Language:</b> {lang}</p>
            <p><b>Link to the book in digital format:</b></p>
            <Link to={book.formats["text/plain; charset=us-ascii"]}>Link</Link>
        </>
    )
}

export default Detail