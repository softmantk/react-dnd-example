const initialData = {
    tasks: {
        1: {
            id: 1,
            content: "Take out the garbage"
        },
        2: {
            id: 2,
            content: 'Watch Movie'
        },
        3: {
            id: 3,
            content: 'Go to grocery store'
        },
        4: {
            id: 4,
            content: 'read my favoutite book'
        },
        5: {
            id: 5,
            content: 'visit my favourite place'
        },
        6: {
            id: 6,
            content: 'visit my favourite place'
        },
        7: {
            id: 7,
            content: 'visit my favourite place'
        },
        8: {
            id: 8,
            content: 'visit my favourite place'
        },
        9: {
            id: 9,
            content: 'visit my favourite place'
        },
        10: {
            id: 10,
            content: 'visit my favourite place'
        },
    },
    columns: {
        1: {
            id: 1,
            title: "OPEN",
            taskIds: [1, 2, 3]
        },
        2: {
            id: 2,
            title: "ACCEPTED",
            taskIds: [4]
        },
        3: {
            id: 3,
            title: "IN PROGRESS",
            taskIds: [5]
        },
        4: {
            id: 4,
            title: "COMPLETED",
            taskIds: [6,7,8,9,10]
        },
    },
    columnOrder: [1, 2, 3, 4]
}
const x = {
    "draggableId": 2,
    "type": "DEFAULT",
    "source": {"index": 1, "droppableId": 1},
    "reason": "DROP",
    "mode": "FLUID",
    "destination": {"droppableId": 2, "index": 0},
    "combine": null
}

export default initialData
