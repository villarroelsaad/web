export const GetUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/user/get', {
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
            UserName: user.Username_u,
            Email: user.Email_u,
            Role: user.Role_u
        }));
        console.log(users);
        return users;

    } catch (err) {
        console.error('Fetch error:', err);
        throw new Error('Failed to fetch users');
    }
};
