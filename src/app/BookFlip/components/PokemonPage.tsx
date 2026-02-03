import React from "react"
import type { Pokemon } from "../types"

export const PokemonPage = React.forwardRef<
  HTMLDivElement,
  { pokemon: Pokemon }
>(({ pokemon }, ref) => {
  return (
    <div ref={ref} className="page pokemon-page">
      <div className="pokemon-card">
        <div className="pokemon-image">
          #{pokemon.id}
        </div>

        <div className="pokemon-info">
          <h2>{pokemon.name}</h2>
          <p className="type">Type: {pokemon.type}</p>

          <div className="stats">
            <div>HP: {pokemon.hp}</div>
            <div>ATK: {pokemon.attack}</div>
            <div>DEF: {pokemon.defense}</div>
          </div>

          <p className="desc">{pokemon.desc}</p>
        </div>
      </div>
    </div>
  )
})

PokemonPage.displayName = 'PokemonPage'
