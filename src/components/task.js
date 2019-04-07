import React, {Component} from 'react';
import {Draggable} from "react-beautiful-dnd";
import styled from 'styled-components';
//darkolivegreen
const Container = styled.div`
    border: 1px solid darkolivegreen;
    margin: 5px;
    padding: 5px;
    background-color: ${props => {
    if (props.selected)
        return '#fff844';
    if (props.isDragging)
        return '#90adb7'
    else
        return '#e8d684'
}}
    `
const grid = 5;
const size = 25
const SelectionCount = styled.div`
  right: -${grid}px;
  top: -${grid}px;
  color: #ee3c43;
  background:#eed0cc;
  border-radius: 50%;
  height: ${size}px;
  width: ${size}px;
  line-height: ${size}px;
  position: absolute;
  text-align: center;
  font-size: 0.8rem;
`;

class Task extends Component {

    render() {
        const selectionCount = this.props.selectionCount;

        return (
            <Draggable
                draggableId={`id-${this.props.task.id}`}
                index={this.props.index}
                // isDragDisabled={true}
            >
                {
                    (provided, snapshot) => {
                        const shouldShowSelection = snapshot.isDragging && selectionCount > 1;
                        // const shouldShowSelection = true
                        return <Container
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            onClick={this.onClick}
                            selected={this.props.selected}
                            isDragging={snapshot.isDragging}
                            shouldShowSelection
                        >

                            {`
                        ${this.props.task.id} :
                        ${this.props.task.content}
                        `}
                            {shouldShowSelection ? (
                                <SelectionCount>{selectionCount}</SelectionCount>
                            ) : null}
                        </Container>
                    }
                }
            </Draggable>
        );
    }

    onClick = (event) => {

        if (event.defaultPrevented) {
            return;
        }

        if (event.button !== 0) {
            return;
        }

        // marking the event as used
        event.preventDefault();

        this.performAction(event)
    };

    performAction = (event) => {
        const {
            task,
            columnId,
            changeSelection,
        } = this.props;
        const isMultiple = event.ctrlKey

        changeSelection({taskId: task.id, columnId}, isMultiple);
    }
}

export default Task;
