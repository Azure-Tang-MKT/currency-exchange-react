import React from "react";
import ExchangeCurrency from "./ExchangeCurrency";
import { Calendar } from "antd";
import moment from "moment";

class App extends React.Component {
  state = { date: "" };

  handleDateChange = (date) => {
    this.setState({ date: moment(date).format("YYYY-MM-DD") });
  };

  render() {
    return (
      <div>
        <Calendar
          fullscreen={false}
          onChange={(date) => this.handleDateChange(date)}
          //   onPanelChange={(date, mode) => {
          //     console.log(date);
          //     console.log(mode);
          //   }
          // }
        />
        <ExchangeCurrency date={this.state.date} />
      </div>
    );
  }
}
export default App;
