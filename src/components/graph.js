import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  state = {
    dataLine1: {
      labels: ['1%','2%','3%','4%','5%','6%','7%','8%','9%','10%','11%','12%'],
      datasets: [
        {
          label: "My First dataset",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(225, 204,230, .3)",
          borderColor: "rgb(205, 130, 158)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(205, 130,1 58)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [3.0, 5, 8, 4, 9, 5.5, 2,12]
        }
        
      ]
    },
    dataLine2: {
      labels: [3.0, 5, 8, 4, 9, 5.5, 2,12],
      datasets: [
        
        {
          label: "My Second dataset",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(184, 185, 210, .3)",
          borderColor: "rgb(35, 26, 136)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [5,4,3,1,9,6.6,1.5,4]
        }
      ]
    }
  };

  render() {
    return (
      <div style={{display:'flex', padding: '5% 5% 0'}} >
        <div style={{width:'50%'}}>
         
      <MDBContainer style={{width:'80%'}}>
  
        <h3 className="mt-5">Accuracy
        <div style={{float:'right',padding:'0 1% 3%'}}>
        <select>
            <option value="">Select dataset</option>
            <option value="d1">D1</option>
            <option value="d2">D2</option>
            <option value="d3" selected>D3</option>
            <option value="d4">D4</option>
          </select>
          <select>
            <option value="">Select Models</option>
            <option value="m1">M1</option>
            <option value="m2">M2</option>
            <option value="m3" selected>M3</option>
            <option value="m4">M4</option>
          </select>
          </div>
        </h3>
       
        <Line data={this.state.dataLine1} options={{ responsive: true }} />
      </MDBContainer>
      </div>
      <div style={{width:'50%'}}>
      <MDBContainer style={{width:'80%'}}>
        <h3 className="mt-5">Duration</h3>
        <Line data={this.state.dataLine2} options={{ responsive: true }} />
      </MDBContainer>
      </div>
      </div>
    );
  }
}

export default ChartsPage;