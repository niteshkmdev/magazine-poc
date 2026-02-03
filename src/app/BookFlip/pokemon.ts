import type { Pokemon } from './types';

/* =========================================================
   API TYPES (minimal, scoped, no over-modeling)
   ========================================================= */

type PokemonListResponse = {
  results: {
    name: string;
    url: string;
  }[];
};

type PokemonStat = {
  base_stat: number;
  stat: {
    name: 'hp' | 'attack' | 'defense' | string;
  };
};

type PokemonType = {
  type: {
    name: string;
  };
};

type PokemonSprites = {
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
};

type PokemonApiResponse = {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
  sprites: PokemonSprites;
};

type FlavorTextEntry = {
  flavor_text: string;
  language: {
    name: string;
  };
};

type PokemonSpeciesResponse = {
  flavor_text_entries: FlavorTextEntry[];
};

/* =========================================================
   PUBLIC API
   ========================================================= */

export async function fetchPokemon(limit = 20): Promise<Pokemon[]> {
  const listRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );

  if (!listRes.ok) {
    throw new Error('Failed to fetch Pokémon list');
  }

  const list: PokemonListResponse = await listRes.json();

  const items = await Promise.all(
    list.results.map(async ({ url }) => {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error('Failed to fetch Pokémon');
      }

      const data: PokemonApiResponse = await res.json();

      return {
        id: data.id,
        name: capitalize(data.name),
        types: data.types.map(t => t.type.name),
        hp: stat(data, 'hp'),
        attack: stat(data, 'attack'),
        defense: stat(data, 'defense'),
        image:
          data.sprites.other?.['official-artwork']?.front_default ??
          '',
        desc: await fetchDescription(data.id),
      };
    })
  );

  return items;
}

/* =========================================================
   HELPERS
   ========================================================= */

function stat(
  data: Pick<PokemonApiResponse, 'stats'>,
  key: 'hp' | 'attack' | 'defense'
): number {
  return (
    data.stats.find(s => s.stat.name === key)?.base_stat ?? 0
  );
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

async function fetchDescription(id: number): Promise<string> {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${id}`
  );

  if (!res.ok) {
    return '';
  }

  const data: PokemonSpeciesResponse = await res.json();

  const entry = data.flavor_text_entries.find(
    e => e.language.name === 'en'
  );

  return entry?.flavor_text.replace(/\f/g, ' ') ?? '';
}
