import { useState, useEffect } from 'react';

function useMembers() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/members/');
        if (!response.ok) {
          throw new Error('Failed to fetch members data');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching members data:', error);
      }
    };

    fetchData();

    // Cleanup function
    return () => {};
  }, []); // Empty dependency array ensures effect runs only once

  return [members, setMembers];
}

export default useMembers;
