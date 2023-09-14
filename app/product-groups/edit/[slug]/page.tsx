// components
import GroupForm from "@/app/components/group-form/group-form.component";

// api
import { getGroupWithProducts } from "@/app/api/groups-api";

const GroupEditPage = async ({ params }: { params: { slug: string }}) => {
  // state
  const { slug } = params;
  const group = await getGroupWithProducts(slug);

  return (
    <main>
      <GroupForm group={ group }/>
    </main>
  )
}

export default GroupEditPage;