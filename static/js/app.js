function buildMetadata(sample) {



  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  //var url = `/metadata/${sample}`;
  //d3.json(url).then(function(sample){
    //Use d3 to select the panel with id of `#sample-metadata`
    var sample_metadata = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    sample_metadata.html("");


    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(sample).forEach(function ([key, value]) {
      var row = sample_metadata.append("p");
      if (value.length > 0) {
        value = new String(value[0]).split(';').join(', ');
      }
      row.text(`${key}: ${value}`);
    });
  }
    

function buildCharts(data) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // var url = `../samples.json`;
  // d3.json(url).then(function(d) {
    //console.log(dat
    // var data = undefined;

    // let i=0;
    
    // for(i=0; i<d.samples.length; i++){
    //   let sample = d.samples[i];
    //   if(i == index){
    //     data = sample;
    //     break;
    //   }
    // }
    //@TODO: Build a Bubble Chart using the sample data
    var x_values = data.otu_ids;
    var y_values = data.sample_values;
    var m_size = data.sample_values;
    var m_colors = data.otu_ids; 
    var t_values = data.otu_labels;

    var trace1 = {
      x: x_values,
      y: y_values,
      text: t_values,
      mode: 'markers',
      marker: {
        color: m_colors,
        size: m_size
      } 
    };
  
    var bubbleData = [trace1];

    var layout = {
      xaxis: { title: "OTU ID"},
    };

    Plotly.newPlot('bubble', bubbleData, layout);
   

    // // @TODO: Build a Pie Chart
    // d3.json(url).then(function(data) {  
      console.log(data)
    var pie_values = data.sample_values.slice(0,10);
    var pie_labels = data.otu_ids.slice(0,10);
    var pie_hover = data.otu_labels.slice(0,10);

      var data = [{
        values: pie_values,
        labels: pie_labels,
        hovertext: pie_hover,
        type: 'pie'
      }];
    
      Plotly.newPlot('pie', data);

    // });
//})

}

var samples = []


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("../samples.json").then((sampleNames) => {
    samples = sampleNames
    sampleNames['names'].forEach((sample, index) => {
      //console.log(index)
      selector
        .append("option")
        .text(sample)
        .property("value", sample)
//        .on("click",  buildCharts(index))
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames['samples'][0];
    //console.log(firstSample)
    //buildCharts(firstSample);
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSampleId) {
  for(i=0; i<samples["samples"].length; i++){
      let sample = samples["samples"][i];
      if(sample["id"] == newSampleId){
        buildCharts(sample);
        buildMetadata(sample);
        break;
      }
    }
  // Fetch new data each time a new sample is selected
  
}

// Initialize the dashboard
console.log('Calling the init')
init();