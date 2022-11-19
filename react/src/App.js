import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import './App.css';
import Chart from "./components/Chart";
import Map from "./components/Map";
import Nav from "./components/Nav";
import SelectCard from "./SelectCard";

function App() {
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
                <SelectCard />
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
                <Chart />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Chart />
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <Chart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
