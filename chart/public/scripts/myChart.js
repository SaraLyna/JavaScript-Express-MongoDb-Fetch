


const socket = io('http://localhost:8080');

socket.on('ping', (data) => {
  console.log('Received from server:', data);

  socket.emit('pong', { message: 'pong' });
});

socket.on('parametrizedMessage', (data) => {
    console.log('Received message from server:', data.number);

    myChart.data.datasets[0].data.unshift(data.number);
    myChart.data.datasets[0].data.pop();


    const element = myChart.data.labels.pop();
    myChart.data.labels.unshift(element);

    myChart.update();

});

const nbValues = 12;
const defaultValue = 1;
const MIN_VALUE = 0;
const MAX_VALUE = 10;


const allLabels = new Array(nbValues).fill(defaultValue).map( (_,i) => String.fromCharCode('A'.charCodeAt(0)+i));
//const allLabels = ['J','F','M','A','M','J','J','A','S','O','N','D'];


const ctxt = document.getElementById('myChart').getContext('2d');

// l'objet Chart
const myChart = new Chart(ctxt, {
    type: 'bar',
    data: {
        labels: allLabels,
        datasets: [{
            label : `mes ${nbValues} dernières données`,
            data :  new Array(nbValues).fill(defaultValue),
            backgroundColor: 'rgba(128,255,128,0.5)',
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
              min: MIN_VALUE,
              max: MAX_VALUE
            }
      }
    }
  });
