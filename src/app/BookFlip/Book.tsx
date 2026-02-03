import React from 'react'
import '@assets/css/Book.css'
import type { Pokemon } from './types';
import { PageBack, PageCover } from './components/PageCover';
import { PokemonPage } from './components/PokemonPage';
import { FlipBook } from '@/components/FlipBook';
import { useFlipBookSize } from '../hooks';


const TYPES = ['Fire', 'Water', 'Grass', 'Electric'] as const

const POKEMON = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: `Pokémon ${i + 1}`,
    type: TYPES[i % 4],
    hp: 40 + i * 2,
    attack: 50 + i * 3,
    defense: 45 + i * 2,
    desc: 'A mysterious Pokémon species often found in demo flip books.',
})) satisfies Pokemon[];

const Book: React.FC = () => {
  const { width, height } = useFlipBookSize();
  return (
    <FlipBook 
           width={width}
      height={height}
      size="fixed"
      showCover
      maxShadowOpacity={0.5}
      drawShadow 
    >
      <PageCover />
          {POKEMON.map(p => (<PokemonPage key={p.id} pokemon={p} />))}
          <PageBack />
    </FlipBook>
     

      

      
  )
}

export default Book
