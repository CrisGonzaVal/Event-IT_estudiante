import { Component, OnInit } from '@angular/core';
import { talleres } from 'src/interfaces/talleres';
import { ApicrudSesionService } from '../services/apicrud-sesion.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-talleres',
  templateUrl: './talleres.page.html',
  styleUrls: ['./talleres.page.scss'],
})
export class TalleresPage implements OnInit {

  talleres: talleres[]=[];
  talleresFiltrados: talleres[] = []; // Talleres filtrados
  usuario:any;
  inscripciones: any[]=[];

  // Filtros
  filtroTipo: string = 'todos'; // Puede ser: 'todos', 'evento', 'seminario', 'actividad'
  filtroFecha: string = 'recientes'; // Puede ser: 'recientes', 'antiguos'
  filtroInscripcion: string = 'todos'; // Puede ser: 'todos', 'inscrito', 'no_inscrito'

  

  constructor(private apicrudSesion: ApicrudSesionService,
    private router: Router,
    private auth: AuthService, 
    private alertController: AlertController,
    private loadingController: LoadingController,// Importación del controlador de carga
    ) { }

    ngOnInit() {
      this.cargarDatos();
    }
  
    ionViewWillEnter() {
      this.cargarDatos();
    }

    doRefresh(event: any) {
      // Llama a cargarDatos
      this.cargarDatos();
  
      // Asegúrate de completar el refresco tras cargar los datos
      setTimeout(() => {
        event.target.complete();
      }, 1000); // Tiempo estimado para completar el refresco (ajustable)
    }
  
  
    cargarDatos() {
      console.log("cargando datos de talleres");
      this.usuario = this.auth.getSesionUser();
      
      this.apicrudSesion.getTalleres().subscribe((data) => {
        this.talleres = data;
        this.talleresFiltrados = [...this.talleres]; // Inicialmente, todos los talleres
      });
    
      this.apicrudSesion.getInscripciones().subscribe((data) => {
        this.inscripciones = data.filter((inscripcion) => inscripcion.rut === this.usuario.rut);
      });
    }


    aplicarFiltros() {
      // Filtrar por tipo
      let filtrados = this.filtroTipo === 'todos'
        ? [...this.talleres]
        : this.talleres.filter(taller => taller.tipo === this.filtroTipo);
  
      // Filtrar por inscripción
      if (this.filtroInscripcion !== 'todos') {
        filtrados = filtrados.filter(taller => {
          const estaInscrito = this.inscripciones.some(inscripcion => inscripcion.idTaller === taller.id);
          return this.filtroInscripcion === 'inscrito' ? estaInscrito : !estaInscrito;
        });
      }
  
      // Ordenar por fecha
      filtrados.sort((a, b) => {
        const fechaA = new Date(a.fecha).getTime();
        const fechaB = new Date(b.fecha).getTime();
        return this.filtroFecha === 'recientes' ? fechaB - fechaA : fechaA - fechaB;
      });
  
      this.talleresFiltrados = filtrados;
    }
  



  
  async confirmarRegistro(taller: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación de Inscripción',
      message: `¿Deseas registrarte al taller "${taller.nombre} "?`,
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Inscribir',
          handler: () => {
            this.guardarIncripcion(taller);
            this.verDetalle(taller);
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  
  
  
  
  
  GenerarQrData(taller:any){
    return {
      id: taller.id+this.usuario.rut,
      idTaller: taller.id,
      nombre: taller.nombre,
      fecha: taller.fecha,
      tipo: taller.tipo,
      rut: this.usuario.rut, //.slice(0, 8), Primeros 8 caracteres del RUT
      email: this.usuario.email,
      asistido:false,
      comentario:""
    }
  }
  
  
  
  async guardarIncripcion(taller: any) {
    // Mostrar indicador de carga
    const loading = await this.loadingController.create({
      message: 'Procesando inscripción...',
      spinner: 'circles', // Cambiar el estilo si lo deseas
      mode:"ios"
    });
    await loading.present();
  
    // Preparar datos del QR
    const datoQr = this.GenerarQrData(taller);
  
    // Guardar inscripción en el JSON
    this.apicrudSesion.postInscripcion(datoQr).subscribe(
      async () => {
        // Añadir inscripción a la lista local
        this.inscripciones.push(datoQr);
  
        // Descontar cupo después de guardarlo
        this.descontarCupo(taller);
  
        // Ocultar indicador de carga
        await loading.dismiss();
  
        // Mensaje de éxito
        const alert = await this.alertController.create({
          header: '¡Éxito!',
          message: `Te has inscrito correctamente al taller "${taller.nombre}".`,
          buttons: ['OK'],
          mode:"ios"
        });
        await alert.present();
      },
      async (error) => {
        // Ocultar indicador de carga en caso de error
        await loading.dismiss();
  
        // Mostrar mensaje de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Hubo un problema al inscribirte. Inténtalo de nuevo.',
          buttons: ['OK'],
          mode:"ios"
        });
        await alert.present();
      }
    );
  }
  
  
  
  verDetalle(taller:any) {
  //preparar datos del qr
    const datoQr = this.GenerarQrData(taller);
  
    //mostrar Qr en el page lector-qr
    this.router.navigate(['./tabs/lector-qr'], { queryParams: { data: JSON.stringify(datoQr) } });
  }
  
  
  
  
  descontarCupo(taller:any){
    taller.cupos -= 1;
    this.apicrudSesion.updateTaller(taller.id, { cupos: taller.cupos }).subscribe();
  }
  
  
  
  
  
  habilitarVerQr(taller: any): boolean {
    return this.inscripciones.some(inscripcion => inscripcion.nombre === taller.nombre);
  }

}
