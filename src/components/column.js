import React, {Component} from 'react';
import styled from 'styled-components'
import Task from '../components/task';

import {Droppable} from 'react-beautiful-dnd'


const Container = styled.div`
    margin : 2px;
    display: flex;
    flex-direction: column;
    border : 4px solid #ff000e;
    min-width: 300px;
    border-radius : 2px;
    background-color: #faeec8;
    
`;
const Title = styled.h3`

  text-align: center;
  padding: 3px;

`;
const TaskList = styled.div`
    padding : 8px;
    flex-grow: 1;
    min-height: 100px;
    //background-color: darkred;
    background-color: ${(props) => props.isDragging ? '#e4deeb' : "#eec1a0"};

`;


class Column extends Component {

    render() {

        return (
            <Container>
                <Title>{`${this.props.column.title}: ${this.props.column.id}`}</Title>
                <Droppable droppableId={this.props.column.id}>
                    {
                        (provided, snapshot) => {
                            // console.log("SN:DRPABLE:CLMN: ", snapshot)
                            return <TaskList
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                isDragging={snapshot.isDraggingOver}
                            >
                                {
                                    this.props.tasks.map((task, index) => <Task key={index} task={task} index={index}/>)
                                }
                                {provided.placeholder}
                            </TaskList>
                        }
                    }


                </Droppable>

            </Container>
        );
    }
}

export default Column;
