import React from 'react'
import {Link} from 'react-router-dom'

import '../../estilos/producto.css'

const brokenImage = "http://karinlifoods.com/wp-content/uploads/2017/09/imagen-no-disponible.jpg"

const Producto = (props) =>{
    return(
        
        <div className="product">
            <Link to={`/producto/${props.producto.id_producto}`}>
            <div className="product-img">
            <img src={`http://localhost:4000/${props.producto.imagenes[0].ruta}`} 
            onError={(e)=>{e.target.onerror = null; e.target.src=brokenImage}}
            className="App-logo" alt="Producto" />
            {props.descuento.descuento!==0?
                <div className="product-label">
                    <span className="sale">-{props.descuento.descuento*100}%</span>
                    <span className="new">OFF!</span>
                </div> : null
            }
                
            </div>
            <div className="product-body">
                <p className="product-category">
                    {props.producto.subcategoria.categoria.nombre_categoria}
                </p>
                <h3 className="product-name">{props.producto.nombre_producto}</h3>
                {props.descuento.descuento!==0?
                    <h4 className="product-price">
                        ${props.producto.precio*(1-props.descuento.descuento)}                
                        <del className="product-old-price">
                            {`$${props.producto.precio}`}
                        </del>                                     
                    </h4> :
                    <h4 className="product-price">${props.producto.precio}                                                  
                    </h4>
                } 
                <div className="product-rating">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>                
            </div>
            <div className="add-to-cart">
                <button className="add-to-cart-btn"><i className="fa fa-shopping-cart"></i> al carrito</button>
            </div>
            </Link>
        </div>

    )
}

export default Producto;