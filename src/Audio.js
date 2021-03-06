/**
 * @file 音频组件
 * @author cxtom <cxtom2008@gmail.com>
 */

import React, {Component, PropTypes} from 'react';

import {
    registerComponent,
    px2rem
} from 'mola';

import cx from 'classnames';

import {
    type,
    level
} from './constants';

let audioPool = [];

export class Audio extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            playing: false
        };
        this.onClick = this.onClick.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPause = this.onPause.bind(this);
    }

    componentDidMount() {
        audioPool.push(this.refs.audio);
        if (this.props.playImage) {
            const preLoadImage = new Image();
            preLoadImage.src = this.props.playImage;
        }
    }

    componentWillUnmount() {
        const index = audioPool.indexOf(this.refs.audio);
        if (index > -1) {
            audioPool = audioPool.splice(index, 1);
        }
    }

    onPlay() {
        this.setState({playing: true});
        audioPool.forEach(audio => {
            if (audio !== this.refs.audio) {
                audio.pause();
            }
        });
    }

    onPause() {
        this.setState({playing: false});
    }

    onClick() {
        const audio = this.refs.audio;
        audio[this.state.playing ? 'pause' : 'play']();
    }

    render() {

        let {
            className = null,
            style = null,
            top,
            left,
            width,
            height,
            image,
            playImage,
            src,
            autoPlay,
            title
        } = this.props;

        const playing = this.state.playing;

        return (
            <div
                onClick={this.onClick}
                className={cx('mola-audio', className, {'state-playing': playing})}
                data-type="btn"
                data-click={`{"mod": "audio", "act": "b_${playing ? 'pause' : 'play'}"}`}
                style={{
                    ...style,
                    top: px2rem(top),
                    left: px2rem(left),
                    width: px2rem(width),
                    height: px2rem(height),
                    backgroundImage: `url(${playing && playImage ? playImage : image})`
                }}>
                <audio
                    src={src}
                    preload="auto"
                    autoPlay={autoPlay}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onEnded={this.onPause}
                    title={title}
                    ref="audio" />
            </div>
        );
    }

}

Audio.displayName = type;

Audio.propTypes = {
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    src: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    playImage: PropTypes.string,
    autoPlay: PropTypes.bool.isRequired,
    title: PropTypes.string
};

Audio.defaultProps = {
    top: 0,
    left: 0,
    width: 50,
    height: 50,
    autoPlay: false
};

export default registerComponent(type, level)(Audio);
