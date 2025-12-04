$(function() {
    
    // 1. Efek Opacity (Muncul perlahan)
    window.setTimeout(function() {
        $('.fadhil-container').css('opacity', '1');
    }, 500);

    // 2. Tambahkan class default ke kotak footer
    $('.fadhil-item').addClass('default');

    // 3. Logika Hover (Ganti 'click' jadi 'mouseenter')
    $('.fadhil-item').on('mouseenter', function() {
        
        // Cari semua kotak teman-temannya
        var e = $('.fadhil-container > .fadhil-item');
        
        // Hapus class expand dari kotak lain
        e.removeClass('expand');
        
        // Tambahkan class expand ke kotak yang sedang ditunjuk cursor
        $(this).addClass('expand');
    });

    // (Opsional) Biar kembali mengecil kalau mouse keluar dari area footer
    $('.fadhil-container').on('mouseleave', function() {
        $('.fadhil-item').removeClass('expand');
    });

});