import React, { useState } from 'react';
import './Pokemon.css';

export default function Pokemon (props) {
    return (
         <div className="pokemonContainer">
            <h1>{props.name.toUpperCase()}</h1>
            <img src={props.image} />
            <h3>Stats</h3>
            <div className="stats">
                <span>Attack: {props.attack} </span>
                <span>Defense: {props.defense} </span>
                <span>Speed: {props.speed} </span>
            </div>
        </div>
    )
}