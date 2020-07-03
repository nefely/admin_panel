var picker = new Lightpick({
    field: document.getElementById('datepicker'),
    singleDate: false,
    numberOfMonths: 2,
    lang: "en",
    onSelect: function(start, end){
        var str = '';
        str += start ? start.format('Do MMMM YYYY') + ' to ' : '';
        str += end ? end.format('Do MMMM YYYY') : '...';
    }
});