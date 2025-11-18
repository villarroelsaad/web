export const GetUsers = async () => {
    try {
        const response = await fetch('https://web-ten-pi-26.vercel.app/user/get', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });


        if (!response.ok) {
            throw new Error('Error fetching users data');
        }


        const data = await response.json();


        if (!Array.isArray(data)) {
            console.error('Expected an array but received:', data);
            throw new Error('Invalid data format from server');
        }

        const users = data.map(user => ({
            id: user.UserID_u,
            userName: user.Username_u,
            email: user.Email_u,
            role: user.Role_u
        }));
        console.log(users);
        return users;

    } catch (err) {
        console.error('Fetch error:', err);
        throw new Error('Failed to fetch users');
    }
};
