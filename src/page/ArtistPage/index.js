import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';

import { getAllArtist,  postArtist, deleteArtist, putArtist, getOneArtist } from '../../service/api';
import './index.css';

const {width} = window;
Modal.setAppElement('#root');
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
const ArtistPage = () => {
    const [forceReload, setForceReload] = useState(false);
    const [artist, setArtist] = useState([]);
    const [data, setData] = useState({
        name:'',
        album:'',
        date:'',
        price:'',
    });
    const [image, setImage] = useState(null);
    const [sample, setSample] = useState(null);
    const [editData, setEditData] = useState({
        id:'',
        name:'',
        album:'',
        date:'',
        price:'',
        sample:'',
        image:'',
    });
    const [inputColumn, setInputColumn] = useState(false);
    const [editColumn, setEditColumn] = useState(false);

    useEffect(() => {
        fetchAllArtist();
    },[forceReload]);

    useEffect(() => {
        console.log(editData);
    },[editData]);

    const fetchAllArtist = async () => {
        try {
            const artist_list = []
            const res = await getAllArtist();
            res.data.forEach(item => {
                artist_list.push(item)
            });
            setArtist(artist_list);
        } catch (e) {
            console.log(e)
        }
    };

    const onSubmit = async () => {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("sample", sample);
        formData.append("name", data.name);
        formData.append("album", data.album);
        formData.append("date", data.date);
        formData.append("price", data.price);

        try {
            await postArtist(formData);
        } catch (e) {
            alert(e);
        }

        setData({
            name:'',
            album:'',
            date:'',
            price:'',
        });
        setImage(null);
        setSample(null);

        setInputColumn(false);
        setForceReload(!forceReload);
    }

    const onDelete = async (id) => {
        try {
            await deleteArtist(id);
        } catch (e) {
            alert(e);
        }
        setForceReload(!forceReload);
    }

    const onEditRequest = (artist_obj) =>{
        setEditColumn(true);
        setEditData({
            id: artist_obj.id,
            name: artist_obj.name,
            album: artist_obj.album,
            date: artist_obj.date,
            price: artist_obj.price,
            sample: artist_obj.sample_url,
            image: artist_obj.image,
        });
    }

    const onEditSubmit = async () => {
        const formData = new FormData();
        formData.append("name", editData.name);
        formData.append("album", editData.album);
        formData.append("price", editData.price);
        formData.append("date", editData.date);

        try {
            await putArtist(editData.id, formData);
        } catch (e) {
            alert(e);
        }

        setEditColumn(false);
        setForceReload(!forceReload);
    }

    /* Modal Section */
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const openModal = (artist_obj) => {
        setIsOpen(true);
        setEditData({
            id: artist_obj.id,
            name: artist_obj.name,
            album: artist_obj.album,
            date: artist_obj.date,
            price: artist_obj.price,
            sample: artist_obj.sample_url,
            image: artist_obj.image,
        });
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }
    /* Modal Section */

    return (
        <div className="AP-Container" width={width}>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div>
                <div>
                    <h4>Artist Name : {editData.name}</h4>
                    <h4>Album Name : {editData.album}</h4>
                </div>
                <img src={editData.image} alt="" width="200" />
                <audio controls>
                    <source src={editData.sample} type="audio/mpeg"/>
                </audio>
            </div>
        </Modal>
            <button 
            className="button-addnew"
            onClick={()=> setInputColumn(true)}
            >
                Add New
            </button>
            <div className="AP-Table-Container">
                <div className="cell label">Num</div>
                <div className="cell label">Album Name</div>
                <div className="cell label">Artist Name</div>
                <div className="cell label">Release Date</div>
                <div className="cell label">Sample Audio</div>
                <div className="cell label">Price</div>
                <div className="cell label">Action</div>
                {
                    artist.map((item, index) => {
                        return (<>
                            <div className="cell">{index + 1}</div>
                            <div className="cell row">
                                <img src={item.image} alt="panpan" width="100"/>
                                <p>{item.album}</p>
                            </div>
                            <div className="cell">{item.name}</div>
                            <div className="cell">{item.date}</div>
                            <div className="cell center">
                                <button className="btn-regular"
                                onClick={()=>openModal(item)}>
                                    <img src="https://image.flaticon.com/icons/png/512/17/17550.png" alt="" width="50"/>
                                </button>
                            </div>
                            <div className="cell">{item.price}</div>
                            <div className="cell column">
                                <button className="button-edit"
                                onClick={()=>onEditRequest(item)}>
                                    Edit
                                </button>
                                <button className="button-delete"
                                onClick={() => onDelete(item.id)}>
                                    Delete
                                </button>
                            </div>
                        </>)
                    })
                }
                {
                    editColumn ?
                    <>
                        <div className="cell"></div>
                        <div className="cell">
                            <div>Nama Album : 
                                <input placeholder="Masukkan Nama Album"
                                onChange={(e) => setEditData({
                                    ...editData,
                                    album: e.target.value,
                                })}/>
                            </div>
                        </div>
                        <div className="cell">
                            Nama Artis :
                            <input placeholder="Masukkan Nama Artis"
                            onChange={(e) => setEditData({
                                ...editData,
                                name: e.target.value,
                            })}/>
                        </div>
                        <div className="cell">
                            Tanggal :
                            <input placeholder="Masukkan Tanggal"
                            onChange={(e) => setEditData({
                                ...editData,
                                date: e.target.value,
                            })}/>
                        </div>
                        <div className="cell">
                        </div>
                        <div className="cell">
                            Harga Album :
                            <input placeholder="Masukkan Harga Album"
                            onChange={(e) => setEditData({
                                ...editData,
                                price: e.target.value,
                            })}/>
                        </div>
                        <div className="cell column">
                            <button 
                            className="button-edit"
                            onClick={()=> onEditSubmit()}
                            >
                                Confirm Edit
                            </button>
                        </div>
                    </> : <></>
                }
                {
                    inputColumn ?
                    <>
                        <div className="cell"></div>
                        <div className="cell">
                            <div>Gambar Album : 
                                <input type="file"
                                onChange={(e) => {
                                    setImage(e.target.files[0]);
                                }}/>
                            </div>
                            <div>Nama Album : 
                                <input placeholder="Masukkan Nama Album"
                                onChange={(e) => setData({
                                    ...data,
                                    album: e.target.value,
                                })}/>
                            </div>
                        </div>
                        <div className="cell">
                            Nama Artis :
                            <input placeholder="Masukkan Nama Artis"
                            onChange={(e) => setData({
                                ...data,
                                name: e.target.value,
                            })}/>
                        </div>
                        <div className="cell">
                            Tanggal :
                            <input placeholder="Masukkan Tanggal"
                            onChange={(e) => setData({
                                ...data,
                                date: e.target.value,
                            })}/>
                        </div>
                        <div className="cell">
                            Sample Music :
                            <input type="file"
                            onChange={(e) => {
                                setSample(e.target.files[0]);
                            }}/>
                        </div>
                        <div className="cell">
                            Harga Album :
                            <input placeholder="Masukkan Harga Album"
                            onChange={(e) => setData({
                                ...data,
                                price: e.target.value,
                            })}/>
                        </div>
                        <div className="cell column">
                            <button 
                            className="button-edit"
                            onClick={()=> onSubmit()}
                            >
                                Add
                            </button>
                        </div>
                    </> : <></>
                }
            </div>
        </div>
    );
}

export default ArtistPage;