export const getClients = async () => {
    const response = await fetch('https://web-api-orpin.vercel.app/client/get', {
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
