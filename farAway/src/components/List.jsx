import Item from "./Item";

export default function List({items,onDeleteItem,onToggleItem,onClearList}) {

    return (
        <>
            <div className="list">
                <ul>
                    {items && items.map((val) => (
                        <Item key={val.id} item={val} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem}/>
                    )) }
                </ul>
            </div>
        </>
    )

}