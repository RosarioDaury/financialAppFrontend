function formatCurrency (amount) {
    if(!amount) return '$0';
    let result = amount.toLocaleString("en", {style:"currency", currency:"USD",});

    return result
}
export default formatCurrency;