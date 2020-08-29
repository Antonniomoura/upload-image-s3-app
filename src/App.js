import React, {useEffect, useState} from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import api from "./services/api";

function App() {
    const [images, setImages] = useState([]);

    function sendFile() {
        let formData = new FormData();
        const imagem = document.getElementById("image");
        const description = document.getElementById("description");

        if (!imagem || !imagem.files.length > 0 || description || description.value) {
            return null;
        }

        formData.set('file', imagem.files[0]);
        formData.set('description', description.value);

        api.post('images', formData).then(success => {
            console.log(success)
        }).catch(error => {
            console.log(error)
        })
    }

    function getAllImages() {
        api.get('images').then(success => {
            setImages(success.data)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllImages()
    }, [])

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
                            <Form.Group>
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control type="text" placeholder="Descrição" id="description"/>
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
