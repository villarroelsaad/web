export const getClients = async () => {
    const response = await fetch('http://localhost:3000/client/get', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Error fetching Cliennts data');
    }
    const data = await response.json();
    const clients = data.map(client => ({
        id: client.Id_c,
        name: client.PayerName_c,
        email: client.PayerEmail_c,
        salesId: client.id_s_c,
    }));
    return clients
 }

