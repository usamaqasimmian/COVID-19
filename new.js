google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyC45EW_eQtxFPymimvAVP6DkSKFbfw9LCA'
});

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.load('current', { 'packages': ['table'] });
window.onload = function () {
    const Run = document.getElementById('Run');
    Run.addEventListener("click", start);
    Summary.addEventListener("click", second);
    WorldMap.addEventListener("click", Third);
    CompleteList.addEventListener("click", fourth);

}

async function fourth(){
    document.getElementById('table_div2').style.display = "block";
    document.getElementById('barchart_1').style.display = "none";
    document.getElementById('barchart_2').style.display = "none";
    document.getElementById('barchart_3').style.display = "none";
    document.getElementById('table_div').style.display = "none";
    document.getElementById('tabs').style.display = "none";
    document.getElementById('regions_div').style.display = "none";
    document.getElementById('regions_div2').style.display = "none";
    document.getElementById('curve_chart').style.display = "none";
    document.getElementById('myOutputPlace').style.display = "none";
    document.getElementById('total').style.display = "none";
    document.getElementById('permillion').style.display = "none";
    document.getElementById("image").src = "";
    var url = "https://api.covid19api.com/summary"
    var totalCovidData = await fetch(url)
    var covid19 = await totalCovidData.json();
    var complete = []
    for (let i = 0; i < covid19.Countries.length; i++) {
        country = [covid19.Countries[i].Country, covid19.Countries[i].TotalConfirmed, covid19.Countries[i].TotalDeaths,covid19.Countries[i].TotalRecovered]
        complete.push(country)
}
complete.sort(compareSecondColumn);

var data = new google.visualization.DataTable();
data.addColumn('string', 'Country');
data.addColumn('number', 'Total Confirmed Cases');
data.addColumn('number', 'Total Deaths ');
data.addColumn('number', 'Total Recovered');



            data.addRows(complete);

            var table = new google.visualization.Table(document.getElementById('table_div2'));

            table.draw(data, { showRowNumber: true, allowHTML: true});
}
async function Third() {
    document.getElementById('total').style.display = "block";
    document.getElementById('permillion').style.display = "block";
    document.getElementById('table_div2').style.display = "none";
    document.getElementById('barchart_1').style.display = "none";
    document.getElementById('barchart_2').style.display = "none";
    document.getElementById('barchart_3').style.display = "none";
    document.getElementById('table_div').style.display = "none";
    document.getElementById('tabs').style.display = "none";
    document.getElementById('regions_div').style.display = "inline-block";
    document.getElementById('regions_div2').style.display = "inline-block";
    document.getElementById('curve_chart').style.display = "none";
    document.getElementById('myOutputPlace').style.display = "none";
    document.getElementById("image").src = "";
    var url = "https://api.covid19api.com/summary"
    var totalCovidData = await fetch(url)
    var covid19 = await totalCovidData.json();
    let maps = [["Country", "Number of Cases per million"]]
    let overall = [["Country", "Number of Cases"]]
    for (let i = 0; i < covid19.Countries.length; i++) {
        var countryCode = await fetch("https://restcountries.eu/rest/v2/alpha/" + covid19.Countries[i].CountryCode);
        var countryData = await countryCode.json();
        let pop = countryData.population;
        let name = countryData.name
        if (name == "United States of America") {
            name = "United States"
        }
        else if (name == "Russian Federation") {
            name = "Russia"
        }

        else if (name == "United Kingdom of Great Britain and Northern Ireland") {
            name = "United Kingdom"
        }

        else if (name == "Iran (Islamic Republic of)") {
            name = "Iran"
        }

        else if (name == "Tanzania, United Republic of") {
            name = "Tanzania"
        }

        else if (name == "Korea (Republic of)") {
            name = "South Korea"
        }

        else if (name == "Viet Nam") {
            name = "Vietnam"
        }

        else if (name == "Venezuela (Bolivarian Republic of)") {
            name = "Venezuela"
        }

        else if (name == "Lao People's Democratic Republic") {
            name = "Laos"
        }

        else if (name == "Bolivia (Plurinational State of)") {
            name = "Bolivia"
        }

        else if (name == "Côte d'Ivoire") {
            name = "CIV"
        }

        else if (name == "Korea (Democratic People's Republic of)") {
            name = "KP"
        }

        else if (name == "Congo (Democratic Republic of the)") {
            name = "CD"
        }

        else if (name == "Congo") {
            name = "CG"
        }
        else if (name == "South Sudan") {
            name = "SS"
        }
        pop = pop / 1000000
        let percapita = covid19.Count
        let total = covid19.Countries[i].TotalConfirmed
        percapita = covid19.Countries[i].TotalConfirmed / pop
        percapita = parseFloat(percapita.toFixed(2))
        geo = [name, percapita];
        total = [name, total]
        overall.push(total)
        maps.push(geo)
    }

    var data = google.visualization.arrayToDataTable(maps);
    var options = {
        colorAxis: { minValue: 0, maxValue: 50000 },
    };
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);

    var data = google.visualization.arrayToDataTable(overall);
    var options = {
        colorAxis: { minValue: 0, maxValue: 20000000, colors: ["#E5D1E3", "#871F78"] },
    };
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div2'));

    chart.draw(data, options);

    message = document.getElementById("total");
    message.innerHTML = "";
    message.innerHTML = "Total Cases";

    message = document.getElementById("permillion");
    message.innerHTML = "";
    message.innerHTML = "Cases per Million";
}


