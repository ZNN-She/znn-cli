/**
 * Created by zhangnanning on 2020/7/14.
 */
import React from "react";
import ReactDom from 'react-dom';
import {helloWord} from "./helloWord";
import "./index.less";

class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            num : 0
        }
    }

    onText = () => {
        const {num} = this.state;
        this.setState({
            num: num + 1
        })
    };

    render () {

        const {num} = this.state;
        const text = helloWord();

        return (
            <div>
                {text}

                <button onClick={this.onText}>点我：{num}</button>
            </div>
        )
    }
}

ReactDom.render(<App/>, document.getElementById("root"));
