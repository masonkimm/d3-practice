console.log('d3: ', d3);
console.log('topojson: ', topojson);

let countyURL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
let educationalURL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

let countyData;
let educationalData;

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');

let drawMap = () => {
  canvas
    .selectAll('path')
    .data(countyData)
    .enter()
    .append('path')
    .attr('d', d3.geoPath()) /* converts geometry into string into d att */
    .attr('class', 'county')
    .attr('fill', (countyDataItem) => {
      let id = countyDataItem['id'];
      let county = educationalData.find((item) => {
        return item['fips'] === id;
      });
      let percentage = county['bachelorsOrHigher'];
      if (percentage <= 15) {
        return 'tomato';
      } else if (percentage <= 30) {
        return 'orange';
      } else if (percentage <= 45) {
        return 'lightgreen';
      } else {
        return 'limegreen';
      }
    })
    .attr('data-fips', (countyDataItem) => {
      return countyDataItem['id'];
    })
    .attr('data-education', (countyDataItem) => {
      let id = countyDataItem['id'];
      let county = educationalData.find((item) => {
        return item['fips'] === id;
      });
      let percentage = county['bachelorsOrHigher'];
      return percentage;
    })
    .on('mouseover', (e, countyDataItem) => {
      tooltip.transition().style('visibility', 'visible');
      let id = countyDataItem['id'];
      let county = educationalData.find((item) => {
        return item['fips'] === id;
      });
      tooltip.text(
        county['fips'] +
          ' - ' +
          county['area_name'] +
          ', ' +
          county['state'] +
          ': ' +
          county['bachelorsOrHigher'] +
          '%'
      );
      tooltip.attr('data-education', county['bachelorsOrHigher']);
    })
    .on('mouseout', (e, countyDataItem) => {
      tooltip.transition().style('visibility', 'hidden');
    });
};

// fetching data
d3.json(countyURL).then((data, error) => {
  if (error) {
    console.log(log);
  } else {
    // to covert data into geoJson
    countyData = topojson.feature(data, data.objects.counties).features;
    console.log('d3 countyData:', countyData);

    // to fetch educationalData asynchronously
    d3.json(educationalURL).then((data, error) => {
      if (error) {
        console.log(log);
      } else {
        educationalData = data;
        console.log('d3 educationalData:', educationalData);
        drawMap();
      }
    });
  }
});
