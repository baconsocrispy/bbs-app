const Category = ({ params }: { params: { slug: string }}) => {
  return (
    <main className={ `category-${ params.slug }`}>
      { params.slug }
    </main>
  )
}

export default Category;