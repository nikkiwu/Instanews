$('select').selectric();


const $articleList = $('.contentList');
$('.loader').hide();

$('select').change('click', function () {
    $articleList.empty();

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

        let $dataSet = data.results.filter(function (item) {
            return item.multimedia.length;
        }).slice(0, 12);

        $.each($dataSet, function(key, value) {
            let url = value.url;
            let image = value.multimedia[4].url;
            let title = value.title;
            let caption = value.abstract;


            resultData += '<li class="articles" alt="'+ title +'" style="background-image: url(' + image + ');"> <a href=' + url + '>' + '</a> <p class="caption">' + caption + '</p></li>';
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