import { connect } from 'react-redux';
import React from 'react';
import { fetchData } from './actions';
import PropTypes from 'prop-types'

export default function fetcher(WrappedComponent, APIEndpoint) {
  

    const mapStateToProps = (state, ownProps) => {
        const apidata = state.apiData[APIEndpoint]
        return {
            data:  apidata && apidata.data ? apidata.data : [],
            haveFetched: apidata && apidata.data ? true : false,
            fetching: apidata ? apidata.fetching : false 
        }
    }
    const mapDispatchToProps = (dispatch) => {  
        return { fetchData: () => dispatch(fetchData(APIEndpoint)) }
    }

    class Fetcher extends React.Component {
        
        static contextTypes={
            staticContext: PropTypes.object
         }

        componentWillMount () {
            if(!this.props.fetching){
                if (this.context.staticContext && !this.context.staticContext.resolved){
                    console.log("fetching")
                    const store = this.context.staticContext.store
                    this.context.staticContext.promises.push(store.dispatch(fetchData(APIEndpoint)))
                }else{
                    if (this.props.data.length === 0) this.props.fetchData()
                }
            }
        }

        render() {
        return <WrappedComponent 
                data={this.props.data} 
                {...this.props} />;
        }
    };

return connect(mapStateToProps, mapDispatchToProps)(Fetcher)



}