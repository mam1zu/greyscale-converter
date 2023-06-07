import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';

export const ImageInput = () => {

    const [img, setImg] = useState();
    const [convertedImg, setConvertedImg] = useState();
    const [downloadCounter, setDownloadCounter] = useState(0);

    useEffect(() => {
        if(convertedImg === undefined) return;
        let link = document.createElement('a');
        link.href = convertedImg;
        link.setAttribute('download', new Date().getTime()+".jpeg");
        link.click();
    }, [downloadCounter]);

    const downloadImageButton = () => {
        if(convertedImg !== undefined)
        return (
            <div>
                <span>完成!!!</span>
                <button onClick={() => {setDownloadCounter(downloadCounter+1)}}>ダウンロード</button>
            </div>
        );
        else
            return <></>;
    }

    const convertedImgElm = () => {
        if(convertedImg !== undefined)
            return <img src={convertedImg}/>;
        else
            return <></>;
    }

    const onChangeImg = async (event) => {
        //TODO: inputで指定された画像ファイルをarrayBufferとして保存

        event.preventDefault();
        if(event.target.files[0] === undefined) {
            return;
        }
        const fileReader = new FileReader();
        await fileReader.readAsDataURL(event.target.files[0]);
        fileReader.onloadend = async () => {
            const unprocessed_img_base64 = fileReader.result;
            let processed_img_base64 = "";

            //最初についている data:*/*;base64, を削除する ","を検知してslice
            for (let i = 0; i < unprocessed_img_base64.length; i++) {
                if(',' == unprocessed_img_base64[i]) {
                    processed_img_base64 = unprocessed_img_base64.slice(i+1, unprocessed_img_base64.length);
                    break;
                }
            }

            setImg(processed_img_base64);
            console.log(processed_img_base64);
        }


    }

    const handleSubmit = async (event) => {
        
        //TODO: state imgをbackendにPOST, resのarrayBufferを受け取りconcertedImgに入れる
        event.preventDefault();
        const body_json = {
            "image": img
        };

        fetch('/api/convert/jpeg', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(body_json)
        })
        .then(async res => {
            if(res.status === 200) {
                let monoimage;
                await res.json().then(json => {
                    monoimage = Buffer.from(json.monoimage, 'base64');
                });
                const blob = new Blob([monoimage], { "type": "image/jpeg"});
                setConvertedImg(URL.createObjectURL(blob));
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
            {downloadImageButton()}
        </div>
    );
}