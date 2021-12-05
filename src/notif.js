import "./notif.css";
import React from "react";

function fadetimer() {
  let timer = setInterval(() => {
    if (this.state.visiblity < 0) {
      clearInterval(timer);
    }
    this.setState({ visiblity: this.state.visiblity - 0.01 });
  }, 25);
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
function buttonClick() {
  setTimeout(this.fadetimer(), 10);
}

export default class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblity: 1,
    };
    this.fadetimer = fadetimer.bind(this);
    this.buttonClick = buttonClick.bind(this);
  }
  render() {
    return (
      <div className="floatright" style={{ opacity: this.state.visiblity }}>
        <button className="notifbutton" onClick={this.buttonClick}>
          <h3>{this.props.heading}</h3>
          <p>{this.props.description}</p>
        </button>
      </div>
    );
  }
  async componentDidMount() {
    await delay(5900);
    this.fadetimer();
  }
}
