// Global Toast Configuration
class ToastManager {
    constructor() {
        this.toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
    }

    show(type, message, timer = 3000) {
        this.toast.fire({
            icon: type,
            title: message,
            timer: timer
        });
    }

    success(message, timer = 3000) {
        this.show('success', message, timer);
    }

    error(message, timer = 3000) {
        this.show('error', message, timer);
    }

    warning(message, timer = 3000) {
        this.show('warning', message, timer);
    }

    info(message, timer = 3000) {
        this.show('info', message, timer);
    }
}

// Global instance
window.toast = new ToastManager();
