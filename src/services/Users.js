export const GetUsers = async () => {
    const response = await fetch('http://localhost:3000/users/get', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Error fetching IPN data');
    }
    const data = await response.json();
    const users = data.map(user => ({
        id: user.ID_u,
        userName: user.Username_u,
        email: user.Email_u,
        role: user.Role_u
    }));
    return users;
 }

