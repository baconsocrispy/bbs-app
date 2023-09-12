// components
import Header from "../components/header/header.component";

const GroupsPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;

  return (
    <main>
      <Header text={ slug } imageUrl='/architecture.jpeg'/>
    </main>
  )
};

export default GroupsPage;