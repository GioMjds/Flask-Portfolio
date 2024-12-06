import { useEffect, useState } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/profile')
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setProfile(null);
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
      <h1>Student ID: {profile['studentID']}</h1>
      <h1>Student ID: {profile['lastName']}</h1>
    </div>
  )
}

export default Profile