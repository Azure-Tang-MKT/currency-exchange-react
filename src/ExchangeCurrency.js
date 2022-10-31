import React from "react";
import { Select, message } from "antd";
import moment from "moment";
import "antd/dist/antd.css";

const { Option } = Select; //

class ExchangeCurrency extends React.Component {
  state = {
    selectedValue: "USD",
    exchangeRate: "",
    date: moment().format("YYYY-MM-DD"), //moment js
  };

  handleOnChange = (value) => {
    this.setState({ selectedValue: value });
  };

  fetchData = async () => {
    try {
      const res = await fetch(
        `https://www.bankofcanada.ca/valet/observations/FXCAD${
          this.state.selectedValue
        }/json?start_date=${
          this.props.date ? this.props.date : this.state.date
        }&end_date=${this.props.date ? this.props.date : this.state.date}`
      );
      const data = await res.json();
      console.log(data);

      if (data.observations.length !== 0) {
        this.setState({
          exchangeRate:
            data.observations[0][`FXCAD${this.state.selectedValue}`].v,
        });
      } else {
        message.info("There is no exchange rate on this date!!");
        this.setState({ exchangeRate: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    this.fetchData();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.selectedValue !== prevState.selectedValue) {
      this.fetchData();
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (this.props.date !== nextProps.date) {
      this.setState({
        date: nextProps.date,
      });
      this.fetchData();
    }
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: "10px" }}>
          <Select
            defaultValue="USD"
            style={{ width: 130 }}
            onChange={this.handleOnChange}
          >
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
          </Select>
        </div>
        <div style={{ marginTop: "10px" }}>
          <p>Today's exchange rate is ${this.state.exchangeRate}</p>
        </div>
      </div>
    );
  }
}
export default ExchangeCurrency;
