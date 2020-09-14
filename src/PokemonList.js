import React from 'react'

export default function PokemonList({ pokemon }) {
    return (
        <div>
            {pokemon.map(p => <div key={p}>{p}</div> )} 
        </div>
    )
}
//The reason for this, as explained in the MDN Docs is that 
//an arrow function wrapped by () will return the value it wraps, so if I wanted to use curly braces I had to add the return keyword