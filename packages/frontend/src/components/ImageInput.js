import { useState } from 'react';

export const ImageInput = () => {

    const [img, setImg] = useState();
    const [convertedImg, setConvertedImg] = useState();

    const convertedImgElm = () => {
        if(convertedImg !== undefined)
            return <img src={convertedImg}/>;
        else
            return <></>;
    }

    const onChangeImg = async (event) => {
        //TODO: inputで指定された画像ファイルをarrayBufferとして保存
        event.preventDefault();
        const fileReader = new FileReader();
        //let arrayBuffer = undefined;
        let texted_img = undefined;
        console.log(event.target.files[0]);
        await fileReader.readAsText(event.target.files[0]);
        fileReader.onload = async () => {
            //arrayBuffer = fileReader.result;
            texted_img = fileReader.result;
            setImg(texted_img);
            console.log(typeof texted_img);
        }
        console.log(event.target.files[0].type);
        console.log();
        /*
        const img_blob = await new Blob([arrayBuffer], { "type": "image/jpeg"});
        setImg(img_blob); 
        */
    }

    const handleSubmit = async (event) => {
        //TODO: state imgをbackendにPOST, resのarrayBufferを受け取りconcertedImgに入れる
        event.preventDefault();
        const body_json = {
            "image": img
        };

        await fetch('/api/convert/jpeg', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(body_json)
        })
        .then(async res => {
            if(res.status === 200) {
                const img_mono_buffer = await res.arrayBuffer();
                setConvertedImg(URL.createObjectURL(img_mono_buffer));
            }
            else {
                console.log("received except HTTP status code 200");;
                console.error(res);
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/jpeg, image/png" onChange={(event) => onChangeImg(event)}></input>
                <input type="submit"></input>
            </form>
            {convertedImgElm()}
        </div>
    );
}