const SearchBar = (props) => {
    return (
        <div className="col col-sm-4">
            <input className="form-control"
            value={props.value}
            onChange={ (ev) => props.setSearchValue(ev.target.value)}
            />
        </div>
    );
}

export default SearchBar;