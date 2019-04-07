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

        console.log("debug:result: ", result)
        const {destination, source, draggableId} = result;

        const newState = {...this.state};

        const SourceColumn = newState.columns[source.droppableId];
        const destinationColumn = newState.columns[destination.droppableId];


        SourceColumn.taskIds.splice(source.index, 1);
        destinationColumn.taskIds.splice(destination.index, 0, draggableId);
        this.setState({
            ...newState
        })
        console.log("NEW STATE: ", newState)

    }

    render() {
        console.log("some tandom text");
        return (
            <Container>

                <DragDropContext onDragEnd={this.onDragEnd}>
                    {initialData.columnOrder.map(columnId => {

                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(id => this.state.tasks[id])
                        return <Column key={columnId} column={column} tasks={tasks}/>
                    })}
                </DragDropContext>

            </Container>

        );
    }
}

export default App;
