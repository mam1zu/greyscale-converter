export const ImageInput = () => {
    const [img, setImg] = useState(undefined);
    const [convertedImg, setConvertedImg] = useState(undefined);
    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch("/api/convert/jpeg", {
            method: 'POST',
            headers: {
                "Content-Type": "image/jpeg"
            },
            body: img
        })
        .then(res => {
            if(res.status() == 200) {
                return <img src={convertedImg}></img>
            }
            else {
                return null;
            }
        })
    }
    return(
        <div>
            <form>
                <input type="file" name="image" accept="image/jpeg, image/png"></input>
                <input type="submit"></input>
            </form>
        </div>
    );
}