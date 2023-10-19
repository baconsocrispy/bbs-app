'use client'

// library
import { FC, useContext } from "react";

// context
import { UserContext } from "@/app/_contexts/user.context";

// components
import Link from "next/link";

// types
import { Summary } from "@/app/api/api-types";

type SummaryProps = {
  summary: Summary
};

const Summary: FC<SummaryProps> = ({ summary }) => {
  // state
  const { user } = useContext(UserContext);

  return (
    <div className="summary">
        { user && 
          <button className="block-menu__edit-button">
            <Link 
              className="block-menu__edit-link"
              href={ `/summary/edit/${ summary.id }` }
            >
              Edit
            </Link>
          </button>
        }
      <h4 className="summary__header">{ summary.header }</h4>
      <p className="summary__copy">{ summary.copy }</p>
    </div>
  )
};

export default Summary;