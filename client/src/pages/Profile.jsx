import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <h1>Loading....</h1>;
  else if (!profile) return <h1>Error fetching data</h1>;

  return (
    <div>
      <h1>{profile[0]}</h1>
      <p>{profile.firstName}</p>
    </div>
  )
}

export default Profile