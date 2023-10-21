// components
import Grid from "./_components/grid/grid.component";
import Hero from "./_components/hero/hero.component";

// data
import { NAV_TYPES } from "./_components/nav/nav.types";

// api
import { getHeroContent } from "./api/hero-content/rails-api";

const HomePage = async () => {
  // GET /v1/hero_contents#index
  const heroContent = await getHeroContent();

  const navOptions = {
    background: NAV_TYPES.transparent,
    overlay: true,
    theme: NAV_TYPES.light
  };

  return (
    <Grid navOptions={ navOptions }>
      <main className="home-page">
        <Hero
          heroContent={ heroContent }
        />
      </main>
    </Grid>
  )
}

export default HomePage;
