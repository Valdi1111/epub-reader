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
            <div id={"view-root"} className={"d-flex flex-grow-1"}/>
            <LoadingScreen/>
        </>
    );

}

export default BookBody;
