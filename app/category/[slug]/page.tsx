const CategoryPage = ({ params }: { params: { slug: string }}) => {
  return (
    <main className='category-page'>
      { params.slug }
    </main>
  )
}

export default CategoryPage;