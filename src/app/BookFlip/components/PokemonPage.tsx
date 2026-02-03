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
          <img
            src={pokemon.image}
            alt={pokemon.name}
            loading="lazy"
          />
          <span className="pokemon-id">#{pokemon.id}</span>
        </div>

        <div className="pokemon-info">
          <h2>{pokemon.name}</h2>

          <div className="types">
            {pokemon.types.map(t => (
              <span key={t} className={`type type-${t}`}>
                {t}
              </span>
            ))}
          </div>

          <div className="stats">
            <div><strong>HP</strong> {pokemon.hp}</div>
            <div><strong>ATK</strong> {pokemon.attack}</div>
            <div><strong>DEF</strong> {pokemon.defense}</div>
          </div>

          <p className="desc">{pokemon.desc}</p>
        </div>
      </div>
    </div>
  )
})

PokemonPage.displayName = "PokemonPage"
