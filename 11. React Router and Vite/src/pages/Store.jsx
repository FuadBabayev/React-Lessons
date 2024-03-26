import StorePic from "../assets/StoreRouter.png"
import PageNav from "../components/PageNav"

function Store() {
    return (
        <div>
            <PageNav />
            <h1>Store URL</h1>
            <img src={StorePic} alt=""  width={1000}/>
        </div>
    )
}

export default Store
