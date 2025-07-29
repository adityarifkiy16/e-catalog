export function initScrollTopButton() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#btn-scroll-top').fadeIn();
        } else {
            $('#btn-scroll-top').fadeOut();
        }
    });

    $('#btn-scroll-top').click(function () {
        $('html, body').animate(
            {
                scrollTop: 0
            },
            500
        );
        return false;
    });
}
