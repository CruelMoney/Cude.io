import { connect } from 'react-redux';
import React from 'react';
import { fetchData } from './actions';

export default function fetcher(WrappedComponent, APIEndpoint) {


    const mapStateToProps = (state, ownProps) => {
        const apidata = state.apiData[APIEndpoint]
        return {
            data:  apidata ? apidata.data : [],
            shouldFetch: apidata ? apidata.shouldFetch : false 
        }
    }
    const mapDispatchToProps = (dispatch) => {  
        return { fetchData: () => dispatch(fetchData(APIEndpoint)) }
    }

    class Fetcher extends React.Component {
         componentWillMount () {
            if (this.props.staticContext){
                const store = this.props.staticContext.store
                this.props.staticContext.promises.push(store.dispatch(fetchData(APIEndpoint)))
            }else{
                if (this.props.data.length === 0) this.props.fetchData()
            }
        }
        
        componentWillReceiveProps = (nextProps) => {
            if (nextProps.shouldFetch){
            this.props.fetchData()
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