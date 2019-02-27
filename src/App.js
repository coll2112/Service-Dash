import React, { Component } from 'react';
// import Landing from './components/Landing/Landing'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import routes from './routes'
import Navbar from './components/Navbar/Navbar'
import { library } from '@fortawesome/fontawesome-svg-core'

//Font Awesome Brand Easy-Import Icons
import {fab, faFacebookSquare, faInstagram, faTwitterSquare} from '@fortawesome/free-brands-svg-icons'

//Font Awesome Imports
import {
  faComments, 
  faDollarSign, 
  faTachometerAlt, 
  faChevronCircleRight, 
  faChevronCircleLeft, 
  faSortDown, 
  faPeopleCarry,
  faQuoteLeft,
  faQuoteRight,
  faCompass
} from '@fortawesome/free-solid-svg-icons'

//Font Awesome Library
library.add(
  fab, 
  faComments, 
  faDollarSign, 
  faTachometerAlt, 
  faChevronCircleRight, 
  faChevronCircleLeft, 
  faSortDown, 
  faPeopleCarry,
  faQuoteLeft,
  faQuoteRight,
  faFacebookSquare,
  faInstagram,
  faTwitterSquare,
  faCompass
  )
  
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