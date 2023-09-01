'use client'
import { ReactNode, createContext, useContext, useState } from "react";
import UsersDetailsFormJson from '../data/celebrities.json';

console.log('UsersDetailsFormJson:: ',UsersDetailsFormJson);

export type UserDetailsType = {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

export type UserDetailsContext = {
    userDetails: UserDetailsType;
}

export const userContext = createContext<UserDetailsContext | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState<UserDetailsType[]>(UsersDetailsFormJson);
  return (
    <userContext.Provider value={{ userDetails }}>
      {children}
    </userContext.Provider>
  )
}

export function useUsers() {
  const usersContextValue = useContext(userContext)
  if (!usersContextValue) {
    throw new Error('UseTodos Used Outside of the Provider')
  }
  return usersContextValue;
}