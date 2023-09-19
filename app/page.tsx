// components
import Hero from "./components/hero/hero.component";

// api
import { getHeroContent } from "./api/hero-api";

const HomePage = async () => {
  const heroContent = await getHeroContent();

  return (
    <main className="home-page">
      <Hero
        heroContent={ heroContent }
      />
    </main>
  )
}

export default HomePage;
