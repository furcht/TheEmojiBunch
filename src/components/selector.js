export default function Selector({status, dispatcher, category}) {
    const selectCategory = (categoryID) => {
        dispatcher({type: "SELECT_CATEGORY", target: categoryID})
    }
    const deselectCategory = (categoryID) => {
        dispatcher({type: "DESELECT_CATEGORY", target: categoryID})
    }
    return (
        <i
            className={`e-selector ${(status===true) ? "e-selector--active" : (!status) ? "" : "e-selector--partial"}`}
            onClick={
                () => (status) ?
                deselectCategory(category) :
                selectCategory(category)
            }
        ></i>
    )
}