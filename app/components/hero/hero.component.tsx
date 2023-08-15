// components
import CategoryMenu from "../category-menu/category-menu.component";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__text">
          Lighting People
        </h1>
        <button className="hero__button">View Catalog</button>
        <CategoryMenu />
      </div>
    </section>
  )
}

export default Hero;