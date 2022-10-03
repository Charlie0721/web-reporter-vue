<template>
  <div id="domicilios">
    <div class="container">
      <center>
        <h2 class="display-4">
          <small class="text-muted"> INFORME DE DOMICILIOS </small>
        </h2>
      </center>
      <br />
      <br />

      <br />
      <form v-on:submit.prevent="ConsultaDomicilios">
        <div class="form-group col-md-3">
          <h2 class="display-5">
            <small class="text-muted">Fecha inicial </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="estDom.fechaIni"
          />
          <h2 class="display-5">
            <small class="text-muted"> Fecha final </small>
          </h2>
          <input
            type="date"
            placeholder="AAAAMMDD"
            class="form-control text-uppercase input-header"
            v-model="estDom.fechaFin"
          />

          <div class="form-group">
            <h2 class="display-5">
              <small class="text-muted"> Estado </small>
            </h2>
            <select class="form-control input-header" v-model="estDom.estados">
              <option selected disabled value="">Estado del domicilio</option>
              <option value="0">En proceso</option>
              <option value="1">Despachados</option>
              <option value="2">Entregados</option>
              <option value="3">Cancelados</option>
            </select>
          </div>
          <button
            type="submit"
            class="btn btn-dark btn-block"
            style="background-color: #82230c"
          >
            Buscar
          </button>
        </div>
      </form>
      <br />
      <tr class="display-5 ml-auto" v-if="totalDomicilios">
        <small class="text-dark">
          Total Domicilios sin Servicio :$
          {{
            new Intl.NumberFormat("de-DE").format(this.totalDomicilios)
          }}</small
        >
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="valServicio">
        <small class="text-dark"
          >Total Servicio: $
          {{ new Intl.NumberFormat("de-DE").format(this.valServicio) }}</small
        >
        <br />
      </tr>
      <tr class="display-6 ml-auto" v-if="val_entregar">
        <small class="text-dark"
          >Valor a Entregar: $
          {{ new Intl.NumberFormat("de-DE").format(this.val_entregar) }}</small
        >
        <br />
      </tr>
      <tr class="display-5 ml-auto" v-if="valRecibido">
        <small class="text-dark"
          >Valor Recibido: $
          {{ new Intl.NumberFormat("de-DE").format(this.valRecibido) }}</small
        >
        <br />
      </tr>

      <div class="table-responsive-sm table-bordered">
        <table
          class="table table-bordered table-sm table-ligth display nowrap"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th scope="col">FECHA</th>
              <th scope="col">NUM.DOM</th>
              <th scope="col">HORA</th>
              <th scope="col">CLIENTE</th>
              <th scope="col">N.FACTURA</th>
              <th scope="col">VALOR</th>
              <th scope="col">SERVICIO</th>
              <th scope="col">VALOR A ENTREGAR</th>
              <th scope="col">VALOR RECIBIDO</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in domicilios" :key="item.item">
              <td scope="row">
                <small class="text-dark">{{ item.fecha }}</small>
              </td>
              <td scope="row">
                <small class="text-dark">{{ item.numero }}</small>
              </td>
              <td scope="row">
                <small class="text-dark">{{ item.horapedido }}</small>
              </td>
              <td scope="row">
                <small class="text-dark"> {{ item.nomtercero }}</small>
              </td>
              <td scope="row">
                <small class="text-dark"> {{ item.numfact }}</small>
              </td>
              <td scope="row" class="price">
                <small class="text-dark">
                  ${{
                    new Intl.NumberFormat("de-DE").format(item.valdom)
                  }}</small
                >
              </td>
              <td scope="row">
                <small class="text-dark">
                  $
                  {{
                    new Intl.NumberFormat("de-DE").format(item.valservicio)
                  }}</small
                >
              </td>
              <td scope="row">
                <small class="text-dark">
                  $
                  {{
                    new Intl.NumberFormat("de-DE").format(item.valaentregar)
                  }}</small
                >
              </td>
              <td>
                <small class="text-dark">
                  $
                  {{
                    new Intl.NumberFormat("de-DE").format(item.valrecibido)
                  }}</small
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />

      <img
        alt="reiniciaVal"
        class="reiniciaVal"
        src="../assets/Boton_reiniciar_valores.png"
        v-on:click="reloadPage"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "estados_domicilios",
  props: {
    msg: String,
  },

  data() {
    return {
      domicilios: [],
      estados: "",
      totalDomicilios: null,
      val_entregar: null,
      valRecibido: null,
      valServicio: null,
      usuario: new Object(),
      estDom: new Object(),
    };
  },
  methods: {
    reloadPage() {
      location.reload();
    },

    ConsultaDomicilios() {
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
      let fechaIni = this.estDom.fechaIni;
      let fechaFin = this.estDom.fechaFin;
      let estado = this.estDom.estados;
      if (estado == 0) {
        this.DomProceso();
      }
      if (estado == 1) {
        this.DomDespachado();
      }
      if (estado == 2) {
        this.DomEntregado();
      }
      if (estado == 3) {
        this.DomCancelado();
      }

      var data = {
        fechaIni: fechaIni.replace(/-/gi, ""),
        fechaFin: fechaFin.replace(/-/gi, ""),
        estado,
      };
      axios
        .post(
          this.$conexion +
            "/consulta-ventas-estados-domicilios/" +
            this.usuario._id,
          data
        )
        .then((domici) => {
          this.domicilios = domici.data.rows;

          for (let i = 0; i < this.domicilios.length; i++) {
            this.totalDomicilios += this.domicilios[i].valdom;
            this.valServicio += this.domicilios[i].valservicio;
            this.val_entregar += this.domicilios[i].valaentregar;
            this.valRecibido += this.domicilios[i].valrecibido;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    DomDespachado() {
      this.$swal(
        "Información!",
        "Domicilios Despachados ",

        "success"
      );
    },
    DomProceso() {
      this.$swal(
        "Información!",
        "Domicilios En proceso ",

        "success"
      );
    },
    DomEntregado() {
      this.$swal(
        "Información!",
        "Domicilios Entregados ",

        "success"
      );
    },
    DomCancelado() {
      this.$swal(
        "Información!",
        "Domicilios Cancelados ",

        "success"
      );
    },
  },
};
</script>



