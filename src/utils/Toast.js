import Swal from 'sweetalert';
export const Toast = {
    success: function (message) {
        Swal({
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 3000
        })
    },

    error: function (message) {
        Swal({
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
        })
    },

    warning: function (message) {
        Swal({
            position: 'top-end',
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: 3000
        })
    }
};
