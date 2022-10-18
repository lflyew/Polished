module.exports = {
    isManager: (role) => {
        if (role === "manager") return true;
        else return false;
    },
    isCustomer: (role) => {
        if (role === "customer") return true;
        else return false;
    }
};