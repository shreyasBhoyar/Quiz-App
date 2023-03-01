import ProgressBar from 'react-bootstrap/ProgressBar';

const AnimationBar = ({now})=> {
  return <ProgressBar now={now} label={`${now}%`} />;
}

export default AnimationBar;