import { useContext, useState } from 'react';
import { productos } from './data/productos';
import { CartContext } from './context/CartContext';

function App() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito } = useContext(CartContext);
  
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [notificacion, setNotificacion] = useState({ mostrar: false, mensaje: "" });
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  const enviarPedidoWhatsApp = () => {
    const numeroTelefono = "5493543695373"; 
    let mensaje = "¡Hola Modo Mate! Quiero encargar el siguiente pedido:\n\n";
    
    carrito.forEach((item) => {
      mensaje += `- ${item.cantidad}x ${item.nombre} ($${item.precio * item.cantidad})\n`;
    });
    
    mensaje += `\nTotal a pagar: $${precioTotal}\n`;
    mensaje += `\n¿Me confirmás si tenés stock para coordinar la entrega por el centro o por Nueva Córdoba?`;

    // Codificamos el mensaje para que sea un link válido
    const url = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrimos el link
    window.open(url, "_blank");
  };

  const manejarAgregarProducto = (producto) => {
    // 1. Agrega el producto a tu lógica original
    agregarAlCarrito(producto);

    // 2. Hace vibrar el celular por 50 milisegundos (solo funciona en móviles)
    if (window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    // 3. Muestra el cartelito flotante
    setNotificacion({ mostrar: true, mensaje: `¡${producto.nombre} agregado!` });

    // 4. Oculta el cartelito a los 2 segundos (2000 milisegundos)
    setTimeout(() => {
      setNotificacion({ mostrar: false, mensaje: "" });
    }, 2000);
  };


  // Lógica para filtrar los productos según el buscador
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">
      
      {/* 1. BARRA DE NAVEGACIÓN (Celeste Argentina) */}
      {/* 1. BARRA DE NAVEGACIÓN (Celeste Argentina) */}
      {/* 1. BARRA DE NAVEGACIÓN CON BUSCADOR */}
      <nav className="bg-sky-500 p-4 shadow-md text-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 relative">
          
          {/* Lado Izquierdo: Botón Menú + Título */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-white hover:text-sky-200 transition-colors text-2xl cursor-pointer">
              ☰
            </button>
            <h1 className="text-2xl font-bold tracking-wider cursor-pointer whitespace-nowrap" onClick={() => setMostrarCarrito(false)}>
              MODO MATE
            </h1>
          </div>

          {/* ACÁ ESTÁ EL MENÚ DESPLEGABLE (Lo dejé tal cual lo tenías) */}
          {menuAbierto && (
            <div className="absolute top-16 left-0 bg-white rounded-lg shadow-xl w-64 border border-slate-200 text-slate-700 z-50 py-3">
              <ul className="flex flex-col font-medium text-[15px]">
                <li className="hover:bg-slate-100 px-6 py-3 cursor-pointer transition-colors flex items-center gap-4 text-sky-600 bg-sky-50/50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  Inicio
                </li>
                <li className="hover:bg-slate-100 px-6 py-3 cursor-pointer transition-colors flex items-center gap-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  Mates
                </li>
                <li className="hover:bg-slate-100 px-6 py-3 cursor-pointer transition-colors flex items-center gap-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                  Bombillas
                </li>
                <li className="hover:bg-slate-100 px-6 py-3 cursor-pointer transition-colors flex items-center gap-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                  Termos
                </li>
                <li className="hover:bg-slate-100 px-6 py-3 cursor-pointer transition-colors flex items-center gap-4 mt-2 border-t border-slate-100 pt-4">
                  <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  Combos
                  <span className="ml-auto bg-[#00a650] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">OFERTA</span>
                </li>
              </ul>
            </div>
          )}

          {/* EL BUSCADOR NUEVO (Centro) */}
          <div className="w-full md:flex-1 md:max-w-xl relative">
            <input 
              type="text" 
              placeholder="Buscar mates, bombillas..." 
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full px-4 py-2 pl-10 rounded-full text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-inner bg-white/95"
            />
            {/* Ícono de lupita */}
            <svg className="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          
          {/* Lado Derecho: Carrito */}
          <div className="w-full md:w-auto flex justify-end">
            <button 
              onClick={() => setMostrarCarrito(!mostrarCarrito)}
              className="bg-yellow-400 text-slate-900 px-5 py-2 rounded-lg font-bold shadow-sm hover:bg-yellow-500 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {mostrarCarrito ? "Volver" : "🛒 Mi Pedido"}
              {!mostrarCarrito && totalItems > 0 && (
                <span className="bg-slate-900 text-yellow-400 rounded-full px-2 py-0.5 text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </nav>

      {/* 2. ENCABEZADO / HERO (Aparece solo si estás viendo el catálogo) */}
      {!mostrarCarrito && (
        <header className="text-center py-12 bg-white border-b border-sky-100 mb-8 relative">
          
      {/* Imagen del Sol de Mayo (Local y 100% Transparente) */}
          <img 
            src="/SOOL.png" 
            alt="Sol de Mayo Argentino" 
            className="w-20 h-20 mx-auto mb-4 drop-shadow-md hover:scale-105 transition-transform"
          />

          <h2 className="text-4xl font-black text-slate-800 mb-3">La Esencia de un Buen Mate</h2>
          <p className="text-sky-600 text-lg font-medium">Tradición, calidad y orgullo argentino en cada cebada.</p>
        </header>
      )}

      {/* Lógica para mostrar una pantalla o la otra */}
      {mostrarCarrito ? (
        
        /* --- 3. PANTALLA DEL CARRITO --- */
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-sky-100 mt-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-4 border-sky-500 inline-block pb-1">
            Resumen de tu pedido
          </h2>
          
          {carrito.length === 0 ? (
            <p className="text-slate-500 text-center py-10">Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {carrito.map((item) => (
                  <div key={item.id} className="flex justify-between items-center border-b border-slate-100 pb-4">
                    <div>
                      <p className="font-bold text-slate-800">{item.nombre}</p>
                      <p className="text-sm text-slate-500">Cantidad: {item.cantidad}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Precio en celeste */}
                      <p className="font-bold text-sky-600">${item.precio * item.cantidad}</p>
                      <button 
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="text-red-400 hover:text-red-600 text-sm font-semibold cursor-pointer transition-colors"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center text-xl font-black text-slate-800 mb-8 border-t-2 border-slate-100 pt-4">
                <span>Total:</span>
                <span>${precioTotal}</span>
              </div>

              {/* Botón de confirmar en amarillo */}
              <button 
                onClick={enviarPedidoWhatsApp}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-xl transition-colors text-lg cursor-pointer shadow-sm"
              >
                Confirmar y Enviar por WhatsApp
              </button>
            </>
          )}
        </main>

      ) : (
        
        /* --- 4. PANTALLA DEL CATÁLOGO --- */
       /* --- 4. PANTALLA DEL CATÁLOGO --- */
        <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {productosFiltrados.length === 0 ? (
            
            /* Mensaje cuando no hay resultados en la búsqueda */
            <div className="col-span-full text-center py-20">
              <p className="text-slate-500 text-xl font-medium">No encontramos productos que coincidan con "{busqueda}".</p>
              <button 
                onClick={() => setBusqueda('')} 
                className="mt-4 text-sky-600 font-bold hover:underline cursor-pointer"
              >
                Limpiar búsqueda
              </button>
            </div>

          ) : (

            /* Lista de productos filtrados */
            productosFiltrados.map((producto) => (
              <div key={producto.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-sky-100 flex flex-col">
                
                <img 
                  src={producto.imagen} 
                  alt={producto.nombre} 
                  className="w-full h-48 object-cover object-center"
                />

                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-slate-800 mb-1">{producto.nombre}</h2>
                  <p className="text-sm text-slate-500 mb-4 flex-grow">{producto.descripcion}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-black text-sky-600">${producto.precio}</span>
                    
                    <button 
                      onClick={() => manejarAgregarProducto(producto)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 text-sm font-bold py-2 px-4 rounded-lg transition-colors cursor-pointer active:scale-95 shadow-sm"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))
            
          )} {/* ¡ESTE ERA EL PARÉNTESIS CON LA LLAVE QUE FALTABA CERRAR! */}
        </main>

      )}
      {/* NOTIFICACIÓN FLOTANTE (Toast) */}
      {notificacion.mostrar && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-50 flex items-center gap-3 animate-bounce">
          <span className="text-xl">🧉</span> 
          <span className="font-bold">{notificacion.mensaje}</span>
        </div>
      )}
      {/* 5. FOOTER PROFESIONAL (Estilo E-commerce grande) */}
      <footer className="bg-white border-t border-slate-200 mt-16 pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Sección superior: Newsletter (Igual a tu referencia) */}
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-slate-200 pb-10 mb-10 gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-1">Unite a la comunidad Modo Mate</h3>
              <p className="text-slate-500 text-sm">Dejanos tu email y enterate antes que nadie de los nuevos ingresos.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input 
                type="email" 
                placeholder="Ingresá tu email" 
                className="w-full md:w-64 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-sky-500"
              />
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-sm">
                Suscribirme
              </button>
            </div>
          </div>

          {/* Sección de Columnas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            {/* Columna 1: Marca */}
            <div>
              <h4 className="font-extrabold text-sky-600 text-lg mb-4">MODO MATE</h4>
              <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                Elaboramos y seleccionamos mates de primera calidad para que tu ritual de todos los días sea único.
              </p>
            </div>

            {/* Columna 2: Ayuda y Envíos */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4">Atención al Cliente</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><a href="#" className="hover:text-sky-600 transition-colors">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors">Tiempos de preparación</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors">Cuidados del mate</a></li>
                <li><a href="#" className="hover:text-sky-600 transition-colors">Políticas de devolución</a></li>
              </ul>
            </div>

            {/* Columna 3: Contacto */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li>📍 Córdoba Capital, Argentina</li>
                <li>🛵 Entregas por el Centro y Nueva Córdoba</li>
                <li>✉️ hola@modomate.com</li>
                <li>📞 +54 9 3543 695373</li>
              </ul>
            </div>

            {/* Columna 4: Redes Sociales */}
            <div>
              <h4 className="font-bold text-slate-800 mb-4">Seguinos</h4>
              <div className="flex space-x-4">
                {/* Iconos de prueba (podés reemplazarlos por SVG reales después) */}
                <a href="#" className="text-slate-400 hover:text-sky-500 text-2xl transition-colors">📷</a>
                <a href="#" className="text-slate-400 hover:text-sky-500 text-2xl transition-colors">📱</a>
                <a href="#" className="text-slate-400 hover:text-sky-500 text-2xl transition-colors">🐦</a>
              </div>
              <p className="text-xs text-slate-400 mt-4">@modomate.arg</p>
            </div>

          </div>

          {/* Copyright y legales */}
          <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
            <p>© {new Date().getFullYear()} Modo Mate. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-slate-600">Términos y condiciones</a>
              <a href="#" className="hover:text-slate-600">Defensa del Consumidor</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;