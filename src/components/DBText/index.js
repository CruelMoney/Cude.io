import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import fetcher from '../../higher-order-components/Fetcher/index';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types'


class Text extends React.Component {

    static contextTypes={
        staticContext: PropTypes.object
    }


    componentWillMount(){        
        // only serverside 
        if (this.context.staticContext && this.props.haveFetched){ 
            const found = this.props.data.some(t=>t.key===this.props.dbKey)
            // Create text if does not exist
            if (!found){
                this.context.staticContext.promises.push(
                    fetch(process.env.REACT_APP_BASEURL+'/api/texts', {
                        method: 'POST',
                        headers: new Headers({
                        'Content-Type': 'application/json'
                        }),
                        body: JSON.stringify({key: this.props.dbKey, content: ""})
                    })
                )
            }
         }            
        }


    render() {
        const dbText = this.props.data.find(t=>t.key === this.props.dbKey)

        return (
                this.props.editMode && dbText ?
                <div
                key={dbText._id}
                className={this.props.className + " editable"}
                ref={(textArea) => 
                        { 
                            if(textArea){
                                // paste everything as plain text inside editable area
                                textArea.addEventListener("paste", function(e) {
                                    e.preventDefault();
                                    var text = e.clipboardData.getData("text/plain");
                                    document.execCommand("insertHTML", false, text);
                                }) 
                            }
                        }
                    }
                contentEditable
                style={{ whiteSpace: "pre-line"}}
                onInput={(event)=>{
                    this.props.registerEdits(dbText._id,{content:event.target.innerHTML})}}
                dangerouslySetInnerHTML={dbText ? {__html: dbText.content} : null}
                />
                : //if not editmode
                <div 
                    className={this.props.className}
                    style={{ whiteSpace: "pre-line"}}
                    dangerouslySetInnerHTML={dbText ? {__html: dbText.content} : null}
                />

        
        );
    }
}

export default fetcher(
    editor(Text, "/api/texts"), 
    "/api/texts")


