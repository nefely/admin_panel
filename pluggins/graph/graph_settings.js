$(document).ready(function(){

var data_1 = [
    ['', '', ''],
    ['Jan',610,1300],
    ['Feb',720,1260],
    ['Mar',630,1100],
    ['Apr',640,1080],
    ['May',850,900],
    ['Jun',160,660],
    ['Jul',870,720],
    ['Aug',1020,540],
    ['Sep',1360,700],
    ['Okt',1470,960],
    ['Nov',1290,1220],
    ['Dec',1310,1240],
]
var data_2 = [
    ['', '', ''],
    ['Jan',1610,1300],
    ['Feb',1720,1260],
    ['Mar',1630,1100],
    ['Apr',1640,1080],
    ['May',1850,1900],
    ['Jun',1160,1660],
    ['Jul',1870,1720],
    ['Aug',1020,540],
    ['Sep',2360,700],
    ['Okt',1470,960],
    ['Nov',1290,1220],
    ['Dec',2310,1240],
]
var data_3 = [
    ['', '', ''],
    ['Jan',2110,1300],
    ['Feb',1720,1260],
    ['Mar',1630,2100],
    ['Apr',640,1080],
    ['May',850,1900],
    ['Jun',1160,2660],
    ['Jul',1870,1720],
    ['Aug',1020,540],
    ['Sep',1360,1700],
    ['Okt',1470,960],
    ['Nov',1290,1220],
    ['Dec',2310,1240],
]
var data_4 = [
    ['', '', ''],
    ['Jan',3110,1300],
    ['Feb',3720,1260],
    ['Mar',3630,2100],
    ['Apr',340,1080],
    ['May',350,1900],
    ['Jun',3160,2660],
    ['Jul',3870,1720],
    ['Aug',3020,540],
    ['Sep',3360,1700],
    ['Okt',3470,960],
    ['Nov',3290,1220],
    ['Dec',3310,1240],
]

var data_number = data_1;

$('.dashboard_graph_filter_list > ul > li:nth-child(1)').click(function(){
    data_number = data_1;
    drawChart()
})
$('.dashboard_graph_filter_list > ul > li:nth-child(2)').click(function(){
    data_number = data_2;
    drawChart()
})
$('.dashboard_graph_filter_list > ul > li:nth-child(3)').click(function(){
    data_number = data_3;
    drawChart()
})
$('.dashboard_graph_filter_list > ul > li:nth-child(4)').click(function(){
    data_number = data_4;
    drawChart()
})


google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);
function drawChart(data) {
    var data = google.visualization.arrayToDataTable(data_number);
    var options = {
        hAxis: {title: '',  titleTextStyle: {color: '#333'} },
        vAxis: {minValue: 0},
        legend: 'none',
        crosshair: { trigger: 'both' },
        lineWidth: 1,
        curveType: 'function',
        series: {
            0: { color: '#a97fff' },
            1: { color: '#ff8886' },
            2: { color: '#9573db' },
        },
        pointSize: 1,
    };

    var chart = new google.visualization.AreaChart(document.getElementById('dashboard_graph'));
    chart.draw(data, options);
}

});