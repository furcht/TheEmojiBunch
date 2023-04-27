export default function MobileToggle({menu, dispatcher}) {
    const toggleMenu = () => {
        if(menu) dispatcher({type: "MENU_TOGGLE", menu: false})
        else dispatcher({type: "MENU_TOGGLE", menu: true})
    }
    return (
        <button className="c-mobileToggle" onClick={toggleMenu}>
            {
                (menu) ? "Close" : "Menu"
            }
        </button>
    )
}