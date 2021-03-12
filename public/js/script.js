$(document).on('click', 'button#reveal', function() {
    var $flip = $('.flip-container');
    $flip.toggleClass('active');
    confetti.toggle();

    if($flip.hasClass('active')) {
        var audio = new Audio('/tada.mp3');
        audio.play();
    }
});

$(document).on('click', 'button#reload', function() {
    document.location.reload();
});

$(document).on('click', 'button#remove', function() {
    var id = $(this).data('uid');
    $.post('/remove/'+id, function(res) {
        if(res.status === 'ok') {
            document.location.reload();
        }
    });
});

$(document).on('click', 'button#reset', function() {
    $.post('/reset', function(res) {
        if(res.status === 'ok') {
            document.location.reload();
        }
    });
});

$(document).ready(function() {
    setImgPosition();
    $('.flip-container').show();
});

function setImgPosition() {
    $('.ticket').each(function() {
        var $tickets = $('.tickets'),
            contW = $tickets.width(),
            contH = $tickets.height(),
            maxPosX = (contW - $(this).outerWidth() - 10),
            maxPosY = (contH - $(this).outerHeight() - 10),
            randPosX = Math.ceil((Math.random() * maxPosX)),
            randPosY = Math.ceil((Math.random() * maxPosY)),
            randZtra = Math.ceil((Math.random() * 360));
        $(this).css({
            'left': randPosX,
            'top': randPosY,
            'transform': 'rotate('+ randZtra +'deg)',
            'display': 'block'
        });
    });
}

