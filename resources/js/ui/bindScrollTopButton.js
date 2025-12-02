/**
 * Bind a scroll to top button to the window scroll event.
 *
 * The button will appear when the window is scrolled more than 100px from the top,
 * and will disappear when the window is scrolled back to the top.
 *
 * When the button is clicked, the window and body will animate to the top of the page.
 */
export function bindScrollTopButton() {
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
