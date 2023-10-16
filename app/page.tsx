// components
import Hero from "./components/hero/hero.component";

// types
import { HeroContent } from "./api/api-types";

const HomePage = async () => {
  // GET /v1/hero_contents#index
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/hero-content`
  );
  const { heroContent }: { heroContent: HeroContent} = await response.json();

  return (
    <main className="home-page">
      <Hero
        heroContent={ heroContent }
      />
    </main>
  )
}

export default HomePage;
