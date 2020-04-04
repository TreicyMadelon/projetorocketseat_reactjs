import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";



export default class Main extends Component{

    state = {
        products: [],
        productInfo: {},
        page: 1,
    };

    componentDidMount(){
        this.loadProducts();
    };

    loadProducts = async (page = 1) => {
        
        const response = await api.get(`/products?page=${page}`);
        
        const {docs, ...productInfo} = response.data; //criando duas variaveis onde pego o doc e ta armazenando todo o resto no product info
        
        this.setState({ products: docs, productInfo, page});
    };

    prevPage = () => {

        const { page, productInfo} = this.state;
        if (page === 1) return;
        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    };
    nextPage = () => {
        const { page, productInfo} = this.state; // busca qual a pag atual e produto info 

        if (page === productInfo.pages) return; //já é a ultima pag?
        const pageNumber = page + 1; // se nao esta na ultima pag
        this.loadProducts(pageNumber);

    };


    render(){
     
      const { products, page, productInfo } = this.state;
      
       return (
        <div className="product-list" >
        {this.state.products.map(product =>(
            <article key={product._id}>
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <Link to={`/product/${product._id}`}> Acessar </Link>
            </article>
        ))}
         <div className="actions">
            <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
            <button disabled={page === productInfo.pages} onClick={this.nextPage}>Proximo</button>
        </div>
        </div>
       )
   }
}