// components
import HeroForm from "@/app/components/hero-form/hero-form.component";

// types
import { HeroContent } from "@/app/api/api-types";

const HeroContentEditPage =  async () => {
  // GET /v1/hero_contents#index
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/hero-content`
  );
  const { heroContent }: { heroContent: HeroContent} = await response.json();

  return (
    <main>
      <HeroForm heroContent={ heroContent }/>
    </main>
  )
}

export default HeroContentEditPage;