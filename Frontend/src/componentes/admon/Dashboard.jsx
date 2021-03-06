import React from 'react';
import Axios from 'axios';
import { Route, Switch, Link, Redirect } from 'react-router-dom'

import { Nav, NavItem } from 'reactstrap';

import WhiteLogo from '../../imagenes/logo-white.png'
import adminRoutes from './adminRoutes'
import managerRoutes from './RoutesManager'
import Loading from '../principal/Loading'
import '../../estilos/admon.css'

export default class Example extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      id_usuario: this.props.userId,
      nick: this.props.userNick,
      idSede: ""
    }
  }

  componentDidMount(){
    if(!this.props.isAdmin){
      Axios.get('http://localhost:4000/api/catalogos/get-by-user/'+ this.state.id_usuario)
      .then(response => {
        if(response.data.length===0){
          alert("Usted no tiene ninguna sede asiganda")
          this.props.login(2,{id_usuario:"", nick:""})
        }else{
            this.setState({
            idSede: response.data[0].id_catalogo,
            loading: false
          })
        }
      })
  }
  }

  render() {
    if(!this.props.isAdmin){
      if(this.state.loading)
      {
        return <Loading/>
      }
    }
    const {isAdmin} = this.props
    const value = isAdmin? 1 : 2;
    const Routes = isAdmin? adminRoutes : managerRoutes;
    const roote = isAdmin? "/admin" : "/manager";
    //console.log(this.props.userId, " ", this.props.userNick)
    return (
      <div id="admin-zone">
        <Nav vertical pills id="admin-sidebar">
          <img alt="" src={WhiteLogo} height="60" width="189" />
          <div id="linea" />

          {Routes.map((ruta) => (
            <Link key={ruta.id} to={`${roote}/${ruta.id}`}
            className={this.props.location.pathname.indexOf(ruta.id) > -1?
            "nav-link active" : "nav-link"}>
              <NavItem>
                <i className={`fa ${ruta.icon}`}></i>
                <span>{ruta.name}</span>
              </NavItem>
            </Link>
            ))}

          <Link to={`${roote}/`} className="nav-link">
            <NavItem onClick={()=>this.props.login(value,{id_usuario:"", nick:""})}>
              <i className="fa fa-sign-out-alt"></i>
              <span>Cerrar sesion</span>
            </NavItem>
          </Link>
        </Nav>


        <div id="admin-main">
          <Switch>

            {Routes.map((ruta) => (
              <Route key={ruta.id} path={`${roote}/${ruta.id}`}
                render={() => (
                  ruta.props?
                    <ruta.component actualizar={true}  
                    idSede = {this.state.idSede}
                    idUser={this.state.id_usuario}
                    mensaje={"ACTUALIZAR"}/> 
                    : <ruta.component/>                                      
                )} />
            ))}

          </Switch>
        </div>
        
        <Redirect to={`${roote}/${Routes[0].id}`}/>
        
        
      </div>
    );
  }
}