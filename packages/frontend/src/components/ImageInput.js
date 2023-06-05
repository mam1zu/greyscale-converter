import { useState } from 'react';

export const ImageInput = () => {

    const [img, setImg] = useState();
    const [convertedImg, setConvertedImg] = useState();

    const onChangeImg = async (event) => {

        event.preventDefault();
        console.log(event.target.files[0]);
        const fileReader = new FileReader();
        let arrayBuffer = undefined;
        fileReader.readAsArrayBuffer(event.target.files[0]);
        fileReader.onload = async () => {
            arrayBuffer = fileReader.result;
        }

        const img_blob = new Blob([arrayBuffer], { type: "image/jpeg" });
        setImg(img_blob);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        await fetch(`/api/convert/jpeg`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/octet-stream',
            },
            body: img
        })
        .then(async res => {
            console.log(res);
            if(res.status === 200) {
                const img_mono = await res.blob();

                setConvertedImg(URL.createObjectURL(img_mono));
                return <img src={convertedImg}></img>;
            }
            else {
                return <p>なんか失敗</p>;
            }
        })
        .catch(err => {
            console.error(err);
        });
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/jpeg, image/png" onChange={(event) => onChangeImg(event)}></input>
                <input type="submit"></input>
            </form>
        </div>
    );
}