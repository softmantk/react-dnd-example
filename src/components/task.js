import React, {Component} from 'react';
import {Draggable} from "react-beautiful-dnd";
import styled from 'styled-components';
//darkolivegreen
const Container = styled.div`
    border: 1px solid darkolivegreen;
    margin: 5px;
    padding: 5px;
    background-color: ${props => (props.isDragging ? '#90adb7' : '#e8d684')};
  
`

class Task extends Component {
    render() {
        console.log("dropID:", this.props.task.id)
        return (
            <Draggable
                draggableId={`id-${this.props.task.id}`}
                index={this.props.index}
                // isDragDisabled={true}
            >
                {
                    (provided, snapshot) => {
                        // console.log("SN:DRAGBLE:TASK: ", snapshot)
                        return <Container
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >

                            {`
                        ${this.props.task.id} :
                        ${this.props.task.content}
                        `}
                        </Container>
                    }
                }
            </Draggable>
        );
    }
}

export default Task;
