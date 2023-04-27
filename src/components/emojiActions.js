export default function EmojiActions({editable, dispatcher}) {
    const enableCustomization = () => {
        dispatcher({type: "CUSTOM_ENABLE", customize: true});
    }
    const disableCustomization = () => {
        dispatcher({type: "CUSTOM_DISABLE", customize: false});
    }
    const downloadCustom = () => {
        dispatcher({type: "DOWNLOAD_CUSTOM"});
    }
    if(!editable) {
        return (
            <>
                <button className="u-mobileHide" onClick={enableCustomization}>Customize</button>
                <a className="e-button u-mobileHide" href="/emojis.json" download>Download All</a>
            </>
        )
    } else {
        return (
            <>
                <button className="u-mobileHide" onClick={disableCustomization}>Reset</button>
                <button className="u-mobileHide" onClick={downloadCustom}>Download</button>
            </>
        )
    }
}