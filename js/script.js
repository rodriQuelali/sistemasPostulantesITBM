
//para chart
//button de para la grafica de postulantes
const bttonGraph = document.getElementById("btnGraph");
bttonGraph.onclick = ()=>{
    cerrarTotal();
    document.getElementById("body-graph").style.display = "block";
}
const datosF = async() =>{
    try {
        const reponse = await fetch(URL + "Alumnos/countGeneral", { method: 'GET' });
        const data = await reponse.json();
        return data;      
    } catch (error) {
        console.log('upssss' + err);
    } finally{
        console.log('al final');
    } 
}
let dataAr =[];
const datoFec = datosF()
// datoFec.then(valor => {
//      dataAr.push(valor);
//      console.log(dataAr[0]);   
// });




// Data retrieved from https://netmarketshare.com
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: {linearGradient: [0, 0, 500, 500],
        stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(200, 200, 255)']
        ]},
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in May, 2020',
        align: 'center'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 70.67,
            sliced: true,
            selected: true
        }, {
            name: 'Edge',
            y: 14.77
        },  {
            name: 'Firefox',
            y: 4.86
        }, {
            name: 'Safari',
            y: 2.63
        }, {
            name: 'Internet Explorer',
            y: 1.53
        },  {
            name: 'Opera',
            y: 1.40
        }, {
            name: 'Sogou Explorer',
            y: 0.84
        }, {
            name: 'QQ',
            y: 0.51
        }, {
            name: 'Other',
            y: 2.6
        }, {
            name: 'cccc',
            y: 0.19
        },]
    }]
});