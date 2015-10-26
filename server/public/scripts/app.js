var studentsArray = [];
indexTracker = 0;

$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/data",
        success: function(data) {

            fixErrors(data);
            populateArray(data);
            makeCarousel(studentsArray);
            changePerson();
            updateIndexPoints();

            $('#next').on('click', nextSlide);
            $('#prev').on('click', prevSlide);
            console.log(data);
        }
    });
});

//editing the data to update colin and dana correctly
function fixErrors (data){
    data.zeta[1].github = "https://github.com/colinchmiller";
    data.zeta[2].github= "https://github.com/Tundra969";
}


function populateArray (data){
    studentsArray = data.zeta;
}

function makeCarousel (array){
    $('#mechanics').append('<div class="maincontent"></div>');
    var $el = $('#mechanics').children().last();
    createNavButton();
    createIndexPoint();

    function createNavButton(){
        $el.append('<div id="prev" class="btn btn-default">Prev</div>');
        $el.append('<div id="next" class="btn btn-default">Next</div>');
    }
    function createIndexPoint(){
       for (var i=0; i<array.length; i++){
           $el.append("<div class='index-point' id='index" + i + "'></div>");
       }
    }
}

function changePerson(){
    for (var i=0; i<studentsArray.length; i++){
        if (indexTracker==i) {
            var x = i;
            $("#displayContent").fadeOut(2000, function(){
                $("#displayContent").empty();
                $("#displayContent").append("<p>" + studentsArray[x].name + "</p>").hide().fadeIn(2000);
                $("#displayContent").append("<p>" + studentsArray[x].github + "</p>").hide().fadeIn(2000);
                $("#displayContent").append("<p>" + studentsArray[x].shoutout + "</p>").hide().fadeIn(2000);
            });
        }
    }
}

function updateIndexPoints (){
    for (var i=0; i<studentsArray.length; i++){
        $('#index'+i).removeClass('index-active');
        if (i == indexTracker){
            $('#index'+i).addClass('index-active');
        }
    }
}

function nextSlide(){
    indexTracker++;
    if(indexTracker >= studentsArray.length){
        indexTracker = 0;
    }

    updateIndexPoints();
    changePerson();
}

function prevSlide() {
    indexTracker--;
    if (indexTracker < 0) {
        indexTracker = studentsArray.length - 1;
    }
    updateIndexPoints();
    changePerson();
}

