import React, {  useState } from 'react'
import '@assets/css/Book.css'
import type { Pokemon } from './types';
import { PageBack, PageCover } from './components/PageCover';
import { PokemonPage } from './components/PokemonPage';
import { FlipBook } from '@/components/FlipBook';
import {  useResponsiveBookSize } from '../hooks';
import { fetchPokemon } from './pokemon';

const Book: React.FC = () => {
  const { width, height,sWidth } = useResponsiveBookSize();
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    const [pokemons, setPokemon] = React.useState<Pokemon[]>([])
    const isMobile = sWidth < 850;
    const bookKey = `${width}x${height}x${sWidth}`;

  const getPok = async () => {
      try {
        setLoading(true);
        const poke = await fetchPokemon(20);
        setPokemon(poke);
        setLoading(false);   
      } catch (error) {
        console.log(error);
        setLoading(false);
       setError('Some thing went wrong') 
      }
    }
  React.useEffect(() => {
   getPok() 
  }, [])
  if (loading) {
    return (
      <div className="pdf-fullscreen pdf-loading">
        <div className="spinner" />
        <p>Loading PokeDex…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="pdf-fullscreen pdf-error">
        <p>{error}</p>
      </div>
    );
  }

  if (!width || !height) return null;
  return (
<div className="flip-book-fullscreen">

    <FlipBook 
    key={bookKey}
    usePortrait={isMobile}
      width={width}
      height={height}
      size="fixed"
      showCover
        maxShadowOpacity={isMobile ? 0.2 : 0.5}

        drawShadow={!isMobile}

    >
      <PageCover />
          {pokemons.map(p => (<PokemonPage key={p.id} pokemon={p} />))}
          <PageBack />
    </FlipBook>
</div>     

      

      
  )
}

export default Book
