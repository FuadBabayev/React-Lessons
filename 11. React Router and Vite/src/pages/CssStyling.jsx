import CssPhoto from "../assets/CssPhoto.png"
import PageNav from "../components/PageNav"

function CssStyling() {
    return (
        <div>
            <PageNav />
            <h1>Styling</h1>
            <img src={CssPhoto} alt=""  width={1000}/>
        </div>
    )
}

export default CssStyling
