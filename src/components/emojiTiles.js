import st from "string-therapy";
export default function EmojiTiles({selected, emojis, dispatcher, editable}) {
    const randomID = () => "emoji"+Math.random().toString(36).substring(2, 5);
    const selectEmoji = (name, category) => {
        dispatcher({type: "SELECT_EMOJI", target: {"name": name, "category": st(category).toSnakeCase}})
    }
    const deselectEmoji = (name, category) => {
        dispatcher({type: "DESELECT_EMOJI", target: {"name": name, "category": st(category).toSnakeCase}})
    }
    const copyEmoji = async (id, char) => {
        try{
            await navigator.clipboard.writeText(char);
            copySuccess(id, true);
        } catch(err) {
            copySuccess(id, false);
        }
    }
    const copySuccess = (id, success, err) => {
        let emojiBlock = document.getElementById(id);
        let copyTag = document.createElement("div");
        let copyText = (success) ? "Copied" : "Error";
        copyTag.textContent = copyText;
        copyTag.classList.add("e-tag");
        emojiBlock.insertAdjacentElement("beforeend", copyTag);
        setTimeout(() => {
            emojiBlock.removeChild(copyTag);
        }, 1000);
    }
    return (
        <ul className={`c-emojiTiles ${Object.keys(selected).length ? "c-emojiTiles--active" : ""}`}>
            {emojis.map(emoji => {
                let emojiID = st(emoji.name).toSnakeCase;
                return (
                    <li
                        id={emojiID}
                        className={`c-emojiTiles__item ${(selected[emojiID]) ? "c-emojiTiles--selected" : ""}`}
                        key={emoji.name}
                        onClick={
                            () => (editable) ?
                                (!emoji.active) ?
                                selectEmoji(emoji.name, emoji.category) :
                                deselectEmoji(emoji.name, emoji.category) :
                                copyEmoji(emojiID, emoji.char)
                        }
                        title={emoji.name}
                    >
                            {emoji.char}
                    </li>
                )
            })}
        </ul>
    )
}