'use client'

// library
import { FC, useContext } from "react";

// context
import { UserContext } from "@/app/_contexts/user.context";

// components
import Button from "../button/button.component";

// types
import { Summary } from "@/app/api/api-types";
import Image from "next/image";

type SummaryProps = {
  summary: Summary
};

const Summary: FC<SummaryProps> = ({ summary }) => {
  // state
  const { user } = useContext(UserContext);

  return (
    <div className="summary">
        { user && 
          <Button 
            text='Edit'
            href={ `/summary/edit/${ summary.id }` }
            className='button--edit'
          />
        }
      <h4 className="summary__header">{ summary.header }</h4>
      <p className="summary__copy">{ summary.copy }</p>

      <div className="summary__image-container">
        <Image 
          src={ summary.image?.url }
          height={ 2456 }
          width={ 3680 }
          alt={ summary.header }
          className="summary__image"
        />
      </div>
    </div>
  )
};

export default Summary;