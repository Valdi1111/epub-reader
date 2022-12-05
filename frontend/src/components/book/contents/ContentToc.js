
function ContentToc(props) {
    const {chapterName, navigation, navigateTo} = props;

    function active(label) {
        if (label === chapterName) {
            return "active";
        }
        return "";
    }

    /**
     * Navigate to chapter, ignore if href is null (section with chapters)
     * @param i toc item
     */
    function goToItem(i) {
        if(i.href != null) {
            navigateTo(i.href);
        }
    }

    function TocItem(props) {
        const {i, level} = props;
        return (
            <>
                <li className={"cursor-pointer"}>
                    <span className={`dropdown-item text-truncate ${active(i.label)}`} title={i.label}
                          onClick={e => goToItem(i)} style={{padding: `0.25rem ${level}.5rem`}}>
                        {i.label}
                    </span>
                </li>
                {i.subitems.map(i => <TocItem key={i.id} i={i} level={level + 1}/>)}
            </>
        );
    }

    return (
        <ul className={"list-unstyled overflow-auto mb-0"} style={{maxHeight: "500px"}}>
            {navigation.map(i => <TocItem key={i.id} i={i} level={0}/>)}
        </ul>
    );

}

export default ContentToc;
