import ImageViewModal from "./ImageViewModal";
import BookFooter from "./BookFooter";
import BookHeader from "./BookHeader";

function BookRenderer(props) {
    const {
        settings,
        setSetting,
        title,
        chapter,
        chapterName,
        location,
        percentage,
        navigation,
        navigateTo,
        search,
        left,
        right
    } = props;

    return (
        <>
            <ImageViewModal/>
            <div className={"d-flex flex-column vw-100 vh-100"}>
                <BookHeader settings={settings} setSetting={setSetting} title={title} chapterName={chapterName}
                            navigation={navigation} navigateTo={navigateTo} search={search}/>
                <div id={"view-root"} className={"d-flex flex-grow-1 justify-content-center"}/>
                <BookFooter chapter={chapter} chapterName={chapterName} location={location} percentage={percentage}
                            left={left} right={right}/>
            </div>
        </>
    );

}

export default BookRenderer;
