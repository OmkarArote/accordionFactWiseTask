'use client'
import CollapsibleCard from "@/components/CollapsibleCard";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../app/globals.css'
import { useUsers } from "@/store/hackers";

// const userDetailsArray = UserDetails;

const Home: React.FC = () => {
  const {userDetails} = useUsers();
  // console.log('UserDetails:: ', userDetails);
  return (
    <main>
      {/* <h1>Collapsible Card Example</h1> */}
      <CollapsibleCard userDetails={userDetails} />
    </main>
  );
};

export default Home;