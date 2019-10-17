import React from "react";
import { Chart } from "react-google-charts";

export default class UserChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    const xhr = new XMLHttpRequest();
    const _this = this;
    const data = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
    xhr.open(
      "GET",
      "https://cors-anywhere.herokuapp.com/https://totalcloud-static.s3.amazonaws.com/intern.json"
    );
    xhr.send();
    let arr = [];
    xhr.onload = function() {
      const users = JSON.parse(xhr.responseText);
      const array = [
        [
          { type: "string", id: "id" },
          { type: "string", id: "name" },
          { type: "date", id: "Start" },
          { type: "date", id: "End" }
        ]
      ];
      users.map(user => {
        let startDate, endDate;

        if (data.includes(user.end.split("/")[0])) {
          endDate = user.end.split("/")[0][1];
        } else {
          endDate = user.end.split("/")[0];
        }
        if (data.includes(user.start.split("/")[0])) {
          startDate = user.start.split("/")[0][1];
        } else {
          startDate = user.start.split("/")[0];
        }
        arr.push(startDate, endDate);
        array.push([
          `${user.id}`,
          user.name,
          new Date(2019, 8, Number(startDate)),
          new Date(2019, 8, Number(endDate))
        ]);
      });
      console.log(arr);
      _this.setState({ users: array });
    };
  }

  render() {
    return (
      <div>
        <Chart
          width={"100vh"}
          height={"100vh"}
          chartType="Timeline"
          loader={<div>Loading Chart</div>}
          data={this.state.users}
          options={{
            timeline: {
              singleColor: "#E34625"
            },
            hAxis: {
              minValue: new Date(2019, 7, 31),
              maxValue: new Date(2019, 9, 1),
              format: "d"
            }
          }}
          rootProps={{ "data-testid": "6" }}
        />
      </div>
    );
  }
}
