// components
import GroupForm from "@/app/components/group-form/group-form.component";

// api
import { getGroupWithProducts } from "@/app/api/groups/rails-api";

const GroupEditPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/groups#show
  const group = await getGroupWithProducts(params.slug);

  return (
    <main>
      <GroupForm group={ group }/>
    </main>
  )
}

export default GroupEditPage;