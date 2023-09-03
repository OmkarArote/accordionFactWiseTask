'use client'
import CollapsibleCard from "@/components/CollapsibleCard";
import { useUsers } from "@/store/hackers";
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../app/globals.css'
import 'react-toastify/dist/ReactToastify.css';

// const userDetailsArray = UserDetails;

const Home: React.FC = () => {
  const { userDetails } = useUsers();
  // console.log('UserDetails:: ', userDetails);
  return (
    <main>
      <CollapsibleCard userDetails={userDetails} />
      <ToastContainer />
    </main>
  );
};

export default Home;