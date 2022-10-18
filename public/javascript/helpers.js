const isPhoneNumber = function(str) {
    const num = str.replace(/\D/g, '');
    if (num.length != 10) return false;
    return num;
}