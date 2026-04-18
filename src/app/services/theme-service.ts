import { DOCUMENT, Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // Se crea un observable para que otros componentes escuchen el cambio
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  darkMode$ = this.darkModeSubject.asObservable();
  
  /**
   * @param document Inyección del objeto Document para manipular el DOM de forma segura en Angular.
   */
  constructor(@Inject(DOCUMENT) private document: Document) {
    const temaGuardado = localStorage.getItem('tema'); //Se obtiene el tema guardado de localStorage para cargarlo por defecto
    if(temaGuardado === 'dark'){
      this.aplicarTema('dark');
    }else { //Si no se aplica el light
      this.aplicarTema('light');
    }
    const isDark = temaGuardado === 'dark';
    this.darkModeSubject.next(isDark);
  }

/**
   * Obtiene el estado actual del modo oscuro de forma sincrónica.
   * Al leer el valor directamente del Subject, permite consultar el estado
   * en cualquier momento sin necesidad de suscribirse al observable.
   * @returns {boolean} `true` si el modo oscuro está activo, `false` para el modo claro.
   */
  get isDarkMode(): boolean {
    return this.darkModeSubject.value;
  }

  /**
   * Establece el tema global de la aplicación y actualiza el estado reactivo.
   * Guarda la selección en el local Storage para garantizar 
   * que el modo (oscuro o claro) se mantenga activo incluso si el usuario recarga la página.
   *  @param {boolean} estaOscuro - Bandera que indica si se debe activar el modo oscuro.
   */
  escogerTema(estaOscuro: boolean) {
    const tema = estaOscuro ? 'dark' : 'light';
    this.darkModeSubject.next(estaOscuro);
    this.aplicarTema(tema);
    localStorage.setItem('tema', tema);
  }

  /**
   * Aplica el tema manipulando directamente el DOM.
   * Modifica el atributo 'data-bs-theme' en la etiqueta <html>, el cual es el 
   * estándar utilizado por Bootstrap 5 para gestionar los modos de color.
   * @param {string} tema - El nombre del tema a aplicar ('dark' o 'light').
   */
  private aplicarTema(tema: string){
    this.document.documentElement.setAttribute('data-bs-theme', tema);
  }


/**
   * Selecciona dinámicamente la ruta de una imagen (como logos o iconos) 
   * para asegurar que contraste correctamente con el fondo actual.
   * @param {string} lightPath - Ruta del recurso a mostrar cuando el tema es claro.
   * @param {string} darkPath - Ruta del recurso a mostrar cuando el tema es oscuro.
   * @returns {string} La ruta de la imagen correspondiente al tema activo.
   */
  obtenerImagen(lightPath: string, darkPath: string){
    return this.isDarkMode ? darkPath : lightPath;
  }

}
