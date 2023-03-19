import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import axiosClient from '../axios-client';

const tableDiv = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    backgroundColor:'#B6D0E2',
    padding:'5rem'
}
const addModalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    gap:"10px"
  };
  

const Home = () => {

    // const products = [
    //    {
    //     id:'1',
    //     name:'milk',
    //     description:'powdered milk full fat'
    //    },
    //    {
    //     id:'2',
    //     name:'oats',
    //     description:'steel cut oats'
    //    },
    //    {
    //     id:'3',
    //     name:'cedars',
    //     description:' smoking causes cancer'
    //    },
    //    {
    //     id:'4',
    //     name:'rice',
    //     description:'basmate rice long white grain'
    //    },
    // ]

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // const [open2, setOpen2] = React.useState(false);
    // const handleOpen2 = () => setOpen2(true);
    // const handleClose2 = () => setOpen2(false);

    // const [editModalInfo , setEditModalInfo] = useState({
    //     id:'',
    //     name:'',
    //     description:''
    // })

    const [products, setProducts] = useState([]);

    useEffect(() => {
      axiosClient.get('/products')
      .then(({data})=> {
        setProducts(data.products)
      }).catch(err => {
        console.log(err)
      })
    },[])

    const [newProduct , setNewProduct] = useState({
      name:"",
      description:""
    })

    const handleAddProduct = (e) => {
      e.preventDefault();
      axiosClient.post('/products' , newProduct)
      .then(({data}) => {
        console.log(data)
        window.location.reload();
      }).catch(err => {
        console.log(err)
      }) 
    }

    const handleDelete = (id) => {
      axiosClient.delete(`/products/${id}`)
      .then((data) => {
        console.log(data)
        window.location.reload();
      }).catch(err => {
        console.log(err)
      }) 
    }

  return (
    <div style={tableDiv} >
        <Button style={{margin:"2rem", padding:"10px" }} variant="contained" onClick={handleOpen}>Add A New Product</Button>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Tools</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell >
                {item.id}
              </TableCell>
              <TableCell align="center">{item.name}</TableCell>
              <TableCell align="center">{item.description}</TableCell>
              <TableCell  align="center">
              {/* <Button style={{background:"green" , margin:'5px'}} variant="contained" onClick={() =>{
                handleOpen2()
                setEditModalInfo(item)
              }}>Edit</Button> */}
              <Button onClick={() => handleDelete(item.id)} style={{background:"red" , margin:'5px'}} variant="contained">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            {/* //Add modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={addModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new product
          </Typography>

          <TextField onChange={(e) => {
            setNewProduct({...newProduct, name:e.target.value})
          }}  id="outlined-basic" label="Add Name" variant="outlined" />
          <TextField onChange={(e) => {
            setNewProduct({...newProduct, description:e.target.value})
          }}  id="outlined-basic" label="Add Description" variant="outlined" />
          <Button onClick={handleAddProduct} variant="contained">Add</Button>
        </Box>
      </Modal>

           {/* //Edit modal */}
           {/* <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={addModalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit {editModalInfo.name}
          </Typography>

          <TextField  id="outlined-basic" label={editModalInfo.name} variant="outlined" />
          <TextField  id="outlined-basic" label={editModalInfo.description} variant="outlined" />
          <Button variant="contained">Add</Button>
        </Box>
      </Modal> */}
    </div>
  )
}

export default Home