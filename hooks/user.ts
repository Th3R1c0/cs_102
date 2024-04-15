import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/user");
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                } else {
                    throw new Error("Failed to fetch user data");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUser();
    }, []); // Run only once on component mount

    // Function to update user data
    async function updateUser(newUser:any) {
        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user: newUser }),
            });
            if (response.ok) {
                setUser(newUser); // Update local state
            } else {
                throw new Error("Failed to update user data");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    return [user, updateUser];
}
