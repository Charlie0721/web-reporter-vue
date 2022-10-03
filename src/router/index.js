import Vue from 'vue'
import VueRouter from 'vue-router'
import Inventarios from '../views/Inventarios.vue'
import EditarProducto from '../views/EditarProducto.vue'
import FormasPago from '../views/FormasPago.vue'
import VentasInstante from '../views/VentasInstante.vue'
import TodasFacturas from '../views/Facturas.vue'
import consultaInventarios from '../views/consultaInventarios.vue'
import DetalleFacturas from '../views/DetalleFacturas.vue'
//import formaspagoVentInst from '../views/formaspagoVentInst.vue'
import IvaVentas from '../views/IvaVentas.vue'
import Kardex from '../views/Kardex.vue'
import KardexProducto from '../views/KardexProducto.vue'
import VentasAcumuladas from '../views/VentasAcumulado.vue'
import VentasVendedor from '../views/ventasVendedor.vue'
import CxC from '../views/cuentasPorCobrar.vue'

import compras from '../views/trae_compras.vue'
import comprasDetalle from '../views/detalle_compra.vue'
import facturasDelDia from '../views/facturas_ventas_dia.vue'
import detalleFacturaDia from '../views/detalle_facturas_dia.vue'
import ingresos_caja from '../views/ingresosDeCaja.vue'
import egresosCaja from '../views/egresosCaja.vue'
import arqueos_caja from '../views/arqueos.vue'
import detalleArqueoCaja from '../views/detalleArqueoCaja.vue'
import cargarCompras from '../views/cargaDeCompras.vue'
import entradaProductos from '../views/entrada_productos.vue'
import RegistrarUsuarios from '../views/RegisterUser.vue'
import tabla_usuarios from '../views/todosUsuarios.vue'
import conexion_usuario from '../views/registra_conexion_usuario.vue'
import login from '../views/ingresoAplicacion.vue'
import asuadmin from '../views/usuarioPermisos.vue'
import ventasMesas from '../views/ventas_por_mesas.vue'
import Costeo_inv from '../views/consulta_costeo_inv.vue'
import estados_domicilios from '../views/estados_de_domicilios.vue'
import vencimientos_lotes from '../views/lote_vencimiento.vue'
import cxp from '../views/cxp.vue'
import pedDocumentos from '../views/pedidosCom/pedDocumentos.vue'
import pedProductos from '../views/pedidosCom/pedProd.vue'
import pedFormPago from '../views/pedidosCom/ped_form_pago.vue'
import pedDetalle from '../views/pedidosCom/det-pedido.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ingreso App',
    component: login
  },
  {
    path: '/todas-los-pedidos/:numero/:idalmacen',
    name: 'pedDetalle',
    component: pedDetalle

  },
  {
    path: '/pedidos-por-documento',
    name: 'pedidos prod',
    component: pedDocumentos
  },
  {
    path: '/pedidos-por-productos',
    name: 'pedidos doc',
    component: pedProductos
  },
  {
    path: '/pedidos-por-formas-pago',
    name: 'pedidos formas pago',
    component: pedFormPago
  },
  {
    path: '/fecha-vencimiento-lotes',
    name: 'lote_vencimientos',
    component: vencimientos_lotes
  },
  {
    path: '/info/cuentas-por-pagar',
    name: 'cxp',
    component: cxp
  },
  {
    path: '/informe-estados-domicilios',
    name: 'estados domicilios',
    component: estados_domicilios
  },
  {
    path: '/registrar-usuarios',
    name: 'Registrar Usuarios',
    component: RegistrarUsuarios
  },
  {
    path: '/todos-usuarios',
    name: 'tabla de Usuarios',
    component: tabla_usuarios
  },
  {
    path: '/crear-conexiones/:_id',
    name: 'creaConeixones',
    component: conexion_usuario
  },
  {
    path: '/usuadmin',
    name: 'para crear user',
    component: asuadmin
  },
  {
    path: '/cantidades-barras',
    name: 'Inventarios',
    component: Inventarios
  },
  {

    path: '/productos',
    name: 'productos',

    component: () => import('../views/Productos.vue')
  },

  {
    path: '/editar/:idproducto',
    name: 'EditarProductos',
    component: EditarProducto

  },
  {
    path: '/informe-formas-de-pago',
    name: 'formasPago',
    component: FormasPago

  },
  {
    path: '/ventas-instante',
    name: 'ventasInstante',
    component: VentasInstante

  },

  {
    path: '/ventas-instante/:fecha/:idalmacen',
    name: 'facturas_ventas_dia',
    component: facturasDelDia

  },
  {
    path: '/ventas-instante/detalle/:idalmacen/:numero',
    name: 'detallle_facturas_dia',
    component: detalleFacturaDia

  },
  {
    path: '/todas-las-facturas',
    name: 'todasFacturas',
    component: TodasFacturas

  },
  {
    path: '/consultar-cantidades-inventario',
    name: 'cantidadesInve',
    component: consultaInventarios

  },
  {
    path: '/todas-las-facturas/:numero/:idalmacen',
    name: 'detalleFacts',
    component: DetalleFacturas

  },
  {
    path: '/informe/iva-ventas',
    name: 'IvaVentas',
    component: IvaVentas

  },
  {
    path: '/informe/kardex',
    name: 'Kardex',
    component: Kardex

  },

  {
    path: '/informe/kardex/:idalmacen/:idproducto',
    name: 'KardexProducto',
    component: KardexProducto

  },
  {
    path: '/consulta-ventas-acumuladas',
    name: 'VentasAcumuladas',
    component: VentasAcumuladas

  },
  {
    path: '/consulta-ventas-vendedor',
    name: 'VentasVendedor',
    component: VentasVendedor

  },
  {
    path: '/cuentas-por-cobrar',
    name: 'CxC',
    component: CxC

  },

  {
    path: '/compras',
    name: 'compras',
    component: compras

  },
  {
    path: '/compras/:docprovee',
    name: 'comprasDetalle',
    component: comprasDetalle

  },
  {
    path: '/informe/ingresos-caja',
    name: 'ingresos_caja',
    component: ingresos_caja

  },
  {
    path: '/informe/egresos-de-caja',
    name: 'egresos_caja',
    component: egresosCaja

  },
  {
    path: '/informe/arqueos-caja',
    name: 'arqueos_caja',
    component: arqueos_caja

  },
  {
    path: '/informe/arqueos-caja/:idarqueo',
    name: 'arqueos_caja_detalle',
    component: detalleArqueoCaja

  },
  {
    path: '/ingresar-compras',
    name: 'cargarCompras',
    component: cargarCompras

  },
  {
    path: '/movimientos-inventario',
    name: 'entradaProductos',
    component: entradaProductos

  },
  {
    path: '/informe/ventas-mesas',
    name: 'ventasMesas',
    component: ventasMesas

  },
  {
    path: '/costeo/inventario',
    name: 'Costeo_inv',
    component: Costeo_inv

  },
]

const router = new VueRouter({
  routes
})

export default router
