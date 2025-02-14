export default function States({numberOfItems,numberOfPackedItems,percentageOfPackedItems}){

    return (
        <>
        <footer className="stats">
            <em>🏖️You have {numberOfItems} item in your list , and you have packed {numberOfPackedItems} items (%{percentageOfPackedItems})</em>
        </footer>
        </>
    )

}