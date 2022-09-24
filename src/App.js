// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import {useState} from "react";
//Tis would be used to ensure that the file is converted to a buffer
import { Buffer } from 'buffer';
//importing what we need from ipfs-http-client
const ipfsClient = require('ipfs-http-client');
const projectId = '2DmS9CrnVeU2Caun612yGaPQ2aq';
const projectSecret = '5c06e22765f9f65e1e9ea4af53131e83';
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = ipfsClient.create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});


function App() {

	const[fileBuffer, setFileBuffer] = useState(null);
	const[ipfsHash, setIpfsHash] = useState('');
	const handleFile = async(e) => {
		//first we select the file that was uploaded 
		const file = e.target.files[0];
		console.log(file)
		//then we make use of the filereader method so we can read the file into array buffers
		const reader = new FileReader();
		// console.log(reader)
		// The file is converted to array buffer
		reader.readAsArrayBuffer(file);
		//you have to ensure the file reader has read the file completely
		reader.onloadend = () => {
			//convert array buffer tto buffer
			let blobBuffer = Buffer.from(reader.result);
			//set the buffer to state so it can be used
			setFileBuffer(blobBuffer);
		}
		
	}

	const handleFileUpload = async(e) =>{
		e.preventDefault();
		console.log("buffer is ", fileBuffer)

		const result  = await client.add(fileBuffer);
		console.log(result)
		setIpfsHash(result.path)
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
				<input type="file" className="form-control" onChange={handleFile}/>
			</div>
			<div className="col-md mb-3">
				<button className="btn btn-primary w-100" onClick={(e) => handleFileUpload(e)}>
					Upload File
				</button>
			</div>
        </div>
        <div className="row">
			<p className="lead">
				{ipfsHash ? 
				`Your file has been stored on IPFS and the hash is ${ipfsHash}`
			:
			''}
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
