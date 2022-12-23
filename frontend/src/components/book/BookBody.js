function BookBody(props) {
    const {ready} = props;

    function LoadingScreen() {
        if (ready) {
            return <></>;
        }
        return (
            <div className={"position-absolute vw-100 vh-100 d-flex justify-content-center align-items-center"}>
                <div className={"spinner-border"} role={"status"}>
                    <span className={"visually-hidden"}>Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <div id={"book-view"} className={"d-flex flex-grow-1 justify-content-center"}/>
            <LoadingScreen/>
        </>
    );

}

export default BookBody;
