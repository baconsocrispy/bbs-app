// components
import Hero from "./components/hero/hero.component";

// api
import { getHeroContent } from "./api/hero-content/rails-api";

const HomePage = async () => {
  // GET /v1/hero_contents#index
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
