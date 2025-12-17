import React, {useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios";
import {toast} from "react-toastify";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #808080ff;
    color: #fff;
    height: 42px;
`

const Form = ({onEdit, setOnEdit, getProducts}) => {
    const ref = useRef();

    useEffect(() => {
        if(onEdit) {
            const product = ref.current;

            product.nome.value = onEdit.nome;
            product.preco.value = onEdit.preco;
            product.estoque.value = onEdit.estoque;
            product.fone.value = onEdit.fone;
        }

    }, [onEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const product = ref.current;

        if(!product.nome.value || !product.preco.value || !product.estoque.value || !product.fone.value) 
            return toast.warn('Preencha todos os campos!');

        if(onEdit) {
            try {
                const {data} = await axios.put('http://localhost:4000/' + onEdit.id, {
                    nome: product.nome.value,
                    preco: product.preco.value,
                    estoque: product.estoque.value,
                    fone: product.fone.value
                });
                toast.success(data);
            }catch (error) {
                toast.error(error.response?.data || 'Erro ao editar produto!');
            }
        } else {
            try {
                const {data} = await axios.post('http://localhost:4000', {
                    nome: product.nome.value,
                    preco: product.preco.value,
                    estoque: product.estoque.value,
                    fone: product.fone.value
                });
                toast.success(data);
            } catch (error) {
                toast.error(error.response?.data || 'Erro ao adicionar produto!');
            }
        }

        setOnEdit(null);
        product.nome.value = '';
        product.preco.value = '';
        product.estoque.value = '';
        product.fone.value = '';

        getProducts();
    }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <label>Nome</label>
                <Input name="nome" type="text" autoComplete="off"/>
            </InputArea>
            <InputArea>
                <label>Preço</label>
                <Input name="preco" type="text" autoComplete="off"/>
            </InputArea>
            <InputArea>
                <label>Estoque</label>
                <Input name="estoque" type="text" autoComplete="off"/>
            </InputArea>
            <InputArea>
                <label>Fone</label>
                <Input name="fone" type="text" autoComplete="off"/>
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    );
}

export default Form;