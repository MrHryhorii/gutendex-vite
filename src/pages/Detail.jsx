import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Detail = () => {

    const { id } = useParams();
    const urlData = "https://gutendex.com/books/";

    const [dataIsLoaded, setDataIsLoaded] = useState(false);

    const [book, setBook] = useState({});

    // function to get data
    useEffect(() => {
        setDataIsLoaded(false);
        fetch(urlData + id)
        .then(response => response.json())
        .then(data => {
            // Handle the fetched data here
            setBook(data);
            setDataIsLoaded(true);
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

    if (!book) return <p>Book not found.</p>;

    return (
        <>
            <div>Detail</div>
            <p>{book.title}</p>
        </>
    )
}

export default Detail