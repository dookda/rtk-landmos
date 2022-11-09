import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import { Card } from './Card';
import Navbar from './Navbar';

function App() {
  return (
    <div >
      <Navbar></Navbar>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-sm-6'>
            <Card></Card>
          </div>
          <div className='col-sm-6'>
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
