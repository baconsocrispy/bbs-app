// components
import Grid from "@/app/_components/grid/grid.component";
import SummaryForm from "@/app/_forms/summary-form/summary-form.component";

//api
import { getSummary } from "@/app/api/summary/rails-api";

const SummaryEditPage =  async () => {
  // GET /v1/summaries#index
  const summary = await getSummary();

  return (
    <Grid>
      <main>
        <SummaryForm summary={ summary }/>
      </main>
    </Grid>
  )
}

export default SummaryEditPage;