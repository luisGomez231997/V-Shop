import React from 'react'
import {  Route, Redirect, Switch } from 'react-router-dom'
import { Fade } from 'reactstrap';
import Axios from 'axios';

import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import Cliente from '../cliente/Dashboard'
import ProductPage from './ProductPage'
import Loading from './Loading';
//import Loading from './Loading'
//import Axios from 'axios';

class Store extends React.Component {
    constructor(props){
        super(props)
        this.state={
            loading: true,
            idCatalog: 2,
            productos: [],
            catalogo: [],
            waveEffect: false,
            count: 0
        }
        this.getProduts = this.getProduts.bind(this)
        this.changeIdCatalog = this.changeIdCatalog.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.precioTotal = this.precioTotal.bind(this)
        this.eliminarProducto= this.eliminarProducto.bind(this)
    }

    getProduts(value){
        let idCatalog = this.state.idCatalog
        if(typeof(value)!=='undefined'){
            idCatalog = value
        }
        Axios.get('http://localhost:4000/api/catalogos/inventario/getProductosHomePageByCatalogo/' + idCatalog)
        .then((response) => {
        if(response.data.error){

        }else{
            this.setState({
            idCatalog: parseInt(idCatalog),
            catalogo: response.data,
            loading: false,
            count: this.state.count + 1
            })
        }
        })
    }

    componentDidMount(){
        this.getProduts()
        if(localStorage.getItem('productos')){
        this.setState({
            productos: JSON.parse(localStorage.getItem('productos')),
            count: this.state.count + 1
        })
        }
    }
    
    shouldComponentUpdate(nextProps, nextState){
    return this.state.count !== nextState.count || this.props.logueado !== nextProps.logueado
    }
    
    componentDidUpdate(){
    localStorage.setItem('productos', JSON.stringify(this.state.productos))    
    }

    precioTotal(){
        let total = 0;
        for(var i=0;i<this.state.productos.length;i++){
        total += this.state.productos[i].precio
        }
        return total;
    }

    eliminarProducto = (e) =>{
    this.setState({
        productos: this.state.productos.filter((producto, i) => i !== parseInt(e.target.value)  ),
        count: this.state.count + 1    
    });             
    }

    addProduct(mensaje){
        if(parseInt(mensaje.cantidad) <1){
            alert("Valor incorrecto")
            return null
        }
        let product = this.state.productos
        let find = false
        for(var i=0; i<product.length;i++){
            if(product[i].id===mensaje.id){
                if(product[i].id_sede===mensaje.id_sede){
                    product[i].cantidad += parseInt(mensaje.cantidad)
                    product[i].precio += parseInt(mensaje.precio)*parseInt(mensaje.cantidad)
                    find = true;
                    break;
                }
            }
        }
        if(!find){
            product.push(mensaje)
        }
        
        this.setState({
            productos : product,
            waveEffect: true,
            count: this.state.count + 1
        }, ()=>{
        window.setTimeout(() => {
            this.setState({
            waveEffect: false,
            count: this.state.count + 1
            })
        }, 900)
        })
    }


    changeIdCatalog(e){
        this.setState({
            loading:true,
            count: this.state.count + 1
        })
        this.getProduts(e.target.value)
    }


    render(){
        return(
                <Fade in={true} >
                    <Header                     
                        nombre={this.props.nombre}
                        idCliente={this.props.idCliente}
                        login={this.props.login}                                 
                        logueado={this.props.logueado}   

                        idCatalog = {this.state.idCatalog}
                        changeCatalog = {this.changeIdCatalog}

                        productos={this.state.productos}
                        precioTotal={this.precioTotal}
                        eliminarProducto={this.eliminarProducto}                        
                        waveEffect={this.state.waveEffect}
                    /> 
                    {this.state.loading?
                        <Loading/> :
                        <Switch>
                        <Route path="/cliente" render={({location}) =>
                            this.props.logueado ? 
                            <Cliente location = {location}
                                idCliente={this.props.idCliente}                                                                    
                            /> : <Redirect to="/login" />
                                                            
                        }/>

                        <Route path="/producto/:id_producto" render={({match}) => 
                            <ProductPage 
                            idCliente={this.props.idCliente}
                            logueado={this.props.logueado}
                            idCatalog={this.state.idCatalog}
                            id_product={match.params.id_producto}
                            addProduct={this.addProduct}
                            />  
                        }/>

                        <Route exact path="/" render={() =>
                            <Main 
                            idCatalog={this.state.idCatalog}
                            catalogo={this.state.catalogo}
                            addProduct={this.addProduct}
                            />  
                        }/>

                        <Route render={() => (<h1>Pagina no encontrada</h1>)} />
                    </Switch>  
                    
                    }                                      
                    <Footer/>  
                </Fade> 
        )
    }
}

export default Store;