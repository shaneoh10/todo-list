const today = new Date();

exports.getDate = () => {
    const dateOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    return today.toLocaleDateString('en-US', dateOptions);
}

exports.getDay = () => {
    const dateOptions = {
        weekday: 'long'
    };
    return today.toLocaleDateString('en-US', dateOptions);
}