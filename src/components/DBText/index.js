import React from 'react';
import editor from '../../higher-order-components/Editor/index';
import fetcher from '../../higher-order-components/Fetcher/index';
import { connect } from 'react-redux';
import {PropTypes} from 'prop-types'


class EditableText extends React.Component {

    static propTypes={
        registerEdits: PropTypes.func.isRequired
    }


    render() {
        const content = this.props.content 

        return (
                this.props.editMode ?
                <div
                {...this.props}
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
                    this.props.registerEdits(this.props.entityID,{[this.props.entityField]:event.target.innerHTML})}}
                dangerouslySetInnerHTML={{__html: content} }
                />
                : //if not editmode
                <div 
                    {...this.props}
                    className={this.props.className}
                    style={{ whiteSpace: "pre-line"}}
                    dangerouslySetInnerHTML={ {__html: content} }
                />

        
        );
    }
}

class ConnectedText extends React.Component {

    static contextTypes={
        staticContext: PropTypes.object
    }


    componentWillMount(){        
        // only serverside 
         console.log(this.props.dbKey)
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
        const dbText = this.props.data.find(t=>t.key === this.props.dbKey) || {}
        const content = dbText ? dbText.content : null
        return (
                <EditableText 
                {...this.props}
                key={dbText._id}
                registerEdits={this.props.registerEdits}
                entityID={dbText._id}
                content={content}
                entityField="content"
                />
        );
    }
}

export default fetcher(
    editor(ConnectedText, "/api/texts"), 
    "/api/texts")

export { EditableText }


