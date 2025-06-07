export const getSales = async () => {
    const response = await fetch('http://localhost:3000/sale/get', {
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
        id: sale.Id_s, // Renaming Id_s to id
        name: sale.PayerName_s, // Renaming PayerName_s to payerName
        email: sale.PayerEmail_s, // Renaming PayerEmail_s to payerEmail
        date: sale.PaymentDate_s, // Renaming PaymentDate_s to paymentDate
        amount: sale.Amount_s, // Renaming Amount_s to amount
        status: sale.Status_s, // Renaming Status_s to status
        idPaypals: sale.id_i_s, // Renaming id_i_s to invoiceId
    }));
    return sales;
}

