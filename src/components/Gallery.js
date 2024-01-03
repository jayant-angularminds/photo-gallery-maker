import "./Gallery.scss";
import Navbar from "./Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect, useRef } from "react";
import { ArrowRightToLine, ArrowLeftToLine, ImagePlus, Trash2 } from 'lucide-react';
import ObjectGen from "./ObjectGen";

const Gallery = () => {
    const [gridData, setGridData] = useState(ObjectGen.getNewObject(0,4))
    const [cellNo, setCellNo] = useState(0);
    const fileInputRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const Expand = (colIndex) => {
        const newGridData = gridData.map((item, i) => {
            if (i === colIndex) {
                return { ...item, size: "large" };
            }
            return item;
        })
        setGridData(newGridData)
    }

    const Contract = (colIndex) => {
        const newGridData = gridData.map((item, i) => {
            if (i === colIndex) {
                return { ...item, size: "small" };
            }
            return item;
        })
        setGridData(newGridData)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newGridData = gridData.map((item, i) => {
                    if (i === cellNo) {
                        return { ...item, pic: reader.result };
                    }
                    return item;
                })
                setGridData(newGridData)
            };
            reader.readAsDataURL(file);
            fileInputRef.current.value = '';
            setCellNo(0)
        }
    };

    const onDelete = (colIndex) => {
        const newGridData = gridData.map((item, i) => {
            if (i === colIndex) {
                return { ...item, pic: null, size: "small" };
            }
            return item;
        })
        setGridData(newGridData)
    }

    const handleIconClick = (colIndex) => {
        // Trigger the file input dialog
        setCellNo(colIndex)
        fileInputRef.current.click();
    };

    useEffect(() => {
        let colSize = 4;
        let index = (gridData.length - colSize);
        while (index < gridData.length) {
             if(gridData[index]?.pic!==null)
             {
                const combinedArray = gridData.concat(ObjectGen.getNewObject(gridData.length,gridData.length+4));
                setGridData(combinedArray);
                break;
             }
             index++;
          }
        
        let count = 8;
        let index2 = (gridData.length-1) 
          if(gridData.length >= count){
            let flag = false
            while (index2 >= gridData.length - 8) {
              if(gridData[index2].pic!==null)
              {
                flag = true
              }
              index2--;
            }
            if(!flag){
                setGridData(gridData.slice(0, -4));
            }
          }
    }, [gridData])
    

    console.log(gridData)


    //-------- Return ---------
    return (<div className="galleryWrap">
        <Navbar />
        <Container className="gridWrap">
            <div className="gridTextWrap">
                <div className="title">Upload Images Here</div>
                <div className="subTitle">Individually upload images to each grid cell by selecting and enhancing your gallery with a personal touch.</div>
            </div>

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
                accept="image/*"
            />

            <div className="cellsWrap mt-5 mb-5">
                <Row className="gridRow">
                    {gridData.map((cell, colIndex) => (
                        cell.size === "large" && cell?.pic ?
                            //-------------- Large Pic Cell Column ------------------
                            <Col xs={6} key={colIndex} className="largeCol">
                                <div className="picWrap">
                                    <div
                                        className="image-container"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                    >
                                        <img src={cell?.pic} alt="Your Alt Text" />
                                        {isHovered && <div className="overlay">
                                            <Row>
                                                <Col xs={5} key={colIndex}></Col>
                                                <Col xs={7} key={colIndex} className="hoverIconsWrap">
                                                    <Trash2 className="delete-icon" onClick={() => { onDelete(colIndex) }} />
                                                    <ArrowLeftToLine className="arw-icon" onClick={() => { Contract(colIndex) }} />
                                                </Col>
                                            </Row>
                                        </div>
                                        }
                                    </div>
                                </div>
                            </Col> :


                            //-------------- Small Pic Cell Column ------------------    
                            <Col xs={3} key={colIndex} className="smallCol">
                                <div className="picWrap">

                                {/* //--------- If cell has pic ---------- */}
                                    {cell?.pic ?
                                        <div
                                            className="image-container"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            <img src={cell?.pic} alt="Your Alt Text" />
                                            {isHovered && <div className="overlay">
                                                <Row>
                                                    <Col xs={5} key={colIndex}></Col>
                                                    <Col xs={7} key={colIndex} className="hoverIconsWrap">
                                                        <Trash2 className="delete-icon" onClick={() => { onDelete(colIndex) }} />
                                                        <ArrowRightToLine className="arw-icon" onClick={() => { Expand(colIndex) }} />
                                                    </Col>
                                                </Row>
                                            </div>
                                            }
                                        </div>
                                        :
                                        //--------- If cell don't have pic ----------
                                        <div
                                            className="image-container"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            {isHovered && <div className="noPicOverlay">
                                                <Row>
                                                    <div style={{ cursor: 'pointer' }} onClick={() => { handleIconClick(colIndex) }} className="addImageWrap">
                                                        <ImagePlus className="mb-2"/>
                                                        Add Image
                                                    </div>
                                                </Row>
                                            </div>
                                            }
                                        </div>
                                    }
                                </div>
                            </Col>
                    ))}
                </Row>
            </div>
        </Container>
    </div>)
}

export default Gallery;