import Swal from 'sweetalert2';
export const Confirm = (message, callBack) => {
    Swal.fire({
        title: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4c9ce7',
        cancelButtonColor: '#dc4d4d',
        confirmButtonText: 'Confirm!'
    }).then((result) => {
        if (result.value) {
            if (callBack) {
                callBack()
            }
        }
    })
}
