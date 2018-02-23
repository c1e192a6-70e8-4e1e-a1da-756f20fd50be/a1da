export const apiBase =
    process.env.NODE_ENV === 'development'
        ? window.location.protocol + '//' + 'localhost' + ':3000/api'
        : window.API_BASE || '/api';
