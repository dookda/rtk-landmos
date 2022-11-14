import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import './App.css';
import BarChart from './BarChart';
import { Card } from './Card';
import Map from './Map';
import Navbar from './Navbar';

function App() {
  return (
    <div >
      <Navbar></Navbar>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-sm-6'>
            <Map />
          </div>
          <div className='col-sm-6'>
            <Card></Card>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-sm-12'>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
