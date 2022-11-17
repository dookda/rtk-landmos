import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import './App.css';
import Chart from "./components/Chart";
import Map from "./components/Map";
import Nav from "./components/Nav";

function App() {
  return (
    <div >
      <Nav />
      <div className="row gutter">
        <div className="col-sm-6"><Map /></div>
        <div className="col-sm-6"><Chart /></div>
      </div>
      <div className="row gutter">
        <div className="col-sm-6"><Chart /></div>
        <div className="col-sm-6"><Chart /></div>
      </div>
    </div>
  );
}

export default App;
