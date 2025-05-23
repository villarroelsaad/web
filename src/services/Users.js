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
    return data;
 }

