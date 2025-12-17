import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import GlobalStyle from "./globalStyle";
import Form from "./components/Form";
import Grid from "./components/Grid";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const Title = styled.h1``

function App() {
  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/');
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>Cadastro de Produtos</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts}/>
        <Grid products={products} setProducts={setProducts} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} position="bottom-left"/>
    </>
  );
}

export default App;
