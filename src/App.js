import React, { Component } from 'react';
// import Landing from './components/Landing/Landing'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import routes from './routes'
import Navbar from './components/Navbar/Navbar'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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
  faCompass,
  faAngleRight,
  faBars
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
  faCompass,
  faAngleRight,
  faBars
  )
  
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar/>
        <div className='main'>
          {routes}
        </div>
        <ToastContainer autoClose={3000}/>
      </div> 
    );
  }
}

export default App;