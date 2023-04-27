import EmojiActions from "./emojiActions";
import EmojiFilters from "./emojiFilters";
import MobileToggle from "./mobileToggle";
import TitleLogo from "./titleLogo";

export default function MenuBar({categories, dispatcher, editable, menu}) {
    return(
        <section className={`c-menuBar ${(menu) ? "c-menuBar--mobile" : ""}`}>
            <div className="c-menuBar__section">
                <TitleLogo />
                <p>
                    Explore and <span className="u-mobileHide">build your emoji library for your app or</span> simply click on an emoji to copy into your clipboard.
                </p>
            </div>
            <div className="c-menuBar__section">
                <EmojiFilters categories={categories} editable={editable} dispatcher={dispatcher}></EmojiFilters>
                <EmojiActions editable={editable} dispatcher={dispatcher}></EmojiActions>
            </div>
            <div className="c-menuBar__section u-desktopHide">
                <MobileToggle menu={menu} dispatcher={dispatcher} />
            </div>
        </section>
    )
}