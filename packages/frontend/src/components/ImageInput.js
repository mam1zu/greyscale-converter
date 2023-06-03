export const ImageInput = () => {
    return(
        <div>
            <form>
                <input type="file" name="image" accept="image/jpeg, image/png"></input>
                <input type="submit"></input>
            </form>
        </div>
    );
}