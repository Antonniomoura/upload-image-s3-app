import React, {useState} from 'react';
import './App.scss';
import Form from 'react-bootstrap/Form';
import api from "./services/api";


function App() {
    const [image, setImage] = useState(null);
    const [FR, setFR] = useState(new FileReader());

    function readFile() {
        const imagem = document.getElementById("image");

        if (!imagem || !imagem.files.length > 0) {
            return null;
        }
        FR.readAsDataURL(imagem.files[0]);

        FR.addEventListener("load", function (e) {
            if (e.target && e.target.result) {
                setImage(e.target.result)
            }
        });
    }

    function sendFile(file) {
        api.post('upload', file).then(success => {
            console.log(success)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="d-flex justify-content-center">
            <Form className="mt-5">
                <Form.Group>
                    <Form.File
                        id="image"
                        label="File image"
                        onChange={readFile}
                        accept="image/x-png,image/gif,image/jpeg"
                    />
                </Form.Group>
                <button type="button" onClick={sendFile}>Enviar</button>
            </Form>
        </div>
    );
}

export default App;
