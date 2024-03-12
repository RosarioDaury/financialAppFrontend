const formatter = new Intl.DateTimeFormat('en', {
    hour12: true,
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
});

function formatTimeOnly(dateTime) {
    // console.log(new Date(dateTime))
    let date = new Date(dateTime);    
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


function formatDateOnly(dateTime = new Date()) {
    let date = new Date(dateTime);    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}


export {
    formatTimeOnly,
    formatDateOnly
}