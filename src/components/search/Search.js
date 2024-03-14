

export default function Search({handleSrch}) {

    return (
        <>
            <div className="input-group mb-3 search-bar">
                <input type="text" className="form-control" placeholder="Search for products.." aria-label="Search for products.." aria-describedby="basic-addon2" onChange={handleSrch}/>
                <span className="input-group-text" type="button" id="basic-addon2"><i className="fa-solid fa-magnifying-glass text-white"></i></span>
            </div>
        </>
    )
}