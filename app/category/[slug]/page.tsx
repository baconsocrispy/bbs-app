import Header from "@/app/components/header/header.component";

const CategoryPage = ({ params }: { params: { slug: string }}) => {
  return (
    <main className='category-page'>
      <Header />
    </main>
  )
}

export default CategoryPage;