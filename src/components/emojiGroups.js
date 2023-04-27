import EmojiTiles from "./emojiTiles";

export default function EmojiGroups({selected, categories, editable, dispatcher}) {
    const categoryEntries = Object.entries(categories);
    const allCategories = categoryEntries.map(([category, obj]) => {
        return (
            <section key={category}>
                <h2 id={category}>{obj.name}</h2>
                <EmojiTiles selected={selected} emojis={obj.emojis} editable={editable} dispatcher={dispatcher}></EmojiTiles>
            </section>
        )
    })

    return (
        <>
            {
                categoryEntries.length ? (
                    <div className="c-emojiGroups">{allCategories}</div>
                ) : (
                    <p>Error Loading Emojis</p>
                )
            }
        </>
    )
}