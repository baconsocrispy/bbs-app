// library
import { FC } from "react";

// types
import { Summary } from "@/app/api/api-types";

type SummaryProps = {
  summary: Summary
};

const Summary: FC<SummaryProps> = ({ summary }) => {
  return (
    <div className="summary">
      
    </div>
  )
};

export default Summary;