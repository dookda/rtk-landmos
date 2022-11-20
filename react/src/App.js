import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import { useState } from "react";
import './App.css';
import Chart from "./components/Chart";
import Map from "./components/Map";
import Nav from "./components/Nav";
import SelectCard from "./SelectCard";

let App = () => {
  const [dateStart, setDateStart] = useState('2022-11-18')
  const [dateEnd, setDateEnd] = useState('2022-11-19')

  const handleChange = (dStart, dEnd) => {
    setDateStart(dStart.dateStart);
    setDateEnd(dEnd.dateEnd)
    // console.log(dStart, dEnd);
  }

  return (
    <div >
      <Nav />
      <div className="container-fluid mt-3">
        <div className="row mb-3">
          <div className="col-sm-6">
            <div className="card">
              <Map />
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <SelectCard
                  handleChange={handleChange}
                  dStart={dateStart}
                  dEnd={dateEnd}
                />
                <div className="row">
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Chart
                  dStart={dateStart}
                  dEnd={dateEnd}
                  type={'de'}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Chart
                  dStart={dateStart}
                  dEnd={dateEnd}
                  type={'dn'}
                />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Chart
                  dStart={dateStart}
                  dEnd={dateEnd}
                  type={'dh'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
