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
            <div className={"position-relative flex-grow-1"}>
                <div id={"book-view"} className={"position-absolute w-100 h-100 d-flex justify-content-center"}/>
            </div>
            <LoadingScreen/>
        </>
    );

}

export default BookBody;
