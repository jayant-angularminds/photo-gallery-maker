import "./Gallery.scss";
import Navbar from "./Navbar";
import Container from 'react-bootstrap/Container';

const Gallery = () => {


    return (<div className="galleryWrap">
        <Navbar />
        <Container className="gridWrap">
            <div className="gridTextWrap">
                <div className="title">Upload Images Here</div>
                <div className="subTitle">Individually upload images to each grid cell by selecting and enhancing your gallery with a personal touch.</div>
            </div>
        </Container>
    </div>)
}

export default Gallery;