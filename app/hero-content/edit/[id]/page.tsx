// components
import HeroForm from "@/app/components/hero-form/hero-form.component";

//api
import { getHeroContent } from "@/app/api/hero-content/rails-api";

const HeroContentEditPage =  async () => {
  // GET /v1/hero_contents#index
  const heroContent = await getHeroContent();

  return (
    <main>
      <HeroForm heroContent={ heroContent }/>
    </main>
  )
}

export default HeroContentEditPage;