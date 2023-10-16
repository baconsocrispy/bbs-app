// components
import GroupForm from "@/app/components/group-form/group-form.component";

// types
import { Group } from "@/app/api/api-types";

const GroupEditPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/groups#show
  const response = await fetch(
    `${ process.env.NEXT_PUBLIC_BASE_URL }/api/groups/${ params.slug }`
  );
  
  const { group }: { group: Group } = await response.json();

  return (
    <main>
      <GroupForm group={ group }/>
    </main>
  )
}

export default GroupEditPage;