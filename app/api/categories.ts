import ArchitectureImage from '@/public/architecture.jpeg';
import FilmImage from '@/public/film.webp';
import StudioImage from '@/public/studio.jpg';
import { StaticImageData } from 'next/image';


export type Category = {
  id: number;
  name: string;
  image: string;  
}

export const categories: Category[] = [
  {
    id: 0,
    name: 'architecture',
    image: '/architecture.jpeg'
  },
  {
    id: 1,
    name: 'production',
    image: '/film.webp'
  },
  {
    id: 2,
    name: 'studio',
    image: '/studio.jpg'
  }
]