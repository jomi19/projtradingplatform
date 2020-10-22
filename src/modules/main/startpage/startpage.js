import React, { useEffect, useState } from 'react';
import BigButton from "./../../buttons/bigbutton/bigbutton.js"
import "./start.scss";
import socket from "./../../../service/socket.js";
import { LineChart, Line, CartesianGrid, Area,  XAxis, YAxis, ResponsiveContainer, AreaChart } from 'recharts';



const StartPage = function () {
    const [stockData, setData] = useState([]);
    const [update, setUpdate] = useState(false)
    const [stockName, setName] = useState([]);


    useEffect(() => {
        socket.on("stocks", (data) => {
            let dataArray = stockData;
            let date = new Date()
            let time = null;
            let newData = []

            console.log(stockData)
       
            time = `${date.getHours()}:${date.getMinutes()}`
            

            data.map((stock, index) => {
                let name = stock.name
                if(!dataArray[index]) {
                    dataArray[index] = []
                }
                dataArray[index].push({
                    name: name,
                    y: stock.price,
                    x: time
                }) 
    
            })

            if (update) {
                setUpdate(false)
            } else {
                setData(true)
            }
            setData(dataArray)
            
        })
    },[])
    // const test = function() {
    //     stockData.map((stock, index) => {
    //         stock.map((hej) => {
    //             console.log(hej)
    //         })
    //     })
    // }

    const Graph = function(props) {
        let name = props.stock[0].name
        let currentPrice = Math.round((props.stock[props.stock.length - 1].y) * 100 / 100)
        let data = props.stock
        let trend = "";
        let classes = `stock-graph ${props.size}`
        let height = 400;

        if(props.size === "small") {
            height = 200;
        }


        if(data.length > 2) {
            let lastPrice = Math.round((props.stock[props.stock.length - 2].y) * 100 / 100)

            console.log("Mer än 2")
            if(currentPrice > lastPrice) {
                trend = "stockUp";
            } else if (currentPrice < lastPrice) {
                trend = "stockDown"
            }
        }
        console.log(currentPrice)
        return (
            <div className={classes}>            
                <h2>{name}</h2>
                <ResponsiveContainer height={height}>
                    <AreaChart data={props.stock} >
                        <YAxis dataKey="y"/>
                        <XAxis dataKey="x" interval={100}/>
                        <Area dataKey="y"  fill="#8884d8"  isAnimationActive={false}/>
                    </AreaChart>
        
                </ResponsiveContainer>
                <p className={trend} >Nuvarande pris: {currentPrice}</p>
            </div>

        )
    }

    const statistic = function() {
        return
    }


    const AllGraphs = function() {
        console.log(typeof(stockData))
        if(typeof(stockData) === "object") {
            return stockData.map((stock) => {
                return <Graph stock={stock} size="small"></Graph>
            })
        }

        return <div></div>
    }

    

    // const AllGraphs = () =>
    //     Object.keys(stockData).map((stock, index) => (
    //         <div className="testar" key={index}>
    //             <ResponsiveContainer>
    //                 <h1>{index}</h1>
    //                 <AreaChart data={stock}>
    //                     <YAxis dataKey="y"/>
    //                     <XAxis dataKey="x"/>
    //                     <Area dataKey="y"  fill="#8884d8"/>
    //                 </AreaChart>
    //             </ResponsiveContainer>
    //         </div>
    //         ))
    
        


    return (
        <main className="main startPage" >
            <BigButton href="register" classes="accent" name="Bli medlem"/>
            <div className="stock-graph">
            {/* <Graph stock={stockData["Second stock"]} name="Second Stock"/>
            <Graph stock={stockData["Markus rör och leckage"]} name="Markus rör och leckage"/> */}

           <AllGraphs></AllGraphs>

            </div>
        </main>
    )
}

export default StartPage;







// import React, { useEffect, useState } from 'react';
// import BigButton from "./../../buttons/bigbutton/bigbutton.js"
// import "./start.scss";
// import socket from "./../../../service/socket.js";
// import { LineChart, Line, CartesianGrid, Area,  XAxis, YAxis, ResponsiveContainer, AreaChart } from 'recharts';



// const StartPage = function () {
//     const [stockData, setData] = useState({
//         test:
//         [
//             { x: "2015", y: 6},
//             { x: "2016", y: 7},
//             { x: "2017", y: 8},
//             { x: "2018", y: 20}
//         ]
//     });
//     const [stockName, setName] = useState("hej");


//     // useEffect(() => {
//     //     socket.on("stocks", (data) => {
//     //         let dataArray = stockData;
//     //         let date = new Date()
//     //         let time = null;

//     //         if(date.getMinutes % 5 === 0) {
//     //             let time = `${date.getHours()}:${date.getMinutes()}`
//     //         }
//     //         setName(data.name)
//     //         console.log(time)
//     //         setData([])
//     //         let newData = {
//     //             name: data.name,
//     //             x: time,
//     //             y: data.startingPoint
//     //         }
//     //         dataArray.push(newData);

//     //         setData(dataArray)
            
//     //     })
//     // },[])


//     return (
//         <main className="main startPage">
//             <BigButton href="register" classes="accent" name="Bli medlem" />
//             <div className="stock-graph">

//             <h1>{stockName}</h1>
//             <ResponsiveContainer>
//                 <AreaChart data={stockData.test}>
//                     <YAxis dataKey="y"/>
//                     <XAxis dataKey="x"/>
//                     <Area dataKey="y"  fill="#8884d8"/>
//                 </AreaChart>
//             </ResponsiveContainer>
//             </div>
//         </main>
//     )
// }

// export default StartPage;








