import BookSettings from "./settings/BookSettings";
import BookContents from "./contents/BookContents";

function BookHeader(props) {
    const {settings, setSetting, title, chapter, navigation, navigateTo, search} = props;

    return (
        <header id={"top_bar"} className={"p-2 border-bottom d-flex flex-row align-items-center"}>
            <BookContents chapter={chapter} navigation={navigation} navigateTo={navigateTo} search={search}/>
            <p id={"book-title"} className={"flex-grow-1 mb-0 text-center text-truncate px-2"} title={title}>{title}</p>
            <BookSettings settings={settings} setSetting={setSetting}/>
        </header>
    );

}

export default BookHeader;
