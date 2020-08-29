import React, {useEffect, useState} from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import api from "./services/api";

function App() {
    const [images, setImages] = useState([]);
    const [description, setDescription] = useState('');

    function sendFile() {
        let formData = new FormData();
        const imagem = document.getElementById("image");

        if (!imagem || !imagem.files.length > 0) {
            return null;
        }

        formData.set('file', imagem.files[0]);

        api.post('upload', formData).then(success => {
            const {urlKey} = success.data
            if (urlKey) {
                sendConfig(urlKey);
            }
        }).catch(error => {
            console.log(error)
        })
    }

    function sendConfig(urlKey) {
        if (!description || !description) {
            return null;
        }

        api.post('images', {
            url: urlKey,
            description: description
        }).then(success => {
            getAllImages()
            resetForm();
        }).catch(error => {
            console.log(error)
        })

    }

    function resetForm() {
        setDescription('');
        document.getElementById("image").value = null;
    }

    function getAllImages() {
        api.get('images').then(success => {
            setImages(success.data)
        }).catch(error => {
            console.log(error)
        })
    }

    function removerImage(id) {
        api.delete(`images/${id}`).then(success => {
            getAllImages()
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllImages()
    }, [])

    function renderImages() {
        return <div className="row mt-5">
            {
                images.map((image, index) => {
                    return <div className="col-4" key={index}>
                        <div className="card p-1">
                            <img className="card-img-top" src={image.url} alt="Card image cap"/>
                            <div className="card-body px-0">
                                <div className="d-flex justify-content-center">
                                    <h5 className="card-title">{image.description}</h5>
                                </div>
                                <p className="card-text">{image.createAt}</p>
                                <div className="d-flex w-100 justify-content-center">
                                    <button
                                        type="button"
                                        className="btn btn-danger w-75"
                                        onClick={() => removerImage(image._id)}>
                                        Remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    }

    function renderUploadImage() {
        return <div className="row renderUploadImage">
            <div className="col-12">
                <div className="d-flex justify-content-center">
                    <Form className="mt-2 ">
                        <Form.Group>
                            <Form.Control className="description" type="text" value={description} onChange={event => {
                                setDescription(event.target.value)
                            }} placeholder="Descrição" id="description"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.File
                                id="image"
                                className="upload"
                                accept="image/x-png,image/gif,image/jpeg"
                            />
                        </Form.Group>
                        <div className="w-100">
                            <button type="button" className="w-100 btn btn-primary" onClick={sendFile}>Publicar</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    }

    return (
        <div className="container App">
            {renderUploadImage()}
            {renderImages()}
        </div>
    );
}

export default App;