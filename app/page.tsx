// components
import Hero from "./components/hero/hero.component";

// api
import { getHeroContent } from "./api/hero-api";

const HomePage = async () => {
  const { button_text, header_text, images, href } = await getHeroContent();
  return (
    <main className="home-page">
      <Hero 
        buttonText={ button_text } 
        headerText={ header_text }
        images={ images }
        href={ href }
      />
    </main>
  )
}

export default HomePage;
