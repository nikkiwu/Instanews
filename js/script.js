$('select').selectric();


const $articleList = $('.contentList');

$('.loader').hide();

$('select').change('click', function () {
    $articleList.empty();
    $('header').addClass('minified');
    $('.loader').show();

    let url = 'https://api.nytimes.com/svc/topstories/v2/';
    url += this.value;
    url += '.json';
    url += '?' + $.param({'api-key': 'ff0599e4f3a24cf58038240ffc091e3b'});

    $.ajax({
        url: url,
        method: 'GET',
    }).done(function(data) {
        let resultData = '';

        const $dataSet = data.results.filter(function (item) {
            return item.multimedia.length;
        }).slice(0, 12);

        $.each($dataSet, function(key, value) {
            const url = value.url;
            const image = value.multimedia[4].url;
            const title = value.title;
            const caption = value.abstract;


            resultData += '<a target="_blank" href=' + url + '><li class="articles" alt="'+ title +'" style="background-image:url(' + image + ');"><p class="caption">' + caption + '</p></li></a>';
        });

        $('.loader').hide();
        $('.contentList').append(resultData);
    }).fail(function() {
        $('.loader').append('p').text('Something went wrong, sorry!');
    })
        .always(function() {
            $('.loader').hide();
        })
});