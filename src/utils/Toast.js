import Swal from 'sweetalert2';
export const Toast = {
    success: function (message) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 3000
        })
    },

    error: function (message) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: message,
            showConfirmButton: false,
        })
    },

    warning: function (message) {
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: 3000
        })
    }
};
