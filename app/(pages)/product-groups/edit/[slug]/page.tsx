// components
import Grid from "@/app/_components/grid/grid.component";
import GroupForm from "@/app/_forms/group-form/group-form.component";

// api
import { getGroupWithProducts } from "@/app/api/groups/rails-api";

const GroupEditPage = async ({ params }: { params: { slug: string }}) => {
  // GET /v1/groups#show
  const group = await getGroupWithProducts(params.slug);

  return (
    <Grid>
      <main className="group-edit-page">
        <GroupForm group={ group }/>
      </main>
    </Grid>
  )
};

export default GroupEditPage;