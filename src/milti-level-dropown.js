import './dropdown.css'
import { useState } from "react";

const options = [
    {
        label: "group 1",
        options: [
            {
                label: "nested group 1",
                options: [
                    {
                        label: "nested 1",
                        value: 1
                    },
                    {
                        label: "nested 2",
                        value: 2
                    }
                ]
            },
            {
                label: "nested group 2",
                options: [
                    {
                        label: "nested 1",
                        value: 3
                    }
                ]
            },
            {
                label: "nested group 3",
                options: [
                    {
                        label: "nested group 3b",
                        value: 4,
                        options: [
                            {
                                label: "nested 1",
                                value: 5
                            },
                            {
                                label: "nested 2",
                                value: 6
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
                        value: 7
                    },
                    {
                        label: "nested 2",
                        value: 8
                    },
                    {
                        label: "nested 3",
                        value: 9
                    },
                    {
                        label: "nested 4",
                        value: 10
                    },
                    {
                        label: "nested 5",
                        value: 11
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
            isEnd: !array[i]?.options,
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

console.log({ arr })

// copied
// function loopNestedArrays(arrays, callback) {
//     function loop(index, args) {
//         if (index >= arrays.length) {
//             // Base case: We've reached the innermost array, call the callback
//             callback.apply(null, args);
//             return;
//         }
//         const array = arrays[index];
//         for (let i = 0; i < array.length; i++) {
//             console.log("LOOP", args.concat(array[i]))
//             // Recursively call loop with the next array and updated args
//             loop(index + 1, args.concat(array[i]));
//         }
//     }
//     loop(0, []);
// }

// const colors = [
//     'green',
//     'blue',
//     'gray',
//     'black',
//     'brown',
//     'pink',
//     'red'
// ]

// function loopNestedArrays(arrays, callback) {
//     function loop(array, index = '') {
//         for (let i = 0; i < array.length; i++) {
//             let myIndex = index.toString() + i
//             if (typeof array[i] === 'object') {
//                 loop(array[i], myIndex);
//             } else {
//                 console.log({ val: array[i], i, myIndex })
//             }
//         }
//         return
//     }
//     loop(arrays);
// }

// const arrays = [
//     [1, 2, [8, 9, [10, 11]]],
//     [3, 4, [12, 13]],
//     [5, 6],
// ];

// loopNestedArrays(arrays, (...values) => {
//     console.log(values);
// });


function MultiLevelDropdown() {

    const [className, setClassName] = useState('')


    const handleClick = () => {
        setClassName(className ? '' : 'open')
    }


    const getMargin = (elem) => {
        const val = (elem.level - 1) * 50

        return val + 'px'
    }


    return (
        <div className="select-wrapper" onClick={handleClick}>
            <div className={`select ${className}`}>
                <div className="select__trigger"><span>{arr[0].label}</span>
                    <div className="arrow"></div>
                </div>
                <div className="custom-options">
                    {/* <span className="custom-option selected" data-value="tesla">Tesla</span> */}
                    {
                        arr.map((elem, index) => (
                            <span key={index} style={{marginLeft: getMargin(elem), opacity: elem.isEnd ? 1 : .5 }} className={`custom-option ${elem.isEnd ? 'enable' : 'disable'}`} data-value="volvo">{elem.label}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}



export default MultiLevelDropdown