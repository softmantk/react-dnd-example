import React, {Component} from 'react';
import initialData from './initialData'
import Column from "./components/column";
import '@atlaskit/css-reset'
import styled from "styled-components";
import {DragDropContext} from 'react-beautiful-dnd'


const Container = styled.div`
    margin : 2px;
    display : flex;
    //flex-direction: column;
    border : 3px solid #00e000;
    border-radius : 2px
`;


class App extends Component {
    state = initialData;

    onDragEnd = (result) => {
        if (!result.destination) {
            console.log("destination empty");
            return
        }

        // console.log("debug:result: ", result)
        let {destination, source, draggableId} = result;

        draggableId = draggableId.split('-')[1];
        // console.log("draggableId : ", draggableId )

        const newState = {...this.state};

        const SourceColumn = newState.columns[source.droppableId.split('-')[1]];
        const destinationColumn = newState.columns[destination.droppableId.split('-')[1]];
        console.log("newState.selectedTasks: ", newState.selectedTasks.map(t => t.taskId))

        const selectedTaskIds = newState.selectedTasks.map(t => t.taskId);


        (() => {
            // remove selected ids
            newState.selectedTasks.forEach(task => {
                const column = newState.columns[task.columnId];
                const index = column.taskIds.indexOf(task.taskId);
                console.log('')
                if (index > -1)
                    column.taskIds.splice(index, 1);
            })
        })()
        console.log("SourceColumn: ", SourceColumn, destination.index)
        destinationColumn.taskIds.splice(destination.index, 0, ...selectedTaskIds);
        console.log("newState:start: ", this.state)
        newState.selectedTasks = [];
        this.setState({
            ...newState
        }, () => console.log("newState:end: ", this.state))

    }
    handleDragUpdate = () => {
        console.log("call: handleDragUpdate ")
    }

    onDragStart = (start) => {
        console.log("onDragStart : ", start)
        const id = start.draggableId;
        const selected = this.state.selectedTasks.find(
            (taskId) => taskId === id,
        );

        // if dragging an item that is not selected - unselect all items
        if (!selected) {
            // this.unselectAll();
            console.log("NO SELECTED: ")
        }

        this.setState({
            draggingTaskId: start.draggableId,
        });

    };
    changeSelection = ({taskId, columnId}, isMultiple) => {
        console.log("taskID, isMultiple: ", taskId, columnId)
        const {selectedTasks} = {...this.state};

        const wasSelected = selectedTasks.some(task => task.taskId === taskId)
        console.log("wasSelected : ", wasSelected)
        const newTaskIds = (() => {
            if (wasSelected) {
                selectedTasks
                    .map(task => task.id)
                    .splice(selectedTasks.indexOf(taskId), 1);
                return selectedTasks

            } else {
                if (isMultiple) {
                    return [...selectedTasks, {taskId, columnId}]
                }
                return [{taskId, columnId}];
            }
        })();

        this.setState({
            selectedTasks: newTaskIds
        })
    }

    render() {
        return (
            <Container>

                <DragDropContext
                    onDragEnd={this.onDragEnd}
                    onDragUpdate={this.handleDragUpdate}
                    onDragStart={this.onDragStart}
                >
                    {initialData.columnOrder
                    // .slice(0,1)
                        .map(columnId => {

                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(id => this.state.tasks[id])
                            return <Column
                                selectionCount={this.state.selectedTasks.length}
                                selectedTasks={this.state.selectedTasks}
                                selectedTaskIds={this.state.selectedTasks.map(t => t.taskId)}
                                key={columnId}
                                column={column}
                                tasks={tasks}
                                changeSelection={this.changeSelection}
                            />
                        })}
                </DragDropContext>

            </Container>

        );
    }
}

export default App;
