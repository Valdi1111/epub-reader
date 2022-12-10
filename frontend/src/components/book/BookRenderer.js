import ImageViewModal from "./ImageViewModal";
import BookFooter from "./BookFooter";
import BookHeader from "./BookHeader";
import BookBody from "./BookBody";

function BookRenderer(props) {
    const {
        settings,
        setSetting,
        ready,
        title,
        chapter,
        section,
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
                <BookHeader settings={settings} setSetting={setSetting} title={title} chapter={chapter}
                            navigation={navigation} navigateTo={navigateTo} search={search}/>
                <BookBody ready={ready}/>
                <BookFooter chapter={chapter} section={section} location={location} percentage={percentage}
                            left={left} right={right}/>
            </div>
        </>
    );

}

export default BookRenderer;
