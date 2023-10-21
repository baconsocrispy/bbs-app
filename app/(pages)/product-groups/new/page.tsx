// components
import Grid from "@/app/_components/grid/grid.component";
import GroupForm from "@/app/_forms/group-form/group-form.component";

const NewGroupPage = () => {
  return (
    <Grid>
      <main>
        <section>
          <GroupForm />
        </section>
      </main>
    </Grid>
  )
};

export default NewGroupPage;