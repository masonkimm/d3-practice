console.log('d3: ', d3);
console.log('topojson: ', topojson);

let countyURL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
let educationalURL =
  'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

let countyData;
let educationalData;

// const fetchCountyData = async () => {
//   await fetch(`${countyURL}`)
//     .then((res) => res.json())
//     .then((data) => console.log('countyData: ', data));
// };
// fetchCountyData();

// const fetchEducationalData = async () => {
//   await fetch(`${countyURL}`)
//     .then((res) => res.json())
//     .then((data) => console.log('educationalData: ', data));
// };
// fetchEducationalData();

let canvas = d3.select('#canvas');

let drawMap = () => {};

// fetching data
d3.json(countyURL).then((data, error) => {
  if (error) {
    console.log(log);
  } else {
    countyData = data;
    console.log('d3 countyData:', countyData);
    d3.json(educationalURL).then((data, error) => {
      if (error) {
        console.log(log);
      } else {
        educationalData = data;
        console.log('d3 educationalData:', educationalData);
      }
    });
  }
});

// drawMap();
