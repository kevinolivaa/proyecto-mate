import { useContext, useState } from 'react';
import { productos } from './data/productos';
import { CartContext } from './context/CartContext';

function App() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito } = useContext(CartContext);
  
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      
      {/* Navbar con botón dinámico */}
      <nav className="max-w-6xl mx-auto flex justify-end mb-4">
        <button 
          onClick={() => setMostrarCarrito(!mostrarCarrito)}
          className="bg-green-700 text-white px-5 py-2 rounded-full font-bold shadow-md hover:bg-green-800 transition-colors flex items-center gap-2 cursor-pointer"
        >
          {mostrarCarrito ? "Volver al Catálogo" : "🛒 Mi Pedido"}
          {!mostrarCarrito && totalItems > 0 && (
            <span className="bg-white text-green-800 rounded-full px-2 py-0.5 text-sm">
              {totalItems}
            </span>
          )}
        </button>
      </nav>

      {/* Encabezado */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-green-800 mb-2">Modo Mate</h1>
        <p className="text-slate-500 text-lg">Elegí tu compañero de rutas</p>
      </header>

      {/* Lógica para mostrar una pantalla o la otra */}
      {mostrarCarrito ? (
        
        /* --- PANTALLA DEL CARRITO --- */
        <main className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Resumen de tu pedido</h2>
          
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
                      <p className="font-bold text-green-700">${item.precio * item.cantidad}</p>
                      <button 
                        onClick={() => eliminarDelCarrito(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-semibold cursor-pointer"
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

              <button 
                onClick={enviarPedidoWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-xl transition-colors text-lg cursor-pointer shadow-lg"
              >
                Confirmar y Enviar por WhatsApp
              </button>
            </>
          )}
        </main>

      ) : (
        
        /* --- PANTALLA DEL CATÁLOGO --- */
        <main className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <div key={producto.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-slate-100 flex flex-col">
              
              {/* ACÁ ESTÁ EL CAMBIO: La etiqueta de imagen real */}
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="w-full h-48 object-cover object-center"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-800 mb-1">{producto.nombre}</h2>
                <p className="text-sm text-slate-500 mb-4 flex-grow">{producto.descripcion}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-black text-green-700">${producto.precio}</span>
                  <button 
                    onClick={() => agregarAlCarrito(producto)}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors cursor-pointer active:scale-95"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </main>

      )}
    </div>
  );
}

export default App;