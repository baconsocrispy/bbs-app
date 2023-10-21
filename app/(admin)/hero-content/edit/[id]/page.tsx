// components
import Grid from "@/app/_components/grid/grid.component";
import HeroForm from "@/app/_forms/hero-form/hero-form.component";

//api
import { getHeroContent } from "@/app/api/hero-content/rails-api";

const HeroContentEditPage =  async () => {
  // GET /v1/hero_contents#index
  const heroContent = await getHeroContent();

  return (
    <Grid>
      <main>
        <HeroForm heroContent={ heroContent }/>
      </main>
    </Grid>
  )
}

export default HeroContentEditPage;