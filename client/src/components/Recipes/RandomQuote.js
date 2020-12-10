import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../NavBar/Navbar.css';

const initialState = {
    quote: '',
    author: '',
}

const Randomquote = () => { 

    const [theQuote, setQuote] = useState(initialState);

    const getAllQuotes = () => {
        axios   
        .get("https://type.fit/api/quotes")
        .then((res) => {
            let allQuotes;
            allQuotes = res.data;

            let randomNum = Math.floor(Math.random() * (allQuotes.length));

            let newQuote = {
                quote: allQuotes.[randomNum].text,
                author: allQuotes.[randomNum].author,
            };
            setQuote(newQuote);
        })
        .catch((error) => console.error(error))
    };

    useEffect(getAllQuotes, [])

    return (
        <div>
            <blockquote className="quote-div">
                <h1>Quote of the day : </h1>
                <img src="/begin-quote.png" alt="ingrdients" width="20px"/>
                <span className="quote-span">{theQuote.quote}</span>
                <img src="/closing-quote.png" alt="ingrdients" width="20px"/>
                <p> - {theQuote.author} </p>
            </blockquote>
        </div>
    )
}

export default Randomquote;