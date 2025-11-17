export const getSales = async () => {
    const response = await fetch('https://web-api-orpin.vercel.app/sale/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Error fetching IPN data');
    }
    const data = await response.json();
    const sales = data.map(sale => ({
        id: sale.Id_s,
        name: sale.PayerName_s,
        email: sale.PayerEmail_s,
        date: sale.PaymentDate_s,
        amount: sale.Amount_s,
        status: sale.Status_s,
        idPaypals: sale.id_i_s, 
    }));
    return sales;
}
