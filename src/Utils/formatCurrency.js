function formatCurrency ({amount, decimals}) {
    if(!amount) return '$0.00';

    if(decimals){
        return amount.toLocaleString("en", {style:"currency", currency:"USD"});
    }
    
    return amount.toLocaleString("en", {style:"currency", currency:"USD", minimumFractionDigits: 0,
    maximumFractionDigits: 0,});

}
export default formatCurrency;