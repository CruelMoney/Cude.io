import React from 'react';
import editor from '../../higher-order-components/Editor/index';


class Case extends React.Component {
  render() {
    return (
      <section className="case">
        <h1>
          {this.props.editMode ?
          <textarea
            defaultValue=  {this.props.case.title}
            onChange={(event)=>this.props.registerEdits(this.props.case._id,{title:event.target.value})}
          />
          : 
          this.props.case.title
          }
        </h1>
      </section>
    );
  }
}

export default editor(Case, '/api/cases')

