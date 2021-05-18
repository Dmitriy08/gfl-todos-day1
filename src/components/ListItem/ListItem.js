const ListItem = ({ id, text, clickHandler }) => {
    return (
        <li>
            {text} <button onClick={() => clickHandler(id)}>del</button>
        </li>
    );
};

export default ListItem;