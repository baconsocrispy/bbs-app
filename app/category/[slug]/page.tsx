const Category = ({ params }: { params: { slug: string }}) => {
  return (
    <main className='category'>
      { params.slug }
    </main>
  )
}

export default Category;