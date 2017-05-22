import React from 'react';


class Case extends React.Component {
  render() {
    return (
      <section className="case">
        <h1>{this.props.case.title}</h1>
      </section>
    );
  }
}

export default Case

