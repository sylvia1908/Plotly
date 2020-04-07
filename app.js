d3.json("samples.json").then((fulldata)=>{
    

    var data = fulldata.samples;
    data = data;
    var id = data.map(row => row.id)
    

    function flatten(arr) {
        var flat = [];
        for (var i = 0; i < arr.length; i++) {
            flat = flat.concat(arr[i]);
        }
        return flat;
    }



// get sample id in dropdown

    d3.select("#selDataset").selectAll("option")
        .data(id)
        .enter()
        .append("option")
        .text(function(d) { return d; })

    function filterDate(id){
        var filteredData = data.filter(data => data.id == id);
        var x = (filteredData.map(row => row.sample_values)[0]);
        var y = (filteredData.map(row => row.otu_ids)[0]);
        var text = (filteredData.map(row => row.otu_labels)[0]);
        y1 = y.map(row => "OUT "+row.toString());


        return [x,y1,text,y]
    };

    function filteretadata(id){
        var metadata = fulldata.metadata;
        var filteredMetadata = metadata.filter(data =>data.id == id)[0];
        var meta = []
        Object.entries(filteredMetadata).forEach(([key, value]) => {
            meta.push( key + " : "+ value)
          });
          d3.select("#sample-metadata").selectAll("p").remove();

          d3.select("#sample-metadata").selectAll("p")
          .data(meta)
          .enter()
          .append("p")
          .text(function(d) { return d; })

            var level = filteredMetadata.wfreq

            var degrees = 180-(level)*18;
              // alert(degrees);
                radius = .5;
            var radians = degrees * Math.PI / 180;
            var x = radius * Math.cos(radians);
            var y = radius * Math.sin(radians);

            // Path: may have to change to create a better triangle
            var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
                pathX = String(x),
                space = ' ',
                pathY = String(y),
                pathEnd = ' Z';
            var path = mainPath.concat(pathX,space,pathY,pathEnd);

            var data = [{ type: 'category',
            x: [0], y:[0],
                marker: {size: 28, color:'850000'},
                showlegend: false,
                name: 'wash',
                text: level,
                hoverinfo: 'text+name'},
                {
                    values: [
                      50/5,
                      50/5,
                      50/5,
                      50/5,
                    //   50/5,
                      50/5,
                      50
                    ],
                    rotation: 90,
                    text: [
                    //   "TOO FAST!",
                      "8-10",
                      "6-8",
                      "4-6",
                      "2-4",
                      "0-2",
                      ""
                    ],
                    textinfo: "text",
                    textposition: "inside",
                    marker: {
                      colors: [
                        "rgba(14, 127, 0, .5)",
                        "rgba(110, 154, 22, .5)",
                        "rgba(170, 202, 42, .5)",
                        // "rgba(202, 209, 95, .5)",
                        "rgba(210, 206, 145, .5)",
                        "rgba(232, 226, 202, .5)",
                        "rgba(255, 255, 255, 0)"
                      ]
                    },
                    labels: [
                      "151-180",
                      "121-150",
                      "91-120",
                      "61-90",
                      "31-60",
                      "0-30",
                      ""
                    ],
                    hoverinfo: "label",
                    hole: .5,
                    type: "pie",
                    showlegend: false
                  }];

            var layout = {
                shapes:[{
                    type: 'path',
                    path: path,
                    fillcolor: '850000',
                    line: {
                        color: '850000'
                    }
                    }],
                title: 'BB Wash Frequency',
                height: 500,
                width: 600,
                xaxis: {type:'category',zeroline:false, showticklabels:false,
                            showgrid: false, range: [-1, 1]},
                yaxis: {type:'category',zeroline:false, showticklabels:false,
                            showgrid: false, range: [-1, 1]}
                };

            Plotly.newPlot('gauge', data, layout);
                    //   Plotly.newPlot('gauge', data, layout);


    };

    function plotBar(data){
        var trace1 = [{
            x: data[0].slice(0, 10).reverse(),
            y: data[1].slice(0, 10).reverse(),
            text: data[2].slice(0, 10).reverse(),
            type: "bar",
            orientation: "h"
        }];
    
    
        var trace2 = [{
            x: data[3],
            y: data[0],
            text: data[2],
            mode: 'markers',
            marker: {
                color: data[3],
                opacity:  0.4,
                size: data[0]
        }}];
    
        Plotly.newPlot("bubble", trace2);

        Plotly.newPlot("bar", trace1);


    };
    // Initializes the page with a default plot
    function init() {
        var initId = id[0]

    var chartData =filterDate(initId);
    plotBar(chartData);

    filteretadata(initId);

    };
    init();
  

    d3.selectAll("#selDataset").on("change", optionChanged);
    
    function optionChanged(){
        var seletctedId = d3.select("#selDataset").node().value; ;
        var chartData =filterDate(seletctedId);
        plotBar(chartData);
        filteretadata(seletctedId);
        
    
    }



});






