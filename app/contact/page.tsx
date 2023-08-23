'use client'

import { getCurrentUser } from "../api/auth-api";

const Contact = () => {
  // handlers
  const getUser = () => getCurrentUser();

  return (
    <div>
      <button onClick={ getUser }>Click</button>
    </div>
  )
}

export default Contact;