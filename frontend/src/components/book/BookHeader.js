import BookNavigation from "./BookNavigation";
import BookSearch from "./BookSearch";
import BookSettings from "./BookSettings";

function BookHeader(props) {
    const {settings, setSetting, title, chapterName, navigation, navigateTo, search} = props;

    return (
        <header id={"top_bar"} className={"p-2 border-bottom d-flex flex-row align-items-center"}>
            <BookNavigation chapterName={chapterName} navigation={navigation} navigateTo={navigateTo}/>
            <p id={"book-title"} className={"flex-grow-1 mb-0 text-center text-truncate px-2"} title={title}>{title}</p>
            <BookSearch navigateTo={navigateTo} search={search}/>
            <BookSettings settings={settings} setSetting={setSetting}/>
        </header>
    );

}

export default BookHeader;
