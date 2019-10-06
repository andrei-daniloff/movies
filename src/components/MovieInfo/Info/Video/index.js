import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Iframe from 'react-iframe';
import axios from 'axios';
import Tooltips from '../../../UI/Tooltips';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 150;
`;

const VideoStyles = styled(Iframe)`
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 1280px;
  height: 720px;
  position: absolute;
  z-index: 1000;
  @media (max-width: 1280px) {
    width: 640px;
    height: 480px;
  }
  @media (max-width: 767px) {
    width: 320px;
    height: 240px;
  }
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.6;
`;

function IframeVideo({ onCloseModal, keyVideo }) {
  return (
    <Wrapper>
      <Backdrop onClick={onCloseModal}></Backdrop>
      <VideoStyles
        url={`https://www.youtube.com/embed/${keyVideo}`}
        id="myId"
        className="modal"
        display="initial"
      />
    </Wrapper>
  );
}

class Video extends Component {
  state = {
    key: null,
    loading: true,
    error: null,
    hasVideo: true
  };
  componentDidMount() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.props.id}/videos?api_key=8c7720742602f6274d23061fa907cb34&language=en-US`
      )
      .then(({ data }) => {
        if (data.results.length !== 0) {
          this.setState({ keyVideo: data.results[0].key, loading: false });
        } else {
          this.setState({ error: "Sorry, this movie hasn't got a trailer!", loading: false }, () =>
            this.setupTimeout()
          );
        }
      })
      .catch(err =>
        this.setState({
          error: err.response.data.status_message || 'Something went wrong!',
          loading: false,
          hasVideo: false
        })
      );
  }

  setupTimeout = () => {
    setTimeout(() => {
      this.setState({ error: null, hasVideo: false });
    }, 3000);
  };

  render() {
    const { onCloseModal } = this.props;
    const { keyVideo, loading, error, hasVideo } = this.state;
    let video;
    if (loading) {
      video = <Tooltips show={loading ? true : false}>Loading ...</Tooltips>;
    } else if (error) {
      video = <Tooltips show={error ? true : false}>{error}</Tooltips>;
    } else if (hasVideo) {
      video = ReactDOM.createPortal(
        <IframeVideo keyVideo={keyVideo} onCloseModal={onCloseModal} />,
        document.getElementById('modal-root')
      );
    } else {
      video = null;
    }

    return video;
  }
}

Video.propTypes = {};

export default Video;
