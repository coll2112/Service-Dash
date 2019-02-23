import React, { Component } from 'react';
// import Landing from './components/Landing/Landing'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import routes from './routes'
import Navbar from './components/Navbar/Navbar'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faComments, faSpinner, faDollarSign, faTachometerAlt, faChevronCircleRight, faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons'
import {fab} from '@fortawesome/free-brands-svg-icons'
library.add(fab, faComments, faSpinner, faDollarSign, faTachometerAlt, faChevronCircleRight, faChevronCircleLeft)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className='main'>
          {routes}
        </div>
        
      </div> 
    );
  }
}

export default App;