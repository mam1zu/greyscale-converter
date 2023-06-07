import React, { useEffect, useState, ReactDOM } from 'react';
import { Buffer } from 'buffer';


//対応しているフォーマット
const convertableFormats = ["image/jpeg", "image/png"];

export const ImageInput = () => {

    const [img, setImg] = useState();
    const [imgType, setImgType] = useState();
    const [convertedImg, setConvertedImg] = useState();
    const [downloadCounter, setDownloadCounter] = useState(0);
    const [fetchStatus, setFetchStatus] = useState(true); //true: success, false: failed

    useEffect(() => {
        if(convertedImg === undefined || imgType === undefined) return;
        let link = document.createElement('a');
        link.href = convertedImg;
        if(imgType === "image/jpeg") {
            link.setAttribute('download', new Date().getTime()+".jpeg");
        }
        else if(imgType === "image/png") {
            link.setAttribute('download', new Date().getTime()+".png");
        }
        link.click();
    }, [downloadCounter]);

    const downloadImageButton = () => {
        if(convertedImg !== undefined)
        return (
            <div>
                <span>完成!!!</span><br/>
                <button onClick={() => {setDownloadCounter(downloadCounter+1)}}>ダウンロード</button>
            </div>
        );
        else
            return;
    }

    const convertedImgElm = () => {
        if(convertedImg !== undefined)
            return <img src={convertedImg}/>;
        else
            return;
    }

    const failedFetchElm = () => {
        if(!fetchStatus)
            return <span color='red'>Internal Server Error</span>;
        else
            return;
    }

    const onChangeImg = async (event) => {

        event.preventDefault();

        if(event.target.files[0] === undefined) {
            return;
        }

        if(!convertableFormats.includes(event.target.files[0].type)) {
            window.alert("そのファイルのフォーマットには対応していないようです");
            return;
        }
        else
            setImgType(event.target.files[0].type);

        const fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);
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
        }


    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const body_json = {
            "image": img
        };
        if(!convertableFormats.includes(imgType)) {
            window.alert("対応していないファイルのようです");
            return;
        }

        if(imgType == "image/jpeg") {
            fetch('/api/convert/jpeg', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(body_json)
            })
            .then(async (res) => {
                if(res.ok) {
                    setFetchStatus(true);
                    res.json()
                    .then(json => {
                        return Buffer.from(json.monoimage, 'base64');
                    })
                    .then(monoimage => {
                        const blob = new Blob([monoimage], { "type": "image/jpeg"});
                        setConvertedImg(URL.createObjectURL(blob));
                    });
                }
                else {
                    window.alert("画像処理に失敗しました。");
                    return;
                }
            })
            .catch((err) => {
                setFetchStatus(false);
            });

        }

        else if(imgType == "image/png") {

            fetch('/api/convert/png', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(body_json)
            })
            .then(async (res) => {
                if(res.ok) {
                    setFetchStatus(true);
                    res.json()
                    .then(json => {
                        return Buffer.from(json.monoimage, 'base64');
                    })
                    .then(monoimage => {
                        const blob = new Blob([monoimage], { "type": "image/png"});
                        setConvertedImg(URL.createObjectURL(blob));
                    });
                }
                else {
                    window.alert("画像処理に失敗しました。");
                    return;
                }
            })
            .catch((err) => {
                setFetchStatus(false);
            });

        }

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/jpeg, image/png" onChange={(event) => {onChangeImg(event)}}></input>
                <input type="submit" value='変換！'></input>
            </form>
            {convertedImgElm()}
            {downloadImageButton()}
            {failedFetchElm()}
        </div>
    );
}