async function second() {
    document.getElementById('total').style.display = "none";
    document.getElementById('permillion').style.display = "none";
    document.getElementById('table_div2').style.display = "none";
    document.getElementById('regions_div2').style.display = "none";
    document.getElementById('myOutputPlace').style.display = "none";
    document.getElementById('barchart_1').style.display = "block";
    document.getElementById('barchart_2').style.display = "block";
    document.getElementById('barchart_3').style.display = "block";
    document.getElementById('tabs').style.display = "none";
    document.getElementById('curve_chart').style.display = "none";
    document.getElementById('table_div').style.display = "none";
    document.getElementById('regions_div').style.display = "none";
    document.getElementById("image").src = "";
    var url = "https://api.covid19api.com/summary"
    var totalCovidData = await fetch(url)
    var covid19 = await totalCovidData.json();
    let total = []
    let total_deaths = []
    let fatality_rate = []
    let global_recovery = covid19.Global.TotalConfirmed;
    let global_deaths = covid19.Global.TotalDeaths;
    let global_cases = covid19.Global.TotalConfirmed;

    for (let i = 0; i < covid19.Countries.length; i++) {
        country = [covid19.Countries[i].Country, covid19.Countries[i].TotalConfirmed]
        deaths = [covid19.Countries[i].Country, covid19.Countries[i].TotalDeaths]
        recovered = [covid19.Countries[i].Country, (covid19.Countries[i].TotalDeaths / covid19.Countries[i].TotalConfirmed) * 100]
        recovered[1] = parseFloat(recovered[1].toFixed(2))
        total.push(country)
        total_deaths.push(deaths)
        fatality_rate.push(recovered)
    }
    total.sort(compareSecondColumn);
    top10 = total.slice(0, 9)
    tosubtract = 0
    for (let i = 0; i < top10.length; i++) {
        tosubtract = tosubtract + top10[i][1];
    }
    global_cases = global_cases - tosubtract;

    top10.unshift(["Country", "Total Cases"])
    top10.push(["Others", global_cases])

    var data = google.visualization.arrayToDataTable(top10);

    var options = {
        title: 'Covid-19 Highest Cases',
        is3D: true,

    };

    var chart = new google.visualization.BarChart(document.getElementById('barchart_1'));

    chart.draw(data, options);



    fatality_rate.sort(compareSecondColumn);
    top10 = fatality_rate.slice(0, 9)
    top10.unshift(["Country", "Fatality Rate"])
    global_recovery = (global_deaths / global_recovery) * 100
    global_recovery = global_recovery.toFixed(2)
    top10.push(["Global", global_recovery])

    var data = google.visualization.arrayToDataTable(top10);

    var options = {
        title: 'Covid-19 Highest Fatality Rate (%)',
        is3D: true,
        colors: ['#696969']
    };

    var chart = new google.visualization.BarChart(document.getElementById('barchart_3'));

    chart.draw(data, options);

    total_deaths.sort(compareSecondColumn)
    top10 = total_deaths.slice(0, 9)

    tosubtract = 0
    for (let i = 0; i < top10.length; i++) {
        tosubtract = tosubtract + top10[i][1];
    }
    global_deaths = global_deaths - tosubtract;

    top10.unshift(["Country", "Total Deaths"])
    top10.push(["Others", global_deaths])
    var data = google.visualization.arrayToDataTable(top10);

    var options = {
        title: 'Covid-19 Highest Deaths',
        is3D: true,
        colors: ['#FF6347']

    };

    var chart = new google.visualization.BarChart(document.getElementById('barchart_2'));

    chart.draw(data, options);

}
function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

