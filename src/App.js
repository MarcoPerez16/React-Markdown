import React from 'react';
import './App.scss';
import {FaFire} from 'react-icons/fa'
import {ImEnlarge2} from 'react-icons/im'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
        <Toolbar/>
        <br></br>
        <br></br>
        <br></br>
        <Editor/>
        <Preview/>
      </div>
    );
  }
}

const Toolbar = () => {
  return (
    <div className='Toolbar'>
      <FaFire/>
      <span>Toolbar</span>
      <ImEnlarge2/>
    </div>
  )
}

const Editor = () => {
  return (
    <div className='Editor'>
      Editor
    </div>
  )
}

const Preview = () => {
  return (
    <div className='Preview'>Preview</div>
  )
}

export default App;
