import React, { Component, createRef } from 'react';
import songFile from '../audio/Lost Sphear - Battle.mp3';

let ctx, x_end, y_end, bar_height;

const width = window.innerWidth;
const height = window.innerHeight;
const bars = 555;
const bar_width = 1;
const radius = 0;
const center_x = width /2;
const center_y = height/2;

class Canvas extends Component {
    constructor(props){
        super();
        this.audio = new Audio(songFile);
        this.canvas = createRef();
    }

    componentDidMount(){
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.source = this.context.createMediaElementSource(this.audio);

        this.analyser = this.context.createAnalyser();
        this.source.connect(this.analyser);
        this.analyser.connect(this.context.destination);
        this.frequency_array = new Uint8Array(this.analyser.frequencyBinCount);
    }

    togglePlay = () => {
        if(this.audio.paused){
            this.audio.play();
        } else{
            this.audio.paused();
        }
    }


        render(){
            return(
                <div>
                    <button onClick={this.togglePlay}>Play/Pause</button>
                    <canvas ref={this.canvas}/>
                </div>
            )
        }
}

export default Canvas;