function start() {
    var div = document.getElementById("curve_chart")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    };
    var div = document.getElementById("myOutputPlace")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    };
    var div = document.getElementById("table_div")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    };
    var div = document.getElementById("barchart_1")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    };
    var div = document.getElementById("barchart_2")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    };
    var div = document.getElementById("barchart_3")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    };
    var div = document.getElementById("regions_div")
    while (div.firstChild) {
        div.removeChild(div.firstChild)
    };
    document.getElementById('table_div2').style.display = "none";
    document.getElementById('regions_div2').style.display = "none";
    document.getElementById('barchart_1').style.display = "none";
    document.getElementById('barchart_2').style.display = "none";
    document.getElementById('barchart_3').style.display = "none";
    document.getElementById('curve_chart').style.display = "block";
    document.getElementById('table_div').style.display = "block";
    document.getElementById('regions_div').style.display = "none";
    document.getElementById("image").src = "";
    document.getElementById('tabs').style.display = "inline-block";
    document.getElementById('total').style.display = "none";
    document.getElementById('permillion').style.display = "none";
    document.getElementById('myOutputPlace').style.display = "block";
    getConfirmed();
}
async function getConfirmed() {

    document.getElementById('default').className = "tablinks active";
    document.getElementById('second').className = "tablinks";
    document.getElementById('third').className = "tablinks";
    var e = document.getElementById("country");
    var country = e.options[e.selectedIndex].text;
    var myDataArray = [["Date", "New Cases"]]
    try {
        var url = "https://api.covid19api.com/total/country/" + country + "/status/confirmed"
        var totalCovidData = await fetch(url)
        var covid19 = await totalCovidData.json();
        var totalConfirmed = covid19[covid19.length - 1].Cases
        myDataArray = [["Date", "New Cases"]]
        totalConfirmed = covid19[covid19.length - 1].Cases
        for (let i = 0; i < covid19.length; i++) {
            var date = covid19[i].Date
            date = date.substring(0, 10);
            if (i == 0) {
                var confirmed = covid19[0].Cases
                myDataArray.push([date, confirmed])
            }

            else {
                var confirmed = covid19[i].Cases - covid19[i - 1].Cases
                if (confirmed < 0) {
                    //pass
                }
                else {
                    myDataArray.push([date, confirmed])
                }
            }
        }
    }
    catch (err) {
        console.log(err)
    }

    if (myDataArray.length == 1) {
        message = document.getElementById("myOutputPlace");
        message.innerHTML = "";
        message.innerHTML = "No Data available for " + country;
        document.getElementById("image").src = "";

        var div = document.getElementById("curve_chart")
        while (div.firstChild) {
            div.removeChild(div.firstChild)
        };

        var div = document.getElementById("table_div")
        while (div.firstChild) {
            div.removeChild(div.firstChild)
        };
    }

    else {

        var data = google.visualization.arrayToDataTable(myDataArray);
        var options = {
            title: 'Covid 19 Cases for ' + country,
            legend: { position: 'bottom' },
        };

        url = "https://api.covid19api.com/total/country/" + country + "/status/deaths"
        totalCovidData = await fetch(url)
        covid19 = await totalCovidData.json();
        totalDeaths = covid19[covid19.length - 1].Cases
        url = "https://api.covid19api.com/total/country/" + country + "/status/recovered"
        totalCovidData = await fetch(url)
        covid19 = await totalCovidData.json();
        totalRecovered = covid19[covid19.length - 1].Cases
        var countryCode = await fetch("https://restcountries.eu/rest/v2/name/" + country);
        var countryData = await countryCode.json();
        var population;
        if (country == "India") {
            code = countryData[1].alpha2Code;
            population = countryData[1].population;

        }

        else if (country == "South Korea") {
            code = "KR"
            population = 51273775
        }
        else {
            code = countryData[0].alpha2Code;
            population = countryData[0].population;

        }

        population = population / 1000000

        var casespermillion = totalConfirmed / population;
        var deathspermillion = totalDeaths / population;

        casespermillion = casespermillion.toFixed(2);
        deathspermillion = deathspermillion.toFixed(2);

        var totalPercentage = (totalRecovered / totalConfirmed) * 100;
        totalPercentage = totalPercentage.toFixed(2);


        if (country == "United States of America") {
            var wiki = country.replace(" ", "_");
            var wikiUrl = "https://en.wikipedia.org/wiki/COVID-19_pandemic_in_the_" + wiki;
        }

        else {

            var wiki = country.replace(" ", "_");
            var wikiUrl = "https://en.wikipedia.org/wiki/COVID-19_pandemic_in_" + wiki;
        }

        var read = "this".link(wikiUrl)
        var countryImage = "https://www.countryflags.io/" + code + "/flat/64.png";
        document.getElementById("image").src = countryImage;

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
        document.getElementById("tabs").style.display = "inline-block";



        let fatalityRate = (totalDeaths / totalConfirmed) * 100;
        fatalityRate = fatalityRate.toFixed(2);

            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Total Confirmed Cases');
            data.addColumn('number', 'Total Deaths');
            data.addColumn('number', 'Total Recovered');
            data.addColumn('string', 'Total Cases per million');
            data.addColumn('string', 'Total Deaths per million');
            data.addColumn('string', 'Recovery Percentage');
            data.addColumn('string', 'Fatality Rate');


            data.addRows([
                [totalConfirmed, totalDeaths, totalRecovered, casespermillion, deathspermillion, totalPercentage + "%", fatalityRate + "%"],
            ]);

            var table = new google.visualization.Table(document.getElementById('table_div'));

            table.draw(data, { showRowNumber: false, width: '100%', height: '100%' });
        

        message = document.getElementById("myOutputPlace");
        message.innerHTML = "";
        message.innerHTML = "For more information on Covid-19 Pandemic in " + country + " visit " + read + " article";

    }
}

