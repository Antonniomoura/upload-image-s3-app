import React, {useState} from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import api from "./services/api";


function App() {
    const [images, setImages] = useState([1, 2]);

    function sendFile() {

        let formData = new FormData();
        const imagem = document.getElementById("image");

        if (!imagem || !imagem.files.length > 0) {
            return null;
        }

        formData.set('file', imagem.files[0]);

        api.post('upload', formData).then(success => {
            console.log(success)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-center">
                        <Form className="mt-5">
                            <Form.Group>
                                <Form.File
                                    id="image"
                                    label="File image"
                                    accept="image/x-png,image/gif,image/jpeg"
                                />
                            </Form.Group>
                            <button type="button" onClick={sendFile}>Enviar</button>
                        </Form>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    {
                        images.map((image, index) => {
                            return <p key={index}>imagem {index + 1}</p>
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
