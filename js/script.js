
//para chart
//button de para la grafica de postulantes
const bttonGraph = document.getElementById("btnGraph");
bttonGraph.onclick =  ()=>{
    cerrarTotal();
    document.getElementById("body-graph").style.display = "block";
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
            text: 'Grafica de inscritos, 2023',
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
            data: datosG   
        }]
        
    });
}


const bttonGraphMedi = document.getElementById("btnGraphMedio");
bttonGraphMedi.onclick =  ()=>{
    cerrarTotal();
    document.getElementById("body-graph").style.display = "block";
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
            text: 'Grafica de Medios de comunicacion, 2023',
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
            data: datosMeG   
        }]
        
    });
}


const datosF = async() =>{
    try {
        const reponse = await fetch(URL + "Alumnos/countGeneral", { method: 'GET' });
        const data = await reponse.json();
        return data;      
    } catch (error) {
        console.log('upssss' + err);
    } finally{
        
    } 
}
let dataAr =[];
let datosG = [];
const datoFec = datosF()
datoFec.then(valor => {
    dataAr.push(valor);
    dataAr[0].carreras.map(d=>{
        datosG.push(
            {
                name: d.nombre,
                y: d.datos.total
            }
            )  
    })  
})

const datosM = async() =>{
    try {
        const reponse = await fetch(URL + "Alumnos/countGeneralMedio", { method: 'GET' });
        const data = await reponse.json();
        return data;      
    } catch (error) {
        console.log('upssss' + err);
    } finally{
        
    } 
}
let dataMeAr =[];
let datosMeG = [];
const datoME = datosM()
datoME.then(valor => {
    dataMeAr.push(valor);
    dataMeAr[0].medio.map(d=>{
        datosMeG.push(
            {
                name: d.nombre,
                y: d.datos
            }
            )  
    })
})