async function getDeaths() {
    document.getElementById('default').className = "tablinks";
    document.getElementById('third').className = "tablinks";
    document.getElementById('second').className = "tablinks active";
    var e = document.getElementById("country");
    var country = e.options[e.selectedIndex].text;
    var myDataArray = [["Date", "New Cases"]]
    try {

        var url = "https://api.covid19api.com/total/country/" + country + "/status/deaths"
        var totalCovidData = await fetch(url)
        var covid19 = await totalCovidData.json();
        myDataArray = [["Date", "New Deaths"]]
        totalDeaths = covid19[covid19.length - 1].Cases
        for (let i = 0; i < covid19.length; i++) {
            var date = covid19[i].Date
            date = date.substring(0, 10);
            if (i == 0) {
                var Deaths = covid19[0].Cases
                myDataArray.push([date, Deaths])
            }

            else {
                var Deaths = covid19[i].Cases - covid19[i - 1].Cases
                if (Deaths < 0) {
                    //pass
                }
                else {
                    myDataArray.push([date, Deaths])
                }
            }
        }
    }
    catch (err) {
        console.log(err)
    }


    if (myDataArray.length == 1) {
        //pass
    }

    else {

        var data = google.visualization.arrayToDataTable(myDataArray);
        var options = {
            title: 'Covid 19 Deaths for ' + country,
            legend: { position: 'bottom' },
            colors: ['#FF6347'],

        };


        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);

    }
}


async function getRecovered() {
    document.getElementById('default').className = "tablinks";
    document.getElementById('second').className = "tablinks";
    document.getElementById('third').className = "tablinks active";
    var e = document.getElementById("country");
    var country = e.options[e.selectedIndex].text;
    var myDataArray = [["Date", "New Cases"]]
    try {

        var url = "https://api.covid19api.com/total/country/" + country + "/status/recovered"
        var totalCovidData = await fetch(url)
        var covid19 = await totalCovidData.json();
        myDataArray = [["Date", "Recovered"]]
        totalDeaths = covid19[covid19.length - 1].Cases
        for (let i = 0; i < covid19.length; i++) {
            var date = covid19[i].Date
            date = date.substring(0, 10);
            if (i == 0) {
                var Deaths = covid19[0].Cases
                myDataArray.push([date, Deaths])
            }

            else {
                var Deaths = covid19[i].Cases - covid19[i - 1].Cases
                if (Deaths < 0) {
                    //pass
                }
                else {
                    myDataArray.push([date, Deaths])
                }
            }
        }
    }
    catch (err) {
        console.log(err)
    }


    if (myDataArray.length == 1) {
        //pass
    }

    else {

        var data = google.visualization.arrayToDataTable(myDataArray);
        var options = {
            title: 'Covid 19 Deaths for ' + country,
            legend: { position: 'bottom' },
            colors: ['#008000'],

        };


        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);

    }
}


