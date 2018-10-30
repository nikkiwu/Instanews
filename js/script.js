$('select').selectric();

const $selection = $('.selection');
const $articleList = $('.contentList');
const $loader = $('.loader');


$loader.hide();


$('select').on('change', function () {
    const section = $(this).val();

    if (!section.length) {
        return;
    }

    $articleList.empty();
    $('header').addClass('minified');
    $('.loader').show();

    getStories(section);

});



function getStories(section) {


    let url = 'https://api.nytimes.com/svc/topstories/v2/';
    url += section;
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

        for(let value of $dataSet){
            const url = value.url;
            const image = value.multimedia[4].url;
            const title = value.title;
            const caption = value.abstract;


            resultData += '<a target="_blank" href=' + url + '><li class="articles" alt="'+ title +'" style="background-image:url(' + image + ');"><p class="caption">' + caption + '</p></li></a>';
        };

        $('.loader').hide();
        $('.contentList').append(resultData);
    })

.fail(function() {
        $('.loader').append('p').text('Something went wrong, sorry!');
    })
        .always(function() {
            $('.loader').hide();
        });

    $selection.on('click', function () {
        alert("doesn't load");
    })

}

