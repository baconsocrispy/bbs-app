// components
import CardGrid from "@/app/components/card-grid/card-grid.component";
import Header from "@/app/components/header/header.component";

const CategoryPage = ({ params }: { params: { slug: string }}) => {
  return (
    <main className='category-page'>
      <Header text={ params.slug }/>
      <CardGrid />
    </main>
  )
}

export default CategoryPage;