import Selector from "@/components/selector";
export default function EmojiFilters({categories, dispatcher, editable}) {
    const scrollPage = (cat) => {
        let sourceY = document.getElementById(cat).getBoundingClientRect().y;
        let windowTop = window.scrollY;
        let targetY = sourceY+windowTop;
        let screenWidth = window.screen.width;
        let offsetY = 0;
        if(screenWidth<1025) offsetY = document.getElementById("viewMenu").getBoundingClientRect().height;
        window.scroll({top: (targetY-offsetY), left: 0, behavior: "smooth"});
        dispatcher({type: "MENU_TOGGLE", menu: false})
    }
    const categoryEntries = Object.entries(categories);
    const allCategories = categoryEntries.map(([category, obj]) => {
        return (
            <li key={category} className="c-emojiFilter__category" onClick={() => scrollPage(category)}>
                <span>&gt; {obj.name}</span>
                {
                    (editable) ?
                        <Selector
                            status={obj.active}
                            dispatcher={dispatcher}
                            category={category}
                        />
                    : null
                }
            </li>
        )
    })
    return (
        <ul className="c-emojiFilter">{allCategories}</ul>
    )
}