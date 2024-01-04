import "./Gallery.scss";
import Navbar from "./Navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect, useRef } from "react";
import { ArrowRightToLine, ArrowLeftToLine, ArrowRightFromLine, ArrowLeftFromLine, ImagePlus, Trash2 } from 'lucide-react';
import ObjectGen from "./ObjectGen";

const Gallery = () => {
    const [gridData, setGridData] = useState([ObjectGen.getNewObject(0, 4)])
    const [cellNo, setCellNo] = useState(0);
    const [rowNo, setRowNo] = useState(0);
    const fileInputRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const ExpandRight = (rowIndex, colIndex) => {
        const newGridData = gridData.map((row, i) => {
            if (i === rowIndex) {
                {
                    return row.map((item, i) => {
                        if (i === colIndex) {
                            return { ...item, size: "large" };
                        }
                        return item;
                    })
                }
            }
            return row;
        })
        newGridData[rowIndex].splice(colIndex + 1, 1);
        setGridData(newGridData)
    }

    const ExpandLeft = (rowIndex, colIndex) => {
        const newGridData = gridData.map((row, i) => {
            if (i === rowIndex) {
                {
                    return row.map((item, i) => {
                        if (i === colIndex) {
                            return { ...item, size: "large" };
                        }
                        return item;
                    })
                }
            }
            return row;
        })
        newGridData[rowIndex].splice(colIndex - 1, 1);
        setGridData(newGridData)
    }

    const ContractRight = (rowIndex, colIndex) => {
        const newGridData = gridData.map((row, i) => {
            if (i === rowIndex) {
                {
                    return row.map((item, i) => {
                        if (i === colIndex) {
                            return { ...item, size: "small" };
                        }
                        return item;
                    })
                }
            }
            return row;
        })
        newGridData[rowIndex].splice(colIndex, 0, { size: "small", pic: null, });
        setGridData(newGridData);
    }

    const ContractLeft = (rowIndex, colIndex) => {
        const newGridData = gridData.map((row, i) => {
            if (i === rowIndex) {
                {
                    return row.map((item, i) => {
                        if (i === colIndex) {
                            return { ...item, size: "small" };
                        }
                        return item;
                    })
                }
            }
            return row;
        })
        newGridData[rowIndex].splice(colIndex + 1, 0, { size: "small", pic: null, });
        setGridData(newGridData);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newGridData = gridData.map((row, i) => {
                    if (i === rowNo) {
                        {
                            return row.map((item, i) => {
                                if (i === cellNo) {
                                    return { ...item, pic: reader.result };
                                }
                                return item;
                            })
                        }
                    }
                    return row;
                })
                setGridData(newGridData)
            };
            reader.readAsDataURL(file);
            fileInputRef.current.value = '';
            setCellNo(0)
            setRowNo(0)
        }
    };

    const onDelete = (rowIndex, colIndex, size) => {
        const newGridData = gridData.map((row, i) => {
            if (i === rowIndex) {
                {
                    return row.map((item, i) => {
                        if (i === colIndex) {
                            return { ...item, pic: null, size: "small" };
                        }
                        return item;
                    })
                }
            }
            return row;
        })
        if (size === "large") {
            newGridData[rowIndex].splice(colIndex + 1, 0, { size: "small", pic: null });
        }
        setGridData(newGridData)
    }

    const handleIconClick = (rowIndex, colIndex) => {
        // Trigger the file input dialog
        setRowNo(rowIndex)
        setCellNo(colIndex)
        fileInputRef.current.click();
    };

    useEffect(() => {
        let flag = false;
        gridData[gridData.length - 1].forEach(item => {
            if (item.pic !== null) {
                flag = true;
            }
        })
        if (flag) {
            let temp = [...gridData, ObjectGen.getNewObject(0, 4)];
            setGridData(temp)
        }
    }, [gridData])



//------------ Return -------------

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
                {gridData.map((row, rowIndex) => (
                    <Row className="gridRow" key={rowIndex}>
                        {row.map((cell, colIndex) => (
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
                                                    <Col className="arw-iconLeft"><ArrowRightFromLine onClick={() => { ContractRight(rowIndex, colIndex) }} /></Col>
                                                    <Col className="delete-icon"><Trash2 onClick={() => { onDelete(rowIndex, colIndex, "large") }} /></Col>
                                                    <Col className="arw-iconRight"><ArrowLeftFromLine onClick={() => { ContractLeft(rowIndex, colIndex) }} /></Col>
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
                                                        <Col className="arw-iconLeft">
                                                            {colIndex !== 0 && !gridData[rowIndex][colIndex - 1]?.pic ?
                                                                <ArrowLeftToLine onClick={() => { ExpandLeft(rowIndex, colIndex) }} />
                                                                :
                                                                <></>
                                                            }
                                                        </Col>
                                                        <Col className="delete-icon"><Trash2 onClick={() => { onDelete(rowIndex, colIndex, "small") }} /></Col>
                                                        <Col className="arw-iconRight">
                                                            {colIndex !== (row.length - 1) && !gridData[rowIndex][colIndex + 1]?.pic ?
                                                                <ArrowRightToLine onClick={() => { ExpandRight(rowIndex, colIndex) }} />
                                                                :
                                                                <></>
                                                            }
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
                                                        <div style={{ cursor: 'pointer' }} onClick={() => { handleIconClick(rowIndex, colIndex) }} className="addImageWrap">
                                                            <ImagePlus className="mb-2" />
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
                ))}
            </div>
        </Container>
    </div>)
}

export default Gallery;