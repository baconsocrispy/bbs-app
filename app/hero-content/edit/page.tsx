// components
import HeroForm from "@/app/components/hero-form/hero-form.component";

// api
import { getHeroContent } from "@/app/api/hero-api";

const HeroContentEditPage =  async () => {
  // state
  const heroContent = await getHeroContent();

  return (
    <main>
      <HeroForm heroContent={ heroContent }/>
    </main>
  )
}

export default HeroContentEditPage;