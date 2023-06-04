import { useState } from 'react';

export const ImageInput = () => {

    const [img, setImg] = useState();
    const [convertedImg, setConvertedImg] = useState();

    const handleSubmit = async (event) => {

        event.preventDefault();
        const img_blob = new Blob(img, {type: "image/jpeg"});
        console.log(img_blob);
        await fetch("/api/convert/jpeg", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/octet-stream',
            },
            body: img_blob

        })
        .then(res => {
            console.log(res);
            if(res.status === 200) {
                const img_mono = res.blob();

                setConvertedImg(img_mono);
                return <img src={convertedImg}></img>;
            }
            else {
                return <p>なんか失敗</p>;
            }
        })
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/jpeg, image/png" onChange={(event) => {event.preventDefault(); setImg(event.target.files);}}></input>
                <input type="submit"></input>
            </form>
        </div>
    );
}