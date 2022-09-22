// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {useState} from "react";

function App() {

	const handleFileUpload = (e) =>{
		e.preventDefault();
	}
  return (
    <div className="App">
      <h1 className="bg-dark text-white text-center py-3">
        Image  file upload system with ipfs
      </h1>
      <form className="container-md">
        <div className="row">
			<label className="lead form-label">Select your file</label>
			<div className="col-md mb-3">
				<input type="file" className="form-control"/>
			</div>
			<div className="col-md mb-3">
				<button className="btn btn-primary w-100" onClick={(e) => handleFileUpload(e)}>
					Upload File
				</button>
			</div>
        </div>
        <div className="row">
			<p className="lead">
			</p>
		</div>
		<div className="row">
			<label className="lead form-label">Fetch your file</label>
			<div className="col-md mb-3">
				<input type="text" className="form-control" placeholder="Input file hash"/>
			</div>
			<div className="col-md mb-3">
				<button className="btn btn-primary w-100" onClick={(e) => handleFileUpload(e)}>
					Fetch File 
				</button>
			</div>
		</div>
      </form>
    </div>
  );
}

export default App;
