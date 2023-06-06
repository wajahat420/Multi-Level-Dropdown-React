import './dropdown.css';
import { useState } from "react";

const options = [
    {
        label: "group 1",
        id: 'a',
        options: [
            {
                label: "nested group 1",
                id: 'b',

                options: [
                    {
                        label: "nested 1",
                        id: 1,
                        value: 1
                    },
                    {
                        label: "nested 2",
                        value: 2,
                        id: 2,
                    }
                ]
            },
            {
                label: "nested group 2",
                options: [
                    {
                        label: "nested 1",
                        value: 3,
                        id: 3,
                    }
                ]
            },
            {
                label: "nested group 3",
                id: 'c',

                options: [
                    {
                        label: "nested group 3b",
                        id: 'd',
                        options: [
                            {
                                label: "nested 1",
                                value: 4,
                                id: 4,
                            },
                            {
                                label: "nested 2",
                                options: [
                                    {
                                        label: "nested group 4b",
                                        options: [
                                            {
                                                label: "nested 1",
                                                value: 5,
                                                id: 5,
                                            },
                                            {
                                                label: "nested 2",
                                                value: 6,
                                                id: 6,
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: "group 2",
        options: [
            {
                label: "nested group 1",
                options: [
                    {
                        label: "nested 1",
                        value: 7,
                        id: 7,
                    },
                    {
                        label: "nested 2",
                        value: 8,
                        id: 8,
                    },
                    {
                        label: "nested 3",
                        value: 9,
                        id: 9,
                    },
                    {
                        label: "nested 4",
                        value: 10,
                        id: 10,
                    },
                    {
                        label: "nested 5",
                        value: 11,
                        id: 11,
                    }
                ]
            }
        ]
    }
];

const arr = []

function loopNestedArrays(array, index = '') {

    for (let i = 0; i < array.length; i++) {

        let myIndex = index.toString() + i

        arr.push({
            label: array[i].label,
            id: array[i].id,
            show: true,
            // isEnd: !array[i]?.options,
            level: myIndex.length,
            value: array[i].value
        })

        if (array[i]?.options) {
            loopNestedArrays(array[i]?.options, myIndex);
        }

    }
    return
}

loopNestedArrays(options);




function MultiLevelDropdown() {

    const [className, setClassName] = useState('')
    const [data, setData] = useState(arr)
    const [collapse, setCollapse] = useState([])



    const handleClick = () => {
        setClassName(className ? '' : 'open')
    }


    const getMargin = (elem) => {
        const val = (elem.level - 1) * 20

        return val + 'px'
    }

    const handleCollapse = (show, index) => {
        let _data = [...data]
        let check = false
        let level = 0
        let _collapse = [...collapse]


        for (let ind = 0; ind < _data.length; ind++) {
            const element = _data[ind];

            if (check) {
                if (element.level > level) {
                    Object.assign(element, {
                        ...element,
                        show
                    })

                    // let obj = handleShow(_collapse, ind)
                    // _collapse = obj.arr

                    let _index = collapse.indexOf(ind)

                    if (_index !== -1) {
                        _collapse.splice(_index, 1)
                    }


                } else {
                    check = false
                }
            }

            if (ind === index) {
                let obj = handleShow(_collapse, ind)
                _collapse = obj.arr

                check = true
                level = element.level
            }
        }

        setCollapse(_collapse)
        setData(_data)
    }

    const handleShow = (collapse, index) => {
        let _index = collapse.indexOf(index)
        let arr = [...collapse]
        let show = false

        if (_index === -1) {
            arr.push(index)
        } else {
            show = true
            arr.splice(_index, 1)
        }


        return {
            arr, show, index: _index
        }
    }

    const itemClicked = (event, index) => {
        event.stopPropagation()

        const { arr, show } = handleShow(collapse, index)

        handleCollapse(show, index)
    }

    console.log({ collapse })


    return (
        <div className="select-wrapper" onClick={handleClick}>
            <div className={`select ${className}`}>
                <div className="select__trigger"><span>{arr[0].label}</span>
                    <div className="arrow"></div>
                </div>
                <div className="custom-options">
                    {
                        data.map((elem, index) => (
                            elem.show &&
                            <span
                                onClick={(event) => itemClicked(event, index)}
                                key={index}
                                style={{ marginLeft: getMargin(elem), opacity: elem.value ? 1 : .5 }}
                                className={`custom-option ${elem.value ? 'enable' : 'disable'}`}
                                data-value={elem.value}
                            >
                                {elem.label}
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}



export default MultiLevelDropdown