import React from "react";
import PropTypes from "prop-types";

export class Uploader extends React.PureComponent {
  static propTypes = {};
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    <div>
      <input type="file" style={{ display: "none" }} ref/>
    </div>;
  }
